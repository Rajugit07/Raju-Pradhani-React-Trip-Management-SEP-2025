import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchFilter from "../components/SearchFilter.jsx";
import TripList from "../components/TripList.jsx";

const Dashboard = ({ trips, onDelete }) => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("default");

    // Apply all filters
    const filteredTrips = trips
        // 1. Search by destination (case-insensitive)
        .filter((t) =>
            t.destination.toLowerCase().includes(search.toLowerCase())
        )
        // 2. Filter by status
        .filter((t) => (statusFilter ? t.status === statusFilter : true))
        // 3. Sort by price
        .sort((a, b) => {
            if (sortOrder === "low-high") return a.price - b.price;
            if (sortOrder === "high-low") return b.price - a.price;
            return 0;
        });

    return (
        <div className="w-screen h-screen bg-indigo-50 px-2 py-3 max-sm:overflow-y-scroll no-scrollbar">
            <div className="border w-full h-full px-3 py-2 border-zinc-200 rounded-2xl flex flex-col gap-4">
                <nav>
                    <Navbar />
                </nav>
                <main className="w-full h-full flex gap-4 sm:flex-row max-sm:flex-col">
                    {/* Left panel - filters */}
                    <div className="flex h-full">
                        <SearchFilter
                            search={search}
                            onSearch={setSearch}
                            statusFilter={statusFilter}
                            onStatusChange={setStatusFilter}
                            sortOrder={sortOrder}
                            onSortChange={setSortOrder}
                        />
                    </div>
                    <div className="flex-2 h-fu">
                        <TripList trips={filteredTrips} onDelete={onDelete} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
