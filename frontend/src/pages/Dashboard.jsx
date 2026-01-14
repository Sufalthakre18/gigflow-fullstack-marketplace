import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGig } from '../context/GigContext.jsx';
import { useBid } from '../context/BidContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Briefcase, Send, User } from 'lucide-react';

export default function Dashboard() {
    const { myGigs, loading: gigsLoading, error: gigsError, getMyGigs, deleteGig } = useGig();
    const { myBids, loading: bidsLoading, error: bidsError, getMyBids } = useBid();
    const { user } = useAuth();

    useEffect(() => {
        getMyGigs();
        getMyBids();
    }, []);

    function getStatusColor(status) {
        switch (status) {
            case 'open':
                return 'bg-green-100 text-green-800';
            case 'assigned':
                return 'bg-blue-100 text-blue-800';
            case 'hired':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    function handleDeleteGig(gigId) {
        const confirmDelete = window.confirm("Are you sure you want to delete this gig?");
        if (confirmDelete) deleteGig(gigId);
    }


    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex items-center space-x-3">
                        <User className="h-12 w-12 text-primary-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Welcome, {user?.name}!
                            </h1>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* ================= MY GIGS ================= */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-2">
                                <Briefcase className="h-6 w-6 text-primary-600" />
                                <h2 className="text-2xl font-bold text-gray-900">My Gigs</h2>
                            </div>
                            <Link to="/create-gig" className="btn-primary text-sm">
                                Post New
                            </Link>
                        </div>

                        {gigsLoading ? (
                            <div className="flex justify-center py-8">
                                <p>loading...</p>
                            </div>
                        ) : gigsError ? (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                                {gigsError}
                            </div>
                        ) : myGigs.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">You haven't posted any gigs yet</p>
                                <Link
                                    to="/create-gig"
                                    className="text-primary-600 hover:underline mt-2 inline-block"
                                >
                                    Post your first gig
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {myGigs.map((gig) => (
                                    <div
                                        key={gig._id}
                                        className="border rounded-lg p-4 hover:shadow-md transition"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-gray-800 line-clamp-1">
                                                {gig.title}
                                            </h3>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    gig.status
                                                )}`}
                                            >
                                                {gig.status}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {gig.description}
                                        </p>

                                        <div className="flex justify-between items-center">
                                            <span className="text-green-600 font-semibold">
                                                ${gig.budget}
                                            </span>
                                            <Link
                                                to={`/gigs/${gig._id}`}
                                                className="text-primary-600 hover:underline text-sm"
                                            >
                                                View Details
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteGig(gig._id)}
                                                className="cursor-pointer text-red-600 hover:text-red-800 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                        {gig.assignedTo && (
                                            <div className="mt-2 pt-2 border-t text-sm text-gray-600">
                                                Assigned to:{' '}
                                                <span className="font-medium">
                                                    {gig.assignedTo.name}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ================= MY BIDS ================= */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center space-x-2 mb-6">
                            <Send className="h-6 w-6 text-primary-600" />
                            <h2 className="text-2xl font-bold text-gray-900">My Bids</h2>
                        </div>

                        {bidsLoading ? (
                            <div className="flex justify-center py-8">
                                <p>loading...</p>
                            </div>
                        ) : bidsError ? (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                                {bidsError}
                            </div>
                        ) : myBids.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">You haven't submitted any bids yet</p>
                                <Link
                                    to="/"
                                    className="text-primary-600 hover:underline mt-2 inline-block"
                                >
                                    Browse available gigs
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {myBids.map((bid) => (
                                    <div
                                        key={bid._id}
                                        className="border rounded-lg p-4 hover:shadow-md transition"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-gray-800 line-clamp-1">
                                                {bid.gigId?.title || 'Deleted Gig'}
                                            </h3>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    bid.status
                                                )}`}
                                            >
                                                {bid.status}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {bid.message}
                                        </p>

                                        <div className="flex justify-between items-center">
                                            <span className="text-green-600 font-semibold">
                                                Your Bid: ${bid.price}
                                            </span>
                                            {bid.gigId && (
                                                <Link
                                                    to={`/gigs/${bid.gigId._id}`}
                                                    className="text-primary-600 hover:underline text-sm"
                                                >
                                                    View Gig
                                                </Link>
                                            )}
                                        </div>

                                        {bid.status === 'hired' && (
                                            <div className="mt-2 pt-2 border-t text-green-600 text-sm font-medium">
                                                Brother You’ve been hired for this project!
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

