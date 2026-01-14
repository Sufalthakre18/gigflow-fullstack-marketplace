import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGig } from "../context/GigContext.jsx";

export default function CreateGig() {
    const navigate = useNavigate();
    const { createGig, loading, error } = useGig();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title || !description || !budget) {
            alert("Please fill all fields");
            return;
        }

        if (budget <= 0) {
            alert("Budget must be greater than 0");
            return;
        }

        await createGig({ title, description, budget });
        navigate("/dashboard");

    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">

                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Create New Gig
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Gig Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    />

                    {/* Description */}
                    <textarea
                        placeholder="Gig Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    />

                    {/* Budget */}
                    <input
                        type="number"
                        placeholder="Budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Gig"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                </form>
            </div>
        </div>
    );
}
