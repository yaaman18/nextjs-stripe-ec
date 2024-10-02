'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`p-4 border-b fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      isMenuOpen ? 'bg-black bg-opacity-40 text-white' : 'bg-white text-gray-600'
    }`}>
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <Image src="/images/logo_128.png" alt="ECサイトロゴ" width={40} height={40} />
        </Link>

        {/* lg以上の画面サイズでのみ表示されるリンク */}
        <div className="hidden lg:flex space-x-4">
          <Link href="/products" className="hover:text-gray-300">products</Link>
          <Link href="/about" className="hover:text-gray-300">About</Link>
          <Link href="/contact" className="hover:text-gray-300">Contact</Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* 検索欄 - lg以上で表示 */}
          <div className="hidden lg:block relative">
            <input
              type="text"
              placeholder="検索"
              className="pl-8 pr-2 py-1 border rounded-full text-gray-600"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <i className="material-icons text-gray-400">search</i>
            </span>
          </div>

          <Link href="/cart" className="hover:text-gray-300">
            <i className="material-icons">shopping_cart</i>
          </Link>

          {/* ハンバーガーメニューボタン（lg以上では非表示） */}
          <button type="button" onClick={toggleMenu} className="lg:hidden hover:text-gray-300">
            <i className="material-icons">{isMenuOpen ? 'close' : 'menu'}</i>
          </button>
        </div>
      </nav>

      {/* モバイルメニュー（lg以上では非表示） */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40 pt-16">
          <div className="container mx-auto px-4 py-8">
            {/* バツボタン */}
            <button onClick={closeMenu} className="absolute top-4 right-4 text-white">
              <i className="material-icons">close</i>
            </button>

            {/* モバイル用検索欄 */}
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="search"
                className="w-full pl-8 pr-2 py-2 border rounded-full text-gray-600"
              />
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <i className="material-icons text-gray-400">search</i>
              </span>
            </div>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-xl text-white hover:text-gray-300 block" onClick={toggleMenu}>Products</Link></li>
              <li><Link href="/about" className="text-xl text-white hover:text-gray-300 block" onClick={toggleMenu}>About</Link></li>
              <li><Link href="/contact" className="text-xl text-white hover:text-gray-300 block" onClick={toggleMenu}>Contact</Link></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;