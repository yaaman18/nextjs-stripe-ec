import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  image: string | StaticImport;
  default_price: number | null;
  prices: {
    id: string;
    currency: string;
    unit_amount: number | null;
    recurring: unknown | null;
  }[];
}