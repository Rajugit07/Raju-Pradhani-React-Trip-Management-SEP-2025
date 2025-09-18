import { useState } from "react";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 4;

const TripList = ({ trips, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(trips.length / ITEMS_PER_PAGE);

    const currentTrips = trips.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <>
            <section className="w-full h-full flex flex-col gap-4 sm:gap-6">
                {/* Trip cards */}
                {currentTrips.map((trip) => (
                    <div
                        key={trip.id}
                        className="w-full min-h-30 sm:h-24 bg-white rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 sm:py-0 shadow-sm "
                    >
                        {/* Mobile: Stack vertically, Desktop: Horizontal layout */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 lg:gap-12 mb-4 sm:mb-0">
                            <div className="flex justify-between sm:justify-start sm:gap-8 lg:gap-12">
                                <div className="flex flex-col">
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Start
                                    </p>
                                    <span className="text-sm sm:text-sm font-medium">
                                        {trip.startDate}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Ending
                                    </p>
                                    <span className="text-sm sm:text-sm font-medium">
                                        {trip.endDate}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Destination
                                </p>
                                <span className="text-sm sm:text-sm font-semibold">
                                    {trip.destination}
                                </span>
                            </div>
                        </div>

                        {/* Status - Mobile: Top right, Desktop: Center */}
                        <div className="absolute top-4 right-4 sm:static">
                            <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                    trip.status === "COMPLETED"
                                        ? "text-green-600 bg-green-50"
                                        : trip.status === "ONGOING"
                                        ? "text-blue-600 bg-blue-50"
                                        : trip.status === "CANCELLED"
                                        ? "text-red-600 bg-red-50"
                                        : "text-indigo-800 bg-indigo-50"
                                }`}
                            >
                                {trip.status}
                            </span>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex items-center justify-between sm:justify-start sm:gap-6 mt-2 sm:mt-0">
                            <p className="text-lg sm:text-base font-semibold">
                                ₹{trip.price}
                            </p>
                            <div className="flex gap-2 sm:flex-col sm:gap-2">
                                <Link
                                    to={`/edit/${trip.id}`}
                                    className="border border-zinc-200 px-3 py-1 text-xs sm:text-sm rounded-2xl hover:bg-gray-50 transition"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="border border-zinc-200 px-3 py-1 text-xs sm:text-sm rounded-2xl hover:bg-gray-50 transition"
                                    onClick={() => onDelete(trip.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Responsive Pagination controls */}
                <div className="flex justify-center items-center gap-1 sm:gap-2 mt-4 sm:mt-6 px-2">
                    <button
                        className="px-2 sm:px-3 py-1 sm:py-2 border rounded-lg disabled:opacity-50 text-xs sm:text-sm"
                        onClick={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        <span className="hidden sm:inline">Prev</span>
                        <span className="sm:hidden">‹</span>
                    </button>

                    {/* Show fewer page numbers on mobile */}
                    <div className="flex gap-1 sm:gap-2 overflow-x-auto max-w-[200px] sm:max-w-none">
                        {[...Array(totalPages)].map((_, i) => {
                            // On mobile, show current page and 2 adjacent pages
                            const isMobile = window.innerWidth < 640;
                            if (isMobile) {
                                const showPage =
                                    Math.abs(i + 1 - currentPage) <= 1 ||
                                    i === 0 ||
                                    i === totalPages - 1;
                                if (!showPage) return null;

                                // Show ellipsis
                                if (i === 1 && currentPage > 3) {
                                    return (
                                        <span
                                            key="ellipsis1"
                                            className="px-2 text-xs"
                                        >
                                            ...
                                        </span>
                                    );
                                }
                                if (
                                    i === totalPages - 2 &&
                                    currentPage < totalPages - 2
                                ) {
                                    return (
                                        <span
                                            key="ellipsis2"
                                            className="px-2 text-xs"
                                        >
                                            ...
                                        </span>
                                    );
                                }
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-2 sm:px-3 py-1 sm:py-2 border rounded-lg text-xs sm:text-sm ${
                                        currentPage === i + 1
                                            ? "bg-indigo-600 text-white border-indigo-600 font-semibold"
                                            : "bg-white hover:bg-gray-50"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        className="px-2 sm:px-3 py-1 sm:py-2 border rounded-lg disabled:opacity-50 text-xs sm:text-sm"
                        onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                    >
                        <span className="hidden sm:inline">Next</span>
                        <span className="sm:hidden">›</span>
                    </button>
                </div>
            </section>
        </>
    );
};

export default TripList;
