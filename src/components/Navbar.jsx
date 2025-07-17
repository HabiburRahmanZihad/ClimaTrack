import { Link, NavLink } from 'react-router';
import { WiDaySunny } from 'react-icons/wi';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `text-lg font-semibold px-4 py-2 rounded transition-all duration-200 ${isActive
      ? 'text-primary border-b-2 border-primary dark:text-primary'
      : 'text-base-content hover:text-primary hover:bg-base-200 dark:hover:text-primary'
    }`;

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary font-serif tracking-tight"
        >
          <WiDaySunny size={36} />
          ClimaTrack
        </Link>

        {/* Desktop Navigation */}
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
          className="md:hidden text-3xl text-primary focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-base-100 overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <nav className="px-6 pb-4 pt-2 flex flex-col gap-2">
          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/forecast"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Forecast
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;