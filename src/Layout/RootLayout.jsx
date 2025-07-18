import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Root = () => {
    return (
        <div className='container mx-auto'>

            <nav>
                <Navbar />
            </nav>

            <main className='min-h-[calc(100vh-405px)]'>
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default Root;