import { Link, NavLink } from 'react-router';
import { WiDaySunny } from 'react-icons/wi';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-yellow-300">
          <WiDaySunny size={32} />
          ClimaTrack
        </Link>
        <nav className="space-x-6 text-gray-700 dark:text-gray-100">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'font-semibold text-blue-600 dark:text-yellow-300' : ''
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/forecast"
            className={({ isActive }) =>
              isActive ? 'font-semibold text-blue-600 dark:text-yellow-300' : ''
            }
          >
            Forecast
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;