import React, { useState } from 'react';
import NavBar from '../Components/NavBar';
import { db } from '../firebase'; // Import Firebase Firestore
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore methods
import LocationInput from '../Components/LocationInput';

const SubmitRequest = () => {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // For previewing the local image

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = {
      address,
      location,
      issueType,
      description,
      imageUrl: previewUrl, // Temporary local URL for testing
      createdAt: new Date(),
      status: 'Pending'
    };

    try {
      // Save to Firebase Firestore
      await addDoc(collection(db, 'requests'), formData);
      console.log('Form data saved successfully:', formData);

      // Reset form after submission
      setAddress('');
      setLocation('');
      setIssueType('');
      setDescription('');
      setFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error saving form data to Firestore:', error);
    }
  };

  // Handle file change and create a temporary local preview URL
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Create local URL
    }
  };

  return (
    <div className='h-[100vh] max-h-[100vh] homebg'>
      <NavBar className="" />
      
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4 border rounded-lg shadow-md bg-white z-10 mt-20">
        {/* Location Input */}
        <div>
          <label className="block text-gray-700">Address:</label>
          <input
            type="text"
            className="w-full p-2 border mb-2"
            placeholder="Street Number and Name"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
      <label htmlFor="" className='block text-gray-700'>Detect Location</label>

        <LocationInput />

          <label className="block text-gray-700">Location:</label>
          <select
            className="w-full p-2 border"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="" disabled>Select location</option>
            <option value="Batken">Batken</option>
            <option value="Chuy">Chuy</option>
            <option value="Jalal-Abad">Jalal-Abad</option>
            <option value="Issyq-Kull">Issyq-Kull</option>
            <option value="Naryn">Naryn</option>
            <option value="Osh">Osh</option>
            <option value="Talas">Talas</option>
          </select>
        </div>


        {/* Issue Type Dropdown */}
        <div>
          <label className="block text-gray-700">Issue Type:</label>
          <select
            className="w-full p-2 border"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
          >
            <option value="" disabled>Select issue type</option>
            <option value="Abandoned Vehicles">Abandoned Vehicles</option>
            <option value="Graffiti">Graffiti</option>
            <option value="Public Toilet">Public Toilet</option>
            <option value="Road Traffic Signs">Road Traffic Signs</option>
            <option value="Rubbish">Rubbish</option>
            <option value="Street lighting">Street lighting</option>
            <option value="Street Name Plate">Street Name Plate</option>
            <option value="Traffic Light">Traffic Light</option>
            <option value="Trees">Trees</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-gray-700">Description:</label>
          <textarea
            className="w-full p-2 border"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter issue description"
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700">Upload Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {/* Show preview if file is selected */}
          {/* {previewUrl && (
            <div className="mt-2">
              <img src={previewUrl} alt="Preview" className="w-full h-auto rounded-md" />
              <p className="text-sm text-green-500 mt-2">File selected: {file.name}</p>
            </div>
          )} */}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitRequest;
