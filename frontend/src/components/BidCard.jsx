import { IndianRupeeIcon, User, CheckCircle, XCircle } from "lucide-react";

export default function BidCard({ bid, isOwner, onHire }) {
  const statusColor = {
    pending: "text-yellow-600",
    hired: "text-green-600",
    rejected: "text-red-600",
  };

  return (
    <div className="border rounded-lg p-5 bg-white shadow-sm">
      
      {/* Freelancer */}
      <div className="flex items-center gap-2 mb-3">
        <User size={16} />
        <span className="font-medium">
          {bid.freelancerId?.name || "Freelancer"}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{bid.message}</p>

      <div className="flex justify-between items-center mb-4">
        <span className="flex items-center gap-1 font-semibold">
          <IndianRupeeIcon size={16} />
          {bid.price}
        </span>

        <span className={`font-medium ${statusColor[bid.status]}`}>
          {bid.status.toUpperCase()}
        </span>
      </div>

      {/* Actions */}
      {isOwner && bid.status === "pending" && (
        <button
          onClick={() => onHire(bid._id)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          Hire Freelancer
        </button>
      )}

      {bid.status === "hired" && (
        <div className="flex items-center gap-2 text-green-600 font-medium">
          <CheckCircle size={18} /> Hired
        </div>
      )}

      {bid.status === "rejected" && (
        <div className="flex items-center gap-2 text-red-600 font-medium">
          <XCircle size={18} /> Rejected
        </div>
      )}
    </div>
  );
}
