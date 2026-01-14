import { useEffect, useState } from 'react';
import { useGig } from '../context/GigContext.jsx';
import GigCard from '../components/GigCard.jsx';
import { Search } from 'lucide-react';

export default function Home() {
  const { gigs= [], loading, getGigs, error } = useGig();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getGigs('');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    getGigs(searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-400">
    
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Find the Perfect Freelance Gig
            </h1>
            <p className="text-xl mb-8">
              Connect with talented freelancers or find your next project
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for gigs..."
                  className="flex-1 px-6 py-3 rounded-l-lg text-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary-800 hover:bg-primary-900 px-8 py-3 rounded-r-lg flex items-center space-x-2 transition"
                >
                  <Search size={20} />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Gigs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Available Gigs</h2>
          <span className="text-gray-600">{gigs.length} gigs found</span>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className='text-red-500'>loading....</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No gigs found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <GigCard key={gig._id} gig={gig} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

