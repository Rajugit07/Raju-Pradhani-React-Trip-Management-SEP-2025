import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="shadow-sm bg-white w-full h-16 flex py-2 px-4 rounded-4xl">
            <div className="flex-1 flex items-center">
                <h1 className="text-lg sm:text-xl font-semibold">TripMate</h1>
            </div>
            <div className="bg-indigo-600 text-white flex-1 max-sm:flex-2 flex items-center justify-center gap-2 sm:gap-6 lg:gap-10 py-2 rounded-[26px] text-sm sm:text-base">
                <Link to="/" className="px-2 sm:px-0">
                    Dashboard
                </Link>
                <Link to="/add" className="px-2 sm:px-0">
                    Add Trip
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
