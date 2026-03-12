import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    alert("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="mt-20 bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Flixora info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Flixora</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover the latest movies, TV shows and trending entertainment.
              Your ultimate platform for exploring cinema.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Navigation
            </h3>

            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer">Home</li>
              <li className="hover:text-white transition cursor-pointer">Favorites</li>
              <li className="hover:text-white transition cursor-pointer">Genre</li>
              <li className="hover:text-white transition cursor-pointer">TV Shows</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Support
            </h3>

            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer">
                Contact Us
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Help Center
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Terms of Service
              </li>
            </ul>
          </div>

          {/* Social + Email */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Stay Connected
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              Follow us on social media and stay updated with the latest movies.
            </p>

            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition cursor-pointer">
                <FaInstagram />
              </div>

              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition cursor-pointer">
                <FaTiktok />
              </div>

              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition cursor-pointer">
                X
              </div>

              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition cursor-pointer">
                YT
              </div>
            </div>

            {/* Email form */}
            <div className="flex flex-col">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`px-3 py-2 w-full rounded-l-lg bg-gray-800 text-gray-200 text-sm outline-none ${
                    error ? "ring-2 ring-red-500" : ""
                  }`}
                />

                <button
                  onClick={handleSubscribe}
                  className="bg-blue-500 px-4 rounded-r-lg hover:bg-blue-600 transition"
                >
                  Join
                </button>
              </div>

              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

          </div>

        </div>

        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          © {currentYear} Flixora. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;