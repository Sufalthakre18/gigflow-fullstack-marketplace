import { createContext, useContext, useState } from "react";
import API from "../utils/api";

const BidContext = createContext();

export function BidProvider({ children }) {
  const [bids, setBids] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  async function createBid(bidData) {
    setLoading(true);
    setError(null);
    try {
      const data = await API.post("/bids", bidData);
      setBids(prev => [...prev, data.data]);
      setMessage("Bid submitted successfully");
      return data;
    } catch (err) {
      setError(err.message || "Failed to submit bid");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function getBidsForGig(gigId) {
    setLoading(true);
    setError(null);
    try {
      const data = await API.get(`/bids/${gigId}`);
      setBids(data.data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch bids");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function getMyBids() {
    setLoading(true);
    setError(null);
    try {
      const data = await API.get("/bids/my-bids");
      setMyBids(data.data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch your bids");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function hireBid(bidId) {
    setLoading(true);
    setError(null);
    try {
      const data = await API.patch(`/bids/${bidId}/hire`);

      setBids(prev =>
        prev.map(bid => {
          if (bid._id === bidId) {
            return { ...bid, status: "hired" };
          }
          if (bid.status === "pending") {
            return { ...bid, status: "rejected" };
          }
          return bid;
        })
      );

      setMessage("Freelancer hired successfully");
      return data;
    } catch (err) {
      setError(err.message || "Failed to hire freelancer");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function deleteBid(bidId) {
    setLoading(true);
    setError(null);
    try {
      await API.delete(`/bids/${bidId}`);
      setMyBids(prev => prev.filter(bid => bid._id !== bidId));
      setMessage("Bid deleted successfully");
    } catch (err) {
      setError(err.message || "Failed to delete bid");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function clearBids() {
    setBids([]);
  }

  return (
    <BidContext.Provider
      value={{
        bids,
        myBids,
        loading,
        error,
        message,
        createBid,
        getBidsForGig,
        getMyBids,
        hireBid,
        deleteBid,
        clearBids,
      }}
    >
      {children}
    </BidContext.Provider>
  );
}

export function useBid(){
    return useContext(BidContext);
}