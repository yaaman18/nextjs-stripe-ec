import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: '2024-09-30.acacia',
  maxNetworkRetries: 3
});

export async function GET() {
  try {
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price']
    });

    if (!products.data || products.data.length < 1) {
      return NextResponse.json([]);
    }

    const productsWithPrices = await Promise.all(products.data.map(async (product) => {
      const prices = await stripe.prices.list({
        product: product.id,
        active: true
      });

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0] || null,
        default_price: (product.default_price as Stripe.Price)?.unit_amount,
        prices: prices.data.map(price => ({
          id: price.id,
          currency: price.currency,
          unit_amount: price.unit_amount,
          recurring: price.recurring
        }))
      };
    }));

    return NextResponse.json(productsWithPrices);
  } catch (error) {
    console.error('Stripe API error:', error);
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: 500 });
  }
}