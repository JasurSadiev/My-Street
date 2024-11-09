import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import { db } from '../firebase'; // Import Firestore instance
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'; // Import Firestore methods

const AllReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locations] = useState([
    'Batken', 'Chuy', 'Jalal-Abad', 'Issyq-Kull', 'Naryn', 'Osh', 'Talas'
  ]);
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [currentReport, setCurrentReport] = useState(null); // Store the report being edited

  // Fetch reports from Firestore
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'requests'));
        const reportsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(reportsData);
        setFilteredReports(reportsData); // Initially show all reports
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  // Filter reports by location
  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);

    if (location === '') {
      setFilteredReports(reports);
    } else {
      const filtered = reports.filter((report) => report.location === location);
      setFilteredReports(filtered);
    }
  };

  // Handle "Update" button click
  const handleUpdateClick = (report) => {
    setCurrentReport(report); // Set the report that needs to be updated
    setModalOpen(true); // Open the modal
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentReport(null); // Reset the form state
  };

  // Handle form submission to update the report
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentReport) return;
    
    const updatedReport = {
      ...currentReport,
      status: e.target.status.value, // Update the status (or any other field)
    };

    try {
      await updateDoc(doc(db, 'requests', currentReport.id), updatedReport); // Update the report in Firestore

      // Refresh reports after update
      const querySnapshot = await getDocs(collection(db, 'requests'));
      const reportsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(reportsData);
      setFilteredReports(reportsData); // Update filtered reports to reflect the changes

      setModalOpen(false); // Close the modal after successful update
      console.log('Report updated successfully');
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  // Calculate statistics based on filtered reports
  const getStatistics = () => {
    const total = filteredReports.length;
    const pending = filteredReports.filter((report) => report.status === 'Pending').length;
    const completed = filteredReports.filter((report) => report.status === 'Completed').length;

    return { total, pending, completed };
  };

  const { total, pending, completed } = getStatistics(); // Get stats

  return (
    <div className="min-h-[100vh] bgsolid">
      <NavBar />

      {/* Location Filter Dropdown */}
      <div className="flex justify-between">
        <div className="p-4 ml-40">
          <label htmlFor="location" className="mr-2 text-lg text-gray-700">
            Filter by Location:
          </label>
          <select
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
            className="p-2 border rounded-md"
          >
            <option value="">All Locations</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Statistics */}
        <div className="p-4 mr-40">
          <h3 className="text-xl font-semibold">Statistics</h3>
          <div className="flex space-x-4 mt-2">
            <div>
              <span className="font-medium text-gray-700">Total Issues:</span> {total}
            </div>
            <div>
              <span className="font-medium text-gray-700">Pending:</span> {pending}
            </div>
            <div>
              <span className="font-medium text-gray-700">Completed:</span> {completed}
            </div>
          </div>
        </div>
      </div>

      {/* Display Reports as Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredReports.length === 0 ? (
          <div className="col-span-full text-center p-4">
            <p className="text-lg font-semibold text-gray-700">No Issues Found for Selected Location</p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div key={report.id} className="border rounded-lg shadow-md p-4 bg-white mx-auto">
              <h3 className="text-xl font-semibold">{report.issueType}</h3>
              <p className="text-sm text-gray-500">
                {report.createdAt.toDate().toLocaleString()}
              </p>
              <p className="mt-2">{report.description}</p>
              {report.imageUrl && (
                <img
                  src={report.imageUrl}
                  alt="Issue"
                  className="mt-2 w-[300px] h-[300px] rounded-md"
                />
              )}
              <p className="mt-4 text-sm text-gray-700">Location: {report.location}</p>
              <p className="mt-1 text-sm text-gray-700">Address: {report.address}</p>
              <p className="mt-2 text-sm text-gray-500">Status: {report.status}</p>
              
              {report.status === 'Pending' && (
                <button
                  onClick={() => handleUpdateClick(report)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Update
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal for updating report */}
      {modalOpen && currentReport && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg w-[400px]">
      <h3 className="text-xl font-semibold mb-4">Update Report</h3>
      <form onSubmit={handleSubmit}>
        {/* Status Select Dropdown */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            defaultValue={currentReport.status}
            className="w-full p-2 border rounded-md mt-1"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Small Textarea */}
        <div className="mb-4">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
            Comments
          </label>
          <textarea
            id="comments"
            rows="3"
            placeholder="Add comments"
            className="w-full p-2 border rounded-md mt-1"
          />
        </div>

        {/* Image File Input */}
        <div className="mb-4">
          <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="w-full p-2 border rounded-md mt-1"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default AllReports;
