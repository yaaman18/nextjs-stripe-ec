import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="material-icons">facebook</i>
            </Link>
          </div>
          <div className="text-sm mb-4 md:mb-0 justify-center">
            © 2024, Vaultwear
          </div>
          <div>
            <i className="material-icons text-blue-500">payment</i>
          </div>
        </div>
      </div>
    </footer>
  );
}