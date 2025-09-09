import React, { useState } from 'react';
import { FaHeart, FaMapMarkerAlt, FaGasPump, FaCog, FaCalendarAlt } from 'react-icons/fa';
import '../styles/CarCard.css';

const CarCard = ({ 
  car = {
    id: 1,
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'],
    make: 'Toyota',
    model: 'Camry',
    variant: 'XLE',
    year: 2022,
    price: 25000,
    fuel: 'Petrol',
    mileage: 15000,
    location: 'New York',
    transmission: 'Automatic',
    tag: 'Featured'
  }
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price) => {
    return `PKR ${new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)}`;
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const getTagClass = (tag) => {
    switch (tag?.toLowerCase()) {
      case 'featured':
        return 'tag-featured';
      case 'trade':
        return 'tag-trade';
      case 'normal':
        return 'tag-normal';
      default:
        return 'tag-normal';
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

  return (
    <div className="car-card">
      {/* Image Section */}
      <div className="car-image-container">
        <img 
          src={car.images[currentImageIndex]} 
          alt={`${car.make} ${car.model}`}
          className="car-image"
        />
        
        {/* Image Navigation */}
        {car.images.length > 1 && (
          <>
            <button className="image-nav prev" onClick={prevImage}>
              ‹
            </button>
            <button className="image-nav next" onClick={nextImage}>
              ›
            </button>
            <div className="image-indicators">
              {car.images.map((_, index) => (
                <span 
                  key={index}
                  className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Tag */}
        <div className={`car-tag ${getTagClass(car.tag)}`}>
          {car.tag}
        </div>

        {/* Favorite Button */}
        <button 
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <FaHeart />
        </button>
      </div>

      {/* Car Details */}
      <div className="car-details">
        {/* Title */}
        <div className="car-title">
          <h3>{car.make} {car.model}</h3>
          <p className="car-variant">{car.variant}</p>
        </div>

        {/* Price */}
        <div className="car-price">
          {formatPrice(car.price)}
        </div>

        {/* Specifications */}
        <div className="car-specs">
          <div className="spec-item">
            <FaCalendarAlt className="spec-icon" />
            <span>{car.year}</span>
          </div>
          
          <div className="spec-item">
            <FaGasPump className="spec-icon" />
            <span>{car.fuel}</span>
          </div>
          
          <div className="spec-item">
            <FaCog className="spec-icon" />
            <span>{car.transmission}</span>
          </div>
          
          <div className="spec-item">
            <span className="mileage">{formatMileage(car.mileage)} km</span>
          </div>
        </div>

        {/* Location */}
        <div className="car-location">
          <FaMapMarkerAlt className="location-icon" />
          <span>{car.location}</span>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
