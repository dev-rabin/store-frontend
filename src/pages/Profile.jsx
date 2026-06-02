import React, { useEffect, useState } from "react";
import { getProfile } from "../services/storeApis";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        console.log(data);

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading Profile...</p>
        </div>
      </div>
    );
  }

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-3">
            {/* Left Profile Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 p-8 text-white">
              {/* Decorative Elements */}
              <div className="absolute -top-16 -right-16 w-52 h-52 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/10 rounded-full"></div>

              <div className="relative flex flex-col items-center">
                {/* Avatar */}
                <div className="w-36 h-36 rounded-full bg-white shadow-2xl border-4 border-white flex items-center justify-center text-6xl font-bold text-red-500">
                  {initial}
                </div>

                <h2 className="text-3xl font-bold mt-6 text-center">
                  {user.name}
                </h2>

                <p className="text-white/90 mt-2 text-center break-all">
                  {user.email}
                </p>

                <span className="mt-4 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium">
                  ⭐ Active Member
                </span>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
                    <h4 className="text-xl font-bold">
                      {new Date(user.created_at).getFullYear()}
                    </h4>
                    <p className="text-sm text-white/80">Joined</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
                    <h4 className="text-xl font-bold">✓</h4>
                    <p className="text-sm text-white/80">Verified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:col-span-2 p-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    My Profile
                  </h1>

                  <p className="text-gray-500 mt-1">
                    Manage your personal information and account details
                  </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full w-fit">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Account Active
                </div>
              </div>

              {/* Profile Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    value={user.phone || "Not Added"}
                    readOnly
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Member Since
                  </label>

                  <input
                    type="text"
                    value={new Date(user.created_at).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                    readOnly
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Additional Info Cards */}
              <div className="grid md:grid-cols-3 gap-4 mt-10">
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                  <h3 className="font-semibold text-gray-900">
                    Profile Status
                  </h3>
                  <p className="text-green-600 mt-2 font-medium">Completed</p>
                </div>

                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
                  <h3 className="font-semibold text-gray-900">Account Type</h3>
                  <p className="text-orange-600 mt-2 font-medium">Customer</p>
                </div>

                <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
                  <h3 className="font-semibold text-gray-900">Security</h3>
                  <p className="text-pink-600 mt-2 font-medium">Protected</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-10">
                <button className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
