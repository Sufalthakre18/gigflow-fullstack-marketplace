import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGig } from "../context/GigContext.jsx";
import { useBid } from "../context/BidContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import BidCard from "../components/BidCard.jsx";
import { IndianRupeeIcon, User, Calendar, MessageSquare } from "lucide-react";

export default function GigDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { currentGig, loading, error: gigError, getGig } = useGig();
    const { bids, createBid, getBidsForGig, hireBid, clearError, clearBids, error: bidError } = useBid();
    const { user, isAuthenticated } = useAuth();

    const [showBidForm, setShowBidForm] = useState(false);
    const [bidData, setBidData] = useState({ message: "", price: "" });
    const [bidSuccess, setBidSuccess] = useState(false);

    const isOwner =
        currentGig &&
        user &&
        String(currentGig.ownerId?._id) === String(user.id);
console.log("IS OWNER:", isOwner);
console.log("GIG OWNER:", currentGig?.ownerId?._id);
console.log("USER ID:", user?.id);

    useEffect(() => {
        getGig(id);
        return () => {
            clearBids();
            clearError();
        };
    }, [id]);

    useEffect(() => {
        if (!currentGig || !user) return;

        const owner =
            String(currentGig.ownerId?._id) === String(user.id);

        if (owner) {
            getBidsForGig(id);
        }
    }, [currentGig, user, id]);



    async function handleBidSubmit(e) {
        e.preventDefault();

        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        await createBid({
            gigId: id,
            message: bidData.message,
            price: Number(bidData.price),
        });

        setBidData({ message: "", price: "" });
        setShowBidForm(false);
        setBidSuccess(true);
    }

    if (loading) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    if (gigError) {
        return (
            <div className="flex justify-center mt-20">
                <div className="bg-red-100 text-red-700 px-6 py-3 rounded-lg">
                    ❌ {gigError}
                </div>
            </div>
        );
    }


    if (!currentGig) {
        return <p className="text-center mt-20">Gig not found</p>;
    }

    return (
        <div className="min-h-screen bg-gray-500 py-8">
            <div className="max-w-6xl mx-auto px-4">

                {bidSuccess && !isOwner && (
                    <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                        ✅ Your bid has been submitted successfully.
                        <br />
                        You can track it from your dashboard.
                    </div>
                )}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h1 className="text-2xl font-bold mb-2">{currentGig.title}</h1>

                    <div className="flex gap-6 text-gray-700 mb-4">
                        <span className="flex items-center gap-1">
                            <IndianRupeeIcon size={16} /> {currentGig.budget}
                        </span>
                        <span className="flex items-center gap-1">
                            <User size={16} /> {currentGig.ownerId?.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            {new Date(currentGig.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </span>
                    </div>

                    <p className="text-gray-600">{currentGig.description}</p>

                    {!isOwner &&
                        currentGig.status === "open" &&
                        isAuthenticated &&
                        !bidSuccess && (
                            <button
                                onClick={() => setShowBidForm(true)}
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Submit Bid
                            </button>
                        )}
                </div>

                {/* ================= BID FORM ================= */}
                {showBidForm && !bidSuccess && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <MessageSquare size={18} /> Submit Bid
                        </h2>

                        {bidError && (
                            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                                ❌ {bidError}
                            </div>
                        )}

                        <form onSubmit={handleBidSubmit} className="space-y-4">
                            <textarea
                                className="w-full border rounded-lg p-2"
                                placeholder="Your proposal"
                                required
                                value={bidData.message}
                                onChange={(e) =>
                                    setBidData({ ...bidData, message: e.target.value })
                                }
                            />

                            <input
                                type="number"
                                className="w-full border rounded-lg p-2"
                                placeholder="Your price"
                                required
                                value={bidData.price}
                                onChange={(e) =>
                                    setBidData({ ...bidData, price: e.target.value })
                                }
                            />

                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                                Submit
                            </button>
                        </form>
                    </div>
                )}

                {/* ================= BIDS (OWNER ONLY) ================= */}
                {isOwner && bids.length > 0 && (
                    <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bids.map((bid) => (
                            <BidCard
                                key={bid._id}
                                bid={bid}
                                isOwner={isOwner}
                                onHire={hireBid}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
