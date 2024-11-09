// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import SubmitRequest from './Pages/SubmitRequest';
import RequestDetails from './Pages/RequestDetails';
import OfficialsDashboard from './Pages/OfficialsDashboard';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import NotFound from './Pages/NotFound';
import OpenBudget from './Pages/OpenBudget';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Contexts/AuthContext';
import AllReports from './Pages/AllReports';
import Docs from './Pages/Docs';
import TrafficViolation from './Pages/TrafficViolation';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/all-reports" element={<AllReports/>} />
          <Route path="/traffic-violation" element={<TrafficViolation/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/open-budget" element={<OpenBudget />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/submit-request" element={<SubmitRequest />} />
          <Route path="/request/:id" element={<RequestDetails />} />
          <Route path="/docs" element={<Docs />} />

          {/* Protected Routes for Officials */}
          <Route
            path="/officials-dashboard"
            element={
              <ProtectedRoute>
                <OfficialsDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
