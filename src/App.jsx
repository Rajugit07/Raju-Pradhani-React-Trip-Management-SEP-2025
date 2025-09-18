import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EditTrip from "./pages/EditTrip";
import AddTrip from "./pages/AddTrip"; // new page
import tripsData from "./data/trip.js";
import { useLocalStorage } from "./hooks/useLocalStorage";

const App = () => {
    const [trips, setTrips] = useLocalStorage("trips", tripsData);

    // add
    const handleAddTrip = (newTrip) => {
        setTrips((prev) => [
            ...prev,
            {
                ...newTrip,
                id: Date.now(), // simple unique id
            },
        ]);
    };

    // update
    const handleUpdateTrip = (updatedTrip) => {
        setTrips((prev) =>
            prev.map((t) => (t.id === updatedTrip.id ? updatedTrip : t))
        );
    };

    // delete
    const handleDeleteTrip = (id) => {
        setTrips((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Dashboard trips={trips} onDelete={handleDeleteTrip} />
                }
            />
            <Route path="/add" element={<AddTrip onAdd={handleAddTrip} />} />
            <Route
                path="/edit/:id"
                element={<EditTrip trips={trips} onUpdate={handleUpdateTrip} />}
            />
        </Routes>
    );
};

export default App;
