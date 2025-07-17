import { Link, NavLink } from 'react-router';
import { WiDaySunny } from 'react-icons/wi';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false); // lg breakpoint
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive
      ? 'text-primary bg-base-200 dark:bg-base-300'
      : 'text-base-content hover:text-primary hover:bg-base-200 dark:hover:bg-base-300'
    }`;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/weekly', label: 'Weekly' },
    { to: '/air-quality', label: 'Air Quality' },
    { to: '/map', label: 'Map View' },
    { to: '/uv-sun', label: 'UV & Sun Info' },
  ];

  return (
    <header className="bg-base-100 shadow-sm sticky top-0 z-50 transition duration-300">
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
        <nav className="hidden lg:flex gap-4 items-center">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Hamburger Menu Button (lg and smaller only) */}
        <button
          className="lg:hidden text-3xl text-primary focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Dropdown (visible on md and below) */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <nav className="px-6 pb-4 pt-2 flex flex-col gap-2">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;