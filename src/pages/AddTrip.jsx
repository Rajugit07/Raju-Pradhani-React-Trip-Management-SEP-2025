import TripForm from "../components/TripForm";

const AddTrip = ({ onAdd }) => {
    return <TripForm onSubmit={onAdd} />;
};

export default AddTrip;
