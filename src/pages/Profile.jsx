import React, { useEffect, useState } from "react";
import {
  getProfile,
  addAddress,
  deleteAddress,
  setDefaultAddress,
} from "../services/storeApis";
import Loader from "../components/ui/Loader";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [addressForm, setAddressForm] = useState({
    full_name: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    is_default: false,
  });

  const fetchProfile = async () => {
    try {
      const profileRes = await getProfile();

      setUser(profileRes.user);
      setAddresses(profileRes.user.addresses || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;

    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();

    try {
      await addAddress(addressForm);

      await fetchProfile();

      setAddressForm({
        full_name: "",
        phone: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        is_default: false,
      });

      setShowAddressModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to add address");
    }
  };

  const handleDeleteAddress = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmDelete) return;

    try {
      await deleteAddress(id);

      await fetchProfile();
    } catch (error) {
      console.error(error);
      alert("Failed to delete address");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddress(id);

      await fetchProfile();
    } catch (error) {
      console.error(error);
      alert("Failed to update default address");
    }
  };
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-3">
            {/* Left Profile Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 p-8 text-white">
              <div className="absolute -top-16 -right-16 w-52 h-52 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/10 rounded-full"></div>

              <div className="relative flex flex-col items-center">
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
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50"
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
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50"
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
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50"
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
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50"
                  />
                </div>
              </div>

              {/* Address Section  */}
              <div className="mt-10">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Saved Addresses
                  </h2>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition"
                  >
                    + Add Address
                  </button>
                </div>
                {addresses?.length > 0 ? (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border rounded-xl p-4 flex items-start justify-between gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">
                              {address.full_name}
                            </h3>

                            {address.is_default ? (
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                                Default Address
                              </span>
                            ) : (
                              <button
                                onClick={() => handleSetDefault(address.id)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                Set as Default
                              </button>
                            )}
                          </div>

                          <p className="text-gray-600 text-sm">
                            {address.address_line_1}
                            {address.address_line_2 &&
                              `, ${address.address_line_2}`}
                            , {address.city}, {address.state} -{" "}
                            {address.pincode}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            {address.phone}
                          </p>
                        </div>

                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-gray-300 rounded-2xl p-8 text-center">
                    <p className="text-gray-500">No addresses found.</p>
                  </div>
                )}
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
            </div>
          </div>
        </div>
      </div>
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">Add New Address</h2>

              <button
                onClick={() => setShowAddressModal(false)}
                className="text-gray-500 hover:text-red-500 text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  value={addressForm.full_name}
                  onChange={handleAddressChange}
                  required
                  className="border rounded-xl px-4 py-3 w-full"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={addressForm.phone}
                  onChange={handleAddressChange}
                  required
                  className="border rounded-xl px-4 py-3 w-full"
                />
              </div>

              <textarea
                name="address_line_1"
                placeholder="Address Line 1"
                value={addressForm.address_line_1}
                onChange={handleAddressChange}
                required
                rows="3"
                className="border rounded-xl px-4 py-3 w-full"
              />

              <input
                type="text"
                name="address_line_2"
                placeholder="Address Line 2 (Optional)"
                value={addressForm.address_line_2}
                onChange={handleAddressChange}
                className="border rounded-xl px-4 py-3 w-full"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={addressForm.city}
                  onChange={handleAddressChange}
                  required
                  className="border rounded-xl px-4 py-3 w-full"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={addressForm.state}
                  onChange={handleAddressChange}
                  required
                  className="border rounded-xl px-4 py-3 w-full"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={addressForm.pincode}
                  onChange={handleAddressChange}
                  required
                  className="border rounded-xl px-4 py-3 w-full"
                />

                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={addressForm.country}
                  onChange={handleAddressChange}
                  className="border rounded-xl px-4 py-3 w-full"
                />
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="is_default"
                  checked={addressForm.is_default}
                  onChange={handleAddressChange}
                  className="w-5 h-5"
                />

                <span>Set as default address</span>
              </label>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-6 py-3 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
