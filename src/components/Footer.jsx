import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
    FaYoutube
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 mt-16 border-t border-gray-200 dark:border-gray-700 shadow-inner">
            <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
                <h4 className="text-xl font-semibold text-gray-700 dark:text-white">
                    ClimaTrack — Your Weather Companion
                </h4>

                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                    Stay ahead of the weather. Built with ❤️ by Habibur Rahman Zihad.
                </p>

                <div className="flex justify-center gap-6 text-xl text-gray-600 dark:text-gray-300">
                    <a
                        href="https://www.facebook.com/habiburrahmanzihad.zihad"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="hover:text-blue-600 transition"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href="https://github.com/HabiburRahmanZihad"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="hover:text-gray-900 dark:hover:text-white transition"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://linkedin.com/in/habiburrahmanzihad"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-blue-700 transition"
                    >
                        <FaLinkedinIn />
                    </a>
                    <a
                        href="https://www.youtube.com/@xihadxone"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        className="hover:text-red-600 transition"
                    >
                        <FaYoutube />
                    </a>
                </div>

                <p className="text-xs text-gray-400 dark:text-gray-500">
                    © {new Date().getFullYear()} ClimaTrack. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;