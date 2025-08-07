import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
    FaYoutube
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 mt-20 border-t border-gray-200 dark:border-gray-700 shadow-inner transition-all duration-300">
            <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
                <h4 className="text-2xl font-bold text-gray-700 dark:text-white tracking-wide">
                    ClimaTrack <span className="text-blue-500">— Your Weather Companion</span>
                </h4>

                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
                    Stay ahead of the weather. Built with <span className="text-pink-500">❤️</span> by <span className="font-medium text-gray-800 dark:text-white">Habibur Rahman Zihad</span>.
                </p>

                <div className="flex justify-center gap-6 text-2xl text-gray-600 dark:text-gray-300">
                    <a
                        href="https://www.facebook.com/habiburrahmanzihad.zihad"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="hover:text-blue-600 hover:scale-110 transition duration-300"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href="https://github.com/HabiburRahmanZihad"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="hover:text-gray-900 dark:hover:text-white hover:scale-110 transition duration-300"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://linkedin.com/in/habiburrahmanzihad"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-blue-700 hover:scale-110 transition duration-300"
                    >
                        <FaLinkedinIn />
                    </a>
                    <a
                        href="https://www.youtube.com/@xihadxone"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        className="hover:text-red-600 hover:scale-110 transition duration-300"
                    >
                        <FaYoutube />
                    </a>
                </div>

                <p className="text-xs text-gray-400 dark:text-gray-500">
                    © {new Date().getFullYear()} <span className="font-medium">ClimaTrack</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;