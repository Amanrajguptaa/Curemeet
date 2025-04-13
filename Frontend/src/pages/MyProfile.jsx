import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { DoctorsContext } from "../store/store";
import axios from "axios";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { backendUrl, token } = useContext(DoctorsContext);

  const getUserData = async () => {
    try {
      setLoading(true);
      
      const authToken = token || localStorage.getItem('token');
      
      if (!authToken) {
        setError("Authentication token not found. Please log in again.");
        setLoading(false);
        return;
      }
      
      const response = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: {
          token: authToken,
        },
      });
      
      setUserData(response.data.user);
      console.log(response.data.user);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (backendUrl) {
      getUserData();
    }
  }, [backendUrl, token]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg font-medium text-gray-700">Loading User Data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg font-medium text-red-600">{error}</div>
        <button 
          onClick={getUserData} 
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg font-medium text-gray-700">No user data available</div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="flex items-center gap-8 mb-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          <img
            className="rounded-full w-full h-full object-cover"
            src={userData.image || assets.profile_pic}
            alt={userData.name}
          />
        </div>
        <h1 className="text-3xl font-bold">{userData.name}</h1>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            CONTACT INFORMATION
          </h2>
          <div className="space-y-4">
            <div className="flex">
              <span className="w-24 text-gray-600">Email Id:</span>
              <span className="text-primary">{userData.email}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-600">Phone:</span>
              <span>{userData.phone || "Not provided"}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-600">Address:</span>
              <span>
                {userData.address ? 
                  `${userData.address.line1 || ""}, ${userData.address.line2 || ""}` : 
                  "Not provided"}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            BASIC INFORMATION
          </h2>
          <div className="space-y-4">
            <div className="flex">
              <span className="w-24 text-gray-600">Gender:</span>
              <span>{userData.gender || "Not provided"}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-600">Birthday:</span>
              <span>{userData.dob || "Not provided"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button className="border border-gray-500 px-6 py-2 rounded-3xl bg-gray-200 hover:bg-gray-300 transition duration-200">
          Edit
        </button>
        <button className="border border-gray-500 px-6 py-2 rounded-3xl bg-gray-200 hover:bg-gray-300 transition duration-200">
          Save Information
        </button>
      </div>
    </div>
  );
};

export default MyProfile;