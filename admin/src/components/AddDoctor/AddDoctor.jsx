import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const [formData, setFormData] = useState({
    image: null,
    name: '',
    specialty: 'General physician',
    email: '',
    password: '',
    degree: '',
    experience: '1 Year', 
    fees: '',
    about: ''
  });

  const { backendUrl, aToken } = useSelector((state) => state.admin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate required fields
      if (!formData.image) {
        return toast.error('Image not selected');
      }
      if (!address1 || !address2) {
        return toast.error('Both address lines are required');
      }

      // Validate other required fields
      if (!formData.name || !formData.email || !formData.password || !formData.degree || !formData.fees || !formData.about) {
        return toast.error('Please fill in all required fields');
      }

      // Prepare the FormData object
      const formDataToSend = new FormData();
      const addressData = {
        line1: address1,
        line2: address2,
      };

      // Append form data fields
      formDataToSend.append('image', formData.image);
      formDataToSend.append('address', JSON.stringify(addressData));
      formDataToSend.append('name', formData.name);
      formDataToSend.append('speciality', formData.specialty); // Match backend field name
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('degree', formData.degree);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('fees', formData.fees);
      formDataToSend.append('about', formData.about);

      // Make the API request
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formDataToSend,
        {
          headers: {
            aToken,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Handle response
      if (data.success) {
        toast.success(data.message);
        setFormData({
          image: null,
          name: '',
          specialty: 'General physician',
          email: '',
          password: '',
          degree: '',
          experience: '1 Year',
          fees: '',
          about: '',
        });
        setAddress1('');
        setAddress2('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      toast.error('An error occurred while adding the doctor');
    }
  };

  return (
    <div className="shadow-md p-10">
      <h2 className="text-2xl font-semibold mb-6">Add Doctor</h2>

      <form onSubmit={handleSubmit}>
        {/* Doctor Image Upload */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              {!formData.image && <span className="text-gray-400">+</span>}
            </div>
            <div>
              <p className="text-sm font-medium">Upload doctor picture</p>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                id="picture"
              />
              <label htmlFor="picture" className="text-sm text-gray-500 cursor-pointer">
                Choose file
              </label>
            </div>
          </div>
        </div>

        {/* Name and Specialty */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm mb-2">Your Name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Specialty</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            >
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatrician</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </div>
        </div>

        {/* Email and Password */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm mb-2">Doctor Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Set Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        {/* Degree and Experience */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm mb-2">Degree</label>
            <input
              type="text"
              placeholder="Degree"
              className="w-full p-2 border rounded"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Experience</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            >
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
              <option>4 Years</option>
              <option>5+ Years</option>
            </select>
          </div>
        </div>

        {/* Fees */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Consultation Fees</label>
          <input
            type="number"
            placeholder="Fees"
            className="w-full p-2 border rounded"
            value={formData.fees}
            onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
          />
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Address</label>
          <input
            type="text"
            placeholder="Address Line 1"
            className="w-full p-2 border rounded mb-2"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address Line 2"
            className="w-full p-2 border rounded"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>

        {/* About */}
        <div className="mb-6">
          <label className="block text-sm mb-2">About</label>
          <textarea
            placeholder="Write about the doctor..."
            className="w-full p-2 border rounded h-32"
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
