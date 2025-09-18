import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TripForm = ({ initialData, onSubmit }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        initialData || {
            destination: "",
            startDate: "",
            endDate: "",
            price: "",
            status: "PLANNED",
        }
    );

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (
            !formData.destination ||
            !/^[A-Za-z\s]+$/.test(formData.destination.trim()) ||
            formData.destination.trim().length < 3
        ) {
            newErrors.destination =
                "Destination must be at least 3 letters long and contain only letters.";
        }
        if (!formData.startDate)
            newErrors.startDate = "Start date is required.";
        if (!formData.endDate) newErrors.endDate = "End date is required.";
        if (
            formData.startDate &&
            formData.endDate &&
            formData.endDate < formData.startDate
        ) {
            newErrors.endDate = "End date must be after start date.";
        }
        if (!formData.price || Number(formData.price) <= 0) {
            newErrors.price = "Price must be a positive number.";
        }
        const validStatuses = ["PLANNED", "ONGOING", "COMPLETED", "CANCELLED"];
        if (!validStatuses.includes(formData.status)) {
            newErrors.status = "Invalid status selected.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
            navigate("/"); // back to dashboard
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full min-h-screen flex items-center justify-center bg-indigo-50 px-2"
        >
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-4 sm:p-8 space-y-4 sm:space-y-6 border border-slate-200">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                    {initialData ? "Edit Trip" : "Add Trip"}
                </h2>

                {/* Destination */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-slate-700">
                        Destination
                    </label>
                    <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm sm:text-base"
                    />
                    {errors.destination && (
                        <span className="text-xs text-red-500">
                            {errors.destination}
                        </span>
                    )}
                </div>

                {/* Start Date */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-slate-700">
                        Start Date
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm sm:text-base"
                    />
                    {errors.startDate && (
                        <span className="text-xs text-red-500">
                            {errors.startDate}
                        </span>
                    )}
                </div>

                {/* End Date */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-slate-700">
                        End Date
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm sm:text-base"
                    />
                    {errors.endDate && (
                        <span className="text-xs text-red-500">
                            {errors.endDate}
                        </span>
                    )}
                </div>

                {/* Price */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-slate-700">
                        Price (₹)
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm sm:text-base"
                    />
                    {errors.price && (
                        <span className="text-xs text-red-500">
                            {errors.price}
                        </span>
                    )}
                </div>

                {/* Status */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-slate-700">
                        Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm sm:text-base"
                    >
                        <option value="PLANNED">PLANNED</option>
                        <option value="ONGOING">ONGOING</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                    </select>
                    {errors.status && (
                        <span className="text-xs text-red-500">
                            {errors.status}
                        </span>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800 transition text-sm sm:text-base"
                >
                    {initialData ? "Update Trip" : "Add Trip"}
                </button>
            </div>
        </form>
    );
};

export default TripForm;
