import { Link } from "react-router-dom";

export default function GigCard({ gig }) {
  return (
    <div className="border rounded-lg p-5 bg-white hover:shadow-lg transition">
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {gig.title}
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {gig.description}
      </p>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm bg-gray-100 px-3 py-1 rounded">
          {gig.category}
        </span>
        <span className="text-green-600 font-bold">
          ₹{gig.budget}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Posted by: <span className="font-medium">{gig.createdBy?.name}</span>
      </p>

      <Link
        to={`/gigs/${gig._id}`}
        className="block text-center bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        View Details
      </Link>
    </div>
  );
}
