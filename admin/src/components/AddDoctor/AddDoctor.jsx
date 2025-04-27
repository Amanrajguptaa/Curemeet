import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../store/store';

const AddDoctor = () => {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const { backendUrl, token } = useContext(AdminContext);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [formData, setFormData] = useState({
    image: null,
    name: '',
    specialty: '',
    email: '',
    password: '',
    degree: '',
    experience: '', 
    fees: '',
    about: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.image) {
        return toast.error('Image not selected');
      }
      if (!address1 || !address2) {
        return toast.error('Both address lines are required');
      }

      if (!formData.name || !formData.email || !formData.password || !formData.degree || !formData.fees || !formData.about) {
        return toast.error('Please fill in all required fields');
      }

      const formDataToSend = new FormData();
      const addressData = {
        line1: address1,
        line2: address2,
      };

      formDataToSend.append('image', formData.image);
      formDataToSend.append('address', JSON.stringify(addressData));
      formDataToSend.append('name', formData.name);
      formDataToSend.append('speciality', formData.specialty);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('degree', formData.degree);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('fees', formData.fees);
      formDataToSend.append('about', formData.about);

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formDataToSend,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setFormData({
          image: null,
          name: '',
          specialty: '',
          email: '',
          password: '',
          degree: '',
          experience: '',
          fees: '',
          about: '',
        });
        setAddress1('');
        setAddress2('');
        setPreviewUrl(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      toast.error('An error occurred while adding the doctor');
    }
  };

  const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all duration-200 outline-none";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";
  const selectClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all duration-200 outline-none bg-white";

  return (
    <div className="p-6">
      <div className="border-b border-gray-200 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Add New Doctor</h2>
        <p className="text-gray-500 mt-1">Complete the form below to add a new doctor to the system</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-md bg-gray-50 flex items-center justify-center relative">
            {previewUrl ? (
              <img src={previewUrl} alt="Doctor preview" className="w-full h-full object-cover" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Upload Doctor Profile Picture</p>
            <p className="text-sm text-gray-500 mb-2">Professional photo recommended</p>
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
              id="picture"
              accept="image/*"
            />
            <label 
              htmlFor="picture" 
              className="inline-flex items-center px-4 py-2 bg-primary/30 text-primary rounded-lg border border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Choose image
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Full Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Dr. John Smith"
              className={inputClasses}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div>
            <label className={labelClasses}>Specialty<span className="text-red-500">*</span></label>
            <select
              className={selectClasses}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Email Address<span className="text-red-500">*</span></label>
            <input
              type="email"
              placeholder="doctor@example.com"
              className={inputClasses}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div>
            <label className={labelClasses}>Password<span className="text-red-500">*</span></label>
            <input
              type="password"
              placeholder="Set a secure password"
              className={inputClasses}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Degree<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="MD, MBBS, etc."
              className={inputClasses}
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            />
          </div>
          
          <div>
            <label className={labelClasses}>Experience</label>
            <select
              className={selectClasses}
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

        <div>
          <label className={labelClasses}>Consultation Fees ($)<span className="text-red-500">*</span></label>
          <input
            type="number"
            placeholder="Enter consultation fees"
            className={inputClasses}
            value={formData.fees}
            onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <label className={labelClasses}>Address<span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="Address Line 1"
            className={inputClasses}
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address Line 2"
            className={inputClasses}
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>

        <div>
          <label className={labelClasses}>About<span className="text-red-500">*</span></label>
          <textarea
            placeholder="Provide a brief description of the doctor's background, specializations, and approach to patient care..."
            className={`${inputClasses} h-40 resize-y`}
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-primary/50 hover:bg-primary text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;