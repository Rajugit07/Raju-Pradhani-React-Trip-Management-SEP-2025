import { useParams } from "react-router-dom";
import TripForm from "../components/TripForm";

const EditTrip = ({ trips, onUpdate }) => {
    const { id } = useParams();
    const trip = trips.find((t) => String(t.id) === id);

    if (!trip) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-red-500 font-medium">
                    Trip not found (id: {id})
                </p>
            </div>
        );
    }

    return <TripForm initialData={trip} onSubmit={onUpdate} />;
};

export default EditTrip;
