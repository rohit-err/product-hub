import { Link, useLocation } from 'react-router-dom';
import { Routes } from '../types';
import { useState } from 'react';

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: Routes.HOME, label: 'Products' },
    { to: Routes.ADD_PRODUCT, label: 'Add Product' },
    { to: Routes.LIKED_PRODUCTS, label: 'Liked Products' },
    { to: Routes.PROFILE, label: 'Profile' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-primary-container shadow-sm fixed top-0 w-full z-50">
      <div className="flex justify-between items-center px-6 h-16 max-w-7xl mx-auto">
        <Link to={Routes.HOME} className="font-bold text-2xl text-secondary-fixed tracking-tight">
          ProductHub
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors px-3 py-2 rounded ${
                isActive(link.to)
                  ? 'text-secondary-fixed border-b-2 border-secondary-fixed'
                  : 'text-on-primary-container hover:text-secondary-fixed-dim'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-secondary-fixed p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden bg-primary-container border-t border-outline-variant/20 px-6 pb-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block py-3 text-sm font-medium ${
                isActive(link.to) ? 'text-secondary-fixed' : 'text-on-primary-container'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
