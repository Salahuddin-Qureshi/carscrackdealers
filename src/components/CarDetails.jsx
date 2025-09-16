import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaHeart, 
  FaShare, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaTachometerAlt, 
  FaGasPump, 
  FaCogs, 
  FaCar, 
  FaUser, 
  FaPhone, 
  FaEnvelope,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from 'react-icons/fa';
import '../styles/CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // Sample car data - in real app, this would come from API
  const car = {
    id: 1,
    make: 'BMW',
    model: 'X5',
    variant: 'xDrive40i',
    year: 2023,
    price: 65000,
    mileage: 15000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    location: 'New York, NY',
    status: 'available',
    featured: true,
    tag: 'Premium',
    dateAdded: '2024-12-15',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      'https://images.unsplash.com/photo-1549317336-206569e8475c?w=800',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      'https://images.unsplash.com/photo-1549317336-206569e8475c?w=800',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      'https://images.unsplash.com/photo-1549317336-206569e8475c?w=800',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800', 
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      'https://images.unsplash.com/photo-1549317336-206569e8475c?w=800'
    ],
    views: 245,
    inquiries: 12,
    daysListed: 15,
    dealer: {
      name: 'Premium Auto Dealer',
      rating: 4.8,
      location: 'New York, NY',
      phone: '+1 (555) 123-4567',
      email: 'contact@premiumauto.com',
      verified: true
    },
    specifications: {
      engine: '3.0L TwinPower Turbo I6',
      power: '335 HP',
      torque: '330 lb-ft',
      acceleration: '5.3s (0-60 mph)',
      topSpeed: '155 mph',
      fuelEconomy: '21/27 mpg (city/highway)',
      drivetrain: 'AWD',
      seating: '5 passengers',
      cargo: '33.9 cu ft',
      warranty: '4 years / 50,000 miles'
    },
    features: [
      'Leather Seats',
      'Sunroof',
      'Navigation System',
      'Bluetooth Connectivity',
      'Backup Camera',
      'Parking Sensors',
      'Heated Seats',
      'Premium Audio System',
      'LED Headlights',
      'All-Wheel Drive',
      'Adaptive Cruise Control',
      'Lane Departure Warning'
    ],
    history: {
      accidents: 'No accidents reported',
      owners: '1 previous owner',
      serviceHistory: 'Complete service records available',
      titleStatus: 'Clean title'
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === car.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    console.log(`${isFavorited ? 'Removing' : 'Adding'} car ${car.id} to favorites`);
  };

  const handleShare = () => {
    console.log('Sharing car:', car);
    // Handle share functionality
  };


  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return <FaCheckCircle className="car-status-icon available" />;
      case 'sold':
        return <FaTimesCircle className="car-status-icon sold" />;
      case 'reserved':
        return <FaClock className="car-status-icon reserved" />;
      default:
        return <FaClock className="car-status-icon default" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return '#28a745';
      case 'sold':
        return '#dc3545';
      case 'reserved':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="car-details-page">
      <div className="car-details-container">
        

        {/* Main Content */}
        <div className="car-details-content">
          
          {/* Left Column - Images */}
          <div className="car-details-images">
            <div className="car-details-main-image">
              <img 
                src={car.images[currentImageIndex]} 
                alt={`${car.make} ${car.model}`}
                className="car-details-image"
              />
              
              {/* Image Navigation */}
              <button 
                className="car-details-image-nav car-details-image-nav-prev"
                onClick={prevImage}
              >
                <FaChevronLeft />
              </button>
              <button 
                className="car-details-image-nav car-details-image-nav-next"
                onClick={nextImage}
              >
                <FaChevronRight />
              </button>
              
              {/* Image Counter */}
              <div className="car-details-image-counter">
                {currentImageIndex + 1} / {car.images.length}
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="car-details-thumbnails">
              {car.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${car.make} ${car.model} ${index + 1}`}
                  className={`car-details-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="car-details-info">
            
            {/* Car Title and Status */}
            <div className="car-details-title-section">
              <h1 className="car-details-title">
                {car.year} {car.make} {car.model}
              </h1>
              <p className="car-details-variant">{car.variant}</p>
              
              <div className="car-details-status">
                <div className="car-details-status-left">
                  <div 
                    className="car-details-status-badge"
                    style={{ backgroundColor: getStatusColor(car.status) }}
                  >
                    {getStatusIcon(car.status)}
                    <span>{car.status}</span>
                  </div>
                  {car.featured && (
                    <div className="car-details-featured-badge">
                      Featured
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="car-details-actions">
                  <button 
                    className={`car-details-action-btn ${isFavorited ? 'favorited' : ''}`}
                    onClick={handleToggleFavorite}
                    title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <FaHeart />
                  </button>
                  <button 
                    className="car-details-action-btn"
                    onClick={handleShare}
                    title="Share"
                  >
                    <FaShare />
                  </button>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="car-details-price">
              <FaDollarSign className="car-details-price-icon" />
              <span className="car-details-price-amount">{formatPrice(car.price)}</span>
            </div>

            {/* Key Details */}
            <div className="car-details-key-info">
              <div className="car-details-info-item">
                <FaTachometerAlt className="car-details-info-icon" />
                <div className="car-details-info-content">
                  <span className="car-details-info-label">Mileage</span>
                  <span className="car-details-info-value">{formatMileage(car.mileage)} miles</span>
                </div>
              </div>
              
              <div className="car-details-info-item">
                <FaGasPump className="car-details-info-icon" />
                <div className="car-details-info-content">
                  <span className="car-details-info-label">Fuel Type</span>
                  <span className="car-details-info-value">{car.fuel}</span>
                </div>
              </div>
              
              <div className="car-details-info-item">
                <FaCogs className="car-details-info-icon" />
                <div className="car-details-info-content">
                  <span className="car-details-info-label">Transmission</span>
                  <span className="car-details-info-value">{car.transmission}</span>
                </div>
              </div>
              
              <div className="car-details-info-item">
                <FaMapMarkerAlt className="car-details-info-icon" />
                <div className="car-details-info-content">
                  <span className="car-details-info-label">Location</span>
                  <span className="car-details-info-value">{car.location}</span>
                </div>
              </div>
            </div>

            {/* Dealer Information */}
            <div className="car-details-dealer">
              <h3 className="car-details-dealer-title">Dealer Information</h3>
              <div className="car-details-dealer-info">
                <div className="car-details-dealer-header">
                  <FaUser className="car-details-dealer-icon" />
                  <div className="car-details-dealer-details">
                    <h4 className="car-details-dealer-name">{car.dealer.name}</h4>
                    <div className="car-details-dealer-rating">
                      <span className="car-details-dealer-stars">★★★★★</span>
                      <span className="car-details-dealer-rating-value">{car.dealer.rating}</span>
                    </div>
                  </div>
                  {car.dealer.verified && (
                    <div className="car-details-dealer-verified">
                      <FaCheckCircle />
                      Verified
                    </div>
                  )}
                </div>
                
                <div className="car-details-dealer-contact">
                  <div className="car-details-dealer-contact-item">
                    <FaPhone className="car-details-contact-icon" />
                    <span>{car.dealer.phone}</span>
                  </div>
                  <div className="car-details-dealer-contact-item">
                    <FaEnvelope className="car-details-contact-icon" />
                    <span>{car.dealer.email}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Specifications Section */}
        <div className="car-details-specifications">
          <h2 className="car-details-section-title">Specifications</h2>
          <div className="car-details-specs-grid">
            {Object.entries(car.specifications).map(([key, value]) => (
              <div key={key} className="car-details-spec-item">
                <span className="car-details-spec-label">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <span className="car-details-spec-value">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="car-details-features">
          <h2 className="car-details-section-title">Features</h2>
          <div className="car-details-features-grid">
            {car.features.map((feature, index) => (
              <div key={index} className="car-details-feature-item">
                <FaCheckCircle className="car-details-feature-icon" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CarDetails;
