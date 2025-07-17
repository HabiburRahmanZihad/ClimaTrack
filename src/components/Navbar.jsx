// src/components/Navbar.jsx
import { Link, NavLink } from 'react-router';
import { WiDaySunny } from 'react-icons/wi';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `text-lg font-semibold px-3 py-1 rounded transition-all duration-200 ${isActive
      ? 'text-primary border-b-2 border-primary dark:text-primary'
      : 'text-base-content hover:text-primary hover:bg-base-200 dark:hover:text-primary'
    }`;

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary font-serif tracking-tight"
        >
          <WiDaySunny size={36} />
          ClimaTrack
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/forecast" className={navLinkClass}>
            Forecast
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-base-100 px-6 pb-4 flex flex-col gap-3">
          <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/forecast" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            Forecast
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;