import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Root = () => {
    return (
        <div className='container mx-auto'>
            <Navbar />
            <Outlet />
            <Footer></Footer>
        </div>
    );
};

export default Root;