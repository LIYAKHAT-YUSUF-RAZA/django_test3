import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser, SignInButton } from '@clerk/clerk-react';

const HomePage = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/data/")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const { isSignedIn, user, isLoaded } = useUser();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  // Handle product click - you can choose to require login or allow browsing
  const handleProductClick = (productName) => {
    // Option 1: Require login to view products
    if (!isSignedIn) {
      setShowLoginPrompt(true);
      return;
    }

    // Option 2: Allow browsing without login (uncomment the line below and comment out the above)
    // This will allow users to browse products but still require login for buying/adding to cart

    // User is logged in or login not required for browsing - navigate to demo
    console.log(`Viewing product: ${productName}`);
    navigate('/demo');
  };

  // Products data - you can move this to a separate file or fetch from API
  /*  const products = [
     { id: 1, name: "The Catalyzer", price: "$16.00", image: "https://sherohomefood.in/wp-content/uploads/2021/05/SHF_home-slide-1.jpg", category: "CATEGORY" },
     { id: 2, name: "Shooting Stars", price: "$21.15", image: "https://dummyimage.com/421x261", category: "CATEGORY" },
     { id: 3, name: "Neptune", price: "$12.00", image: "https://dummyimage.com/422x262", category: "CATEGORY" },
     { id: 4, name: "The 400 Blows", price: "$18.40", image: "https://dummyimage.com/423x263", category: "CATEGORY" },
     { id: 5, name: "The Catalyzer", price: "$16.00", image: "https://dummyimage.com/424x264", category: "CATEGORY" },
     { id: 6, name: "Shooting Stars", price: "$21.15", image: "https://dummyimage.com/425x265", category: "CATEGORY" },
     { id: 7, name: "Neptune", price: "$12.00", image: "https://dummyimage.com/427x267", category: "CATEGORY" },
     { id: 8, name: "The 400 Blows", price: "$18.40", image: "https://dummyimage.com/428x268", category: "CATEGORY" }
   ]; */

  /* const products = data.map((item, index) => ({
    id: index + 1, // unique id
    name: item.item_name || "",
    price: item.price || "",
    image: item.image || "https://dummyimage.com/400x400",
    category: item.category || "CATEGORY"
  })); */

  const products = data
  .slice(-8) // Get the last 8 items (most recent)
  .reverse()
  .map((item, index) => ({
    id: index + 1,
    name: item.item_name || "",
    price: item.price || "",
    image: item.image || "https://dummyimage.com/400x400",
    category: item.category || "CATEGORY"
  }));


  // Show loading state while Clerk initializes
  if (!isLoaded) {
    return (
      <div>
        <div className="text-gray-400 bg-gray-900 body-font min-h-screen">
          <section className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <div className="animate-pulse">
                    <div className="bg-gray-700 h-48 rounded mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-6 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container px-5 py-24 mx-auto">
            {/* Welcome message for logged in users */}
            {isSignedIn && (
              <div className="text-center mb-8">
                <p className="text-green-400 text-lg">
                  Welcome back, {user.firstName || user.username || 'User'}! 🛍️
                </p>
              </div>
            )}

            <div className="flex flex-wrap -m-4">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="lg:w-1/4 md:w-1/2 p-4 w-full hover:cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out"
                  onClick={() => handleProductClick(product.name)}
                >
                  {/* Enhanced card container with subtle shadow and rounded corners */}
                  <div className="bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 group">

                    {/* Image container with dynamic aspect ratio handling */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                      <img
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                        src={product.image}
                        style={{
                          // Smart object-fit based on image orientation
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                        onError={(e) => {
                          // Fallback for broken images
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjNjM2NjcyIi8+Cjwvc3ZnPg==';
                        }}
                      />

                      {/* Elegant gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Premium glass-morphism effect for non-logged users */}
                      {!isSignedIn && (
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="text-white text-center bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
                            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-indigo-500/20 backdrop-blur-md">
                              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 0h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p className="text-sm font-medium">Premium Access Required</p>
                            <p className="text-xs text-gray-300 mt-1">Sign in to unlock</p>
                          </div>
                        </div>
                      )}

                      {/* Subtle corner accent */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-indigo-500/20 group-hover:border-t-indigo-500/40 transition-all duration-300" />
                    </div>

                    {/* Enhanced content section */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-400 text-xs tracking-wider uppercase font-semibold">
                          {product.category}
                        </h3>
                        <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:bg-indigo-400 transition-colors duration-300" />
                      </div>

                      <h2 className="text-white title-font text-xl font-bold mb-3 group-hover:text-indigo-300 transition-colors duration-300 leading-tight">
                        {product.name}
                      </h2>

                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          {product.price}
                        </p>

                        {/* Subtle call-to-action arrow */}
                        <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all duration-300 group-hover:translate-x-1">
                          <svg className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Login Prompt Modal */}
        {showLoginPrompt && !isSignedIn && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="text-center">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-indigo-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 11v6a2 2 0 002 2h10a2 2 0 002-2v-6M12 15v2m-6 0h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
                <p className="text-gray-300 mb-6">
                  Please log in to your account to view product details and make purchases.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <SignInButton mode="modal">
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                      Login Now
                    </button>
                  </SignInButton>
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-6 py-2 rounded-lg transition-colors duration-200"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
  )
}

export default HomePage