import React from 'react'
import { useUser, UserButton, SignInButton } from '@clerk/clerk-react'

const Navbar = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  // Show loading state while Clerk initializes
  if (!isLoaded) {
    return (
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Buy More Save More</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-white">First Link</a>
            <a className="mr-5 hover:text-white">Second Link</a>
            <a className="mr-5 hover:text-white">Third Link</a>
            <a className="mr-5 hover:text-white">Fourth Link</a>
          </nav>
          <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <div>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <img
              src="/BuyMoreSaveMore_Logo.png"   // <-- replace with correct path of the generated logo file
              alt="Buy More Save More Logo"
              className="w-10 h-10 p-2 bg--500 rounded-full object-contain"
            />
            <span className="ml-3 text-xl">Buy More Save More</span>
          </a>

          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-white">First Link</a>
            <a className="mr-5 hover:text-white">Second Link</a>
            <a className="mr-5 hover:text-white">Third Link</a>
            <a className="mr-5 hover:text-white">Fourth Link</a>
          </nav>

          {/* Authentication Section */}
          <div className="flex items-center space-x-3">
            {isSignedIn ? (
              <>

                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "bg-gray-800 border border-gray-600",
                      userButtonPopoverActionButton: "text-gray-300 hover:bg-gray-700"
                    }
                  }}
                />
              </>
            ) : (
              <SignInButton mode="modal">
                <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 text-white">
                  Login
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar