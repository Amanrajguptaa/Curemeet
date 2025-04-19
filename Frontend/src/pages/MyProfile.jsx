import React, { useContext, useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { DoctorsContext } from "../store/store";
import axios from "axios";
import { toast } from 'react-toastify';


const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef(null);

  const { backendUrl, token } = useContext(DoctorsContext);

  const getUserData = async () => {
    try {
      setLoading(true);

      const authToken = token || localStorage.getItem("token");

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

  useEffect(() => {
    if (userData) {
      setEditedData({
        ...userData,
        address: {
          line1: userData.address?.line1 || "",
          line2: userData.address?.line2 || "",
        },
      });
      setImagePreview(userData.image || assets.profile_pic);
    }
  }, [userData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({
      ...userData,
      address: {
        line1: userData.address?.line1 || "",
        line2: userData.address?.line2 || "",
      },
    });
    setSelectedImage(null);
    setImagePreview(userData.image || assets.profile_pic);
    setImageError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setEditedData({
        ...editedData,
        address: {
          ...editedData.address,
          [addressField]: value,
        },
      });
    } else {
      setEditedData({
        ...editedData,
        [name]: value,
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageError("");
    
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setImageError("Please select a valid image file (JPEG, PNG, GIF)");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image size should not exceed 5MB");
        return;
      }

      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(assets.profile_pic);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    try {
      if (!editedData.name || !editedData.phone || !editedData.dob || !editedData.gender) {
        toast.warn("Please fill all Details")
        return;
      }

      setUpdateLoading(true);

      const authToken = token || localStorage.getItem("token");
      if (!authToken) {
        toast.error("Please Login")
        return;
      }

      const formData = new FormData();
      formData.append("userId", userData._id);
      formData.append("name", editedData.name);
      formData.append("gender", editedData.gender || "");
      formData.append("dob", editedData.dob || "");
      formData.append("phone", editedData.phone || "");
      formData.append("address", JSON.stringify(editedData.address || {}));
      
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.post(
        `${backendUrl}/api/user/edit-user`,
        formData,
        {
          headers: {
            token: authToken,
            'Content-Type': 'multipart/form-data'
          },
        }
      );

      if (response.data.success) {
        await getUserData();
        toast.success("Profile Edited")
        setIsEditing(false);
      } else {
        toast.error("Error in Updating")
      }
    } catch (err) {
      toast.error("Failed to Update")
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg font-medium text-gray-700">
          Loading User Data...
        </div>
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
        <div className="text-lg font-medium text-gray-700">
          No user data available
        </div>
      </div>
    );
  }

  const renderField = (label, fieldName, value, type = "text") => {
    return (
      <div className="flex items-start">
        <span className="w-24 text-gray-600">{label}:</span>
        {isEditing ? (
          <input
            type={type}
            name={fieldName}
            value={value || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1"
          />
        ) : (
          <span>{value || "Not provided"}</span>
        )}
      </div>
    );
  };

  return (
    <div className="py-16">
      <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden relative">
            <img
              className="rounded-full w-full h-full object-cover"
              src={isEditing ? imagePreview : (userData.image || assets.profile_pic)}
              alt={userData.name}
            />
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="text-white text-xs font-medium hover:underline"
                >
                  Change Photo
                </button>
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/png, image/jpg, image/gif"
            onChange={handleImageChange}
            className="hidden"
          />
          
          {isEditing && (
            <div className="mt-2 flex flex-col items-center">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Upload New
                </button>
                {selectedImage && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
              {imageError && (
                <p className="text-xs text-red-500 mt-1">{imageError}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Accepted formats: JPEG, PNG, GIF (Max: 5MB)
              </p>
            </div>
          )}
        </div>
        
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedData.name || ""}
            onChange={handleChange}
            className="text-3xl font-bold border-b border-gray-300 px-2"
          />
        ) : (
          <h1 className="text-3xl font-bold">{userData.name}</h1>
        )}
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            CONTACT INFORMATION
          </h2>
          <div className="space-y-4">
            {renderField("Email Id", "email", isEditing ? editedData.email : userData.email, "email")}
            {renderField("Phone", "phone", isEditing ? editedData.phone : userData.phone, "tel")}
            {isEditing ? (
              <div className="flex flex-col">
                <span className="w-24 text-gray-600 mb-2">Address:</span>
                <div className="space-y-2 ml-24">
                  <input
                    type="text"
                    name="address.line1"
                    placeholder="Address Line 1"
                    value={editedData.address?.line1 || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    name="address.line2"
                    placeholder="Address Line 2"
                    value={editedData.address?.line2 || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                </div>
              </div>
            ) : (
              <div className="flex">
                <span className="w-24 text-gray-600">Address:</span>
                <span>
                  {userData.address
                    ? `${userData.address.line1 || ""}, ${
                        userData.address.line2 || ""
                      }`
                    : "Not provided"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            BASIC INFORMATION
          </h2>
          <div className="space-y-4">
            {isEditing ? (
              <div className="flex items-center">
                <span className="w-24 text-gray-600">Gender:</span>
                <select
                  name="gender"
                  value={editedData.gender || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            ) : (
              <div className="flex">
                <span className="w-24 text-gray-600">Gender:</span>
                <span>{userData.gender || "Not provided"}</span>
              </div>
            )}
            {renderField("Birthday", "dob", isEditing ? editedData.dob : userData.dob, "date")}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        {isEditing ? (
          <>
            <button 
              onClick={handleSave}
              disabled={updateLoading}
              className={`border border-gray-500 px-6 py-2 rounded-3xl ${
                updateLoading 
                  ? "bg-gray-300 cursor-not-allowed" 
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } transition duration-200`}
            >
              {updateLoading ? "Saving..." : "Save Information"}
            </button>
            <button 
              onClick={handleCancel}
              className="border border-gray-500 px-6 py-2 rounded-3xl bg-gray-200 hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
          </>
        ) : (
          <button 
            onClick={handleEdit}
            className="border border-gray-500 px-6 py-2 rounded-3xl bg-gray-200 hover:bg-gray-300 transition duration-200"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;