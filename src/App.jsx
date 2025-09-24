import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import OTPScreen from './components/OTPScreen';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import ProfileSettings from './components/ProfileSettings';
import Subscription from './components/Subscription';
import Inventory from './components/Inventory';
import PartsStore from './components/PartsStore';
import AddPart from './components/AddPart';
import AddCar from './components/AddCar';
import TradeApplication from './components/TradeApplication';
import TradeApplications from './components/TradeApplications';
import AddSubVendor from './components/AddSubVendor';
import SubVendors from './components/SubVendors';
import CarRequests from './components/CarRequests';
import DocumentRequests from './components/DocumentRequests';
import Favorites from './components/Favorites';
import CarDetails from './components/CarDetails';
import Layout from './components/Layout';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = Cookies.get('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const isLoggedIn = Cookies.get('isLoggedIn') === 'true';
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path="/forgot-password" element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } />
        <Route path="/otp" element={
          <PublicRoute>
            <OTPScreen />
          </PublicRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/user-management" element={
          <ProtectedRoute>
            <Layout title="User Management">
              <UserManagement />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/profile-settings" element={
          <ProtectedRoute>
            <Layout title="Profile Settings">
              <ProfileSettings />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/subscription" element={
          <ProtectedRoute>
            <Layout title="Subscription">
              <Subscription />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/inventory" element={
          <ProtectedRoute>
            <Layout title="My Inventory">
              <Inventory />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/parts-store" element={
          <ProtectedRoute>
            <Layout title="Parts Store">
              <PartsStore />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/parts/add" element={
          <ProtectedRoute>
            <Layout title="Add New Part">
              <AddPart />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/car/add" element={
          <ProtectedRoute>
            <Layout title="Add New Car">
              <AddCar />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/trade-application" element={
          <ProtectedRoute>
            <Layout title="Trade Application">
              <TradeApplication />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/trade-applications" element={
          <ProtectedRoute>
            <Layout title="Trade Applications">
              <TradeApplications />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/add-subvendor" element={
          <ProtectedRoute>
            <Layout title="Add Sub Vendor">
              <AddSubVendor />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/sub-vendors" element={
          <ProtectedRoute>
            <Layout title="Sub Vendors">
              <SubVendors />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/car-requests" element={
          <ProtectedRoute>
            <Layout title="Car Requests">
              <CarRequests />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/document-requests" element={
          <ProtectedRoute>
            <DocumentRequests />
          </ProtectedRoute>
        } />
        <Route path="/favorites" element={
          <ProtectedRoute>
            <Layout title="My Favorites">
              <Favorites />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/car/:id" element={
          <ProtectedRoute>
            <CarDetails />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;
