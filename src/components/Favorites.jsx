import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHeart, 
  FaCar, 
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaTachometerAlt,
  FaGasPump,
  FaCogs
} from 'react-icons/fa';
import '../styles/Favorites.css';

const Favorites = () => {
  const navigate = useNavigate();

  // Sample favorite cars data - in real app, this would come from API/localStorage
  const [favoriteCars, setFavoriteCars] = useState([
    {
      id: 1,
      make: 'BMW',
      model: 'X5',
      variant: 'xDrive40i',
      year: 2023,
      price: 65000,
      mileage: 15000,
      fuel: 'Petrol',
      transmission: 'Automatic',
      location: 'New York',
      category: 'luxury',
      dateAdded: '2024-12-15',
      dateFavorited: '2024-12-20',
      images: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'
      ],
      views: 245,
      inquiries: 12,
      daysListed: 15,
      dealer: {
        name: 'Premium Auto Dealer',
        rating: 4.8,
        location: 'New York, NY'
      },
      notes: 'Perfect condition, low mileage, great for family'
    },
    {
      id: 2,
      make: 'Mercedes',
      model: 'C-Class',
      variant: 'AMG C43',
      year: 2022,
      price: 55000,
      mileage: 12000,
      fuel: 'Petrol',
      transmission: 'Automatic',
      location: 'Los Angeles',
      category: 'sport',
      dateAdded: '2024-12-10',
      dateFavorited: '2024-12-18',
      images: [
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'
      ],
      views: 189,
      inquiries: 8,
      daysListed: 20,
      dealer: {
        name: 'Luxury Motors LA',
        rating: 4.6,
        location: 'Los Angeles, CA'
      },
      notes: 'High performance, excellent handling'
    },
    {
      id: 3,
      make: 'Toyota',
      model: 'Camry',
      variant: 'XLE',
      year: 2022,
      price: 28000,
      mileage: 18000,
      fuel: 'Petrol',
      transmission: 'Automatic',
      location: 'Miami',
      category: 'reliable',
      dateAdded: '2024-12-05',
      dateFavorited: '2024-12-16',
      images: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'
      ],
      views: 98,
      inquiries: 6,
      daysListed: 25,
      dealer: {
        name: 'Reliable Auto Miami',
        rating: 4.4,
        location: 'Miami, FL'
      },
      notes: 'Great value, reliable brand'
    },
    {
      id: 4,
      make: 'Honda',
      model: 'Civic',
      variant: 'Sport',
      year: 2023,
      price: 25000,
      mileage: 8000,
      fuel: 'Petrol',
      transmission: 'Manual',
      location: 'Seattle',
      category: 'economy',
      dateAdded: '2024-12-12',
      dateFavorited: '2024-12-19',
      images: [
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'
      ],
      views: 167,
      inquiries: 9,
      daysListed: 18,
      dealer: {
        name: 'Seattle Auto Center',
        rating: 4.7,
        location: 'Seattle, WA'
      },
      notes: 'Fuel efficient, sporty design'
    }
  ]);

  // Use all cars without filtering or sorting
  const sortedCars = favoriteCars;


  const handleRemoveFavorite = (carId) => {
    if (window.confirm('Are you sure you want to remove this car from your favorites?')) {
      setFavoriteCars(favoriteCars.filter(car => car.id !== carId));
    }
  };

  const handleViewCar = (carId) => {
    navigate(`/car/${carId}`);
  };



  return (
    <div className="favorites-page">
      <div className="favorites-container">
        

        {/* Cars Grid */}
        <div className="favorites-cars-container grid">
          {sortedCars.length > 0 ? (
            sortedCars.map(car => (
              <div 
                key={car.id} 
                className="favorites-car-card"
                onClick={() => handleViewCar(car.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Image Section */}
                <div className="favorites-car-image-section">
                  <img 
                    src={car.images[0]} 
                    alt={`${car.make} ${car.model}`}
                    className="favorites-car-image"
                  />
                  
                  {/* Remove Favorite Button */}
                  <button 
                    className="favorites-remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(car.id);
                    }}
                    title="Remove from favorites"
                  >
                    <FaHeart />
                  </button>
                </div>

                {/* Content Section */}
                <div className="favorites-car-content">
                  {/* Header */}
                  <div className="favorites-car-header">
                    <h3 className="favorites-car-title">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="favorites-car-variant">{car.variant}</p>
                  </div>

                  {/* Price */}
                  <div className="favorites-car-price">
                    <span className="favorites-price-icon">₨</span>
                    <span className="favorites-price-amount">
                      {(() => {
                        // Convert USD to PKR (assuming 1 USD = 280 PKR)
                        const pkrPrice = car.price * 280;
                        
                        if (pkrPrice >= 10000000) { // 1 crore or more
                          const crores = pkrPrice / 10000000;
                          return `PKR ${crores.toFixed(1)} Cr`;
                        } else if (pkrPrice >= 100000) { // 1 lakh or more
                          const lacs = pkrPrice / 100000;
                          return `PKR ${lacs.toFixed(1)} Lac`;
                        } else {
                          return `PKR ${new Intl.NumberFormat('en-US').format(pkrPrice)}`;
                        }
                      })()}
                    </span>
                  </div>

                  {/* Key Details - 2x2 Grid */}
                  <div className="favorites-car-details-row">
                    <div className="favorites-detail-item">
                      <FaTachometerAlt className="favorites-detail-icon" />
                      <span className="favorites-detail-text">
                        {new Intl.NumberFormat('en-US').format(car.mileage)} miles
                      </span>
                    </div>
                    <div className="favorites-detail-item">
                      <FaGasPump className="favorites-detail-icon" />
                      <span className="favorites-detail-text">{car.fuel}</span>
                    </div>
                    <div className="favorites-detail-item">
                      <FaCogs className="favorites-detail-icon" />
                      <span className="favorites-detail-text">{car.transmission}</span>
                    </div>
                    <div className="favorites-detail-item">
                      <FaMapMarkerAlt className="favorites-detail-icon" />
                      <span className="favorites-detail-text">{car.location}</span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="favorites-car-meta-row">
                    <div className="favorites-car-date">
                      <FaCalendarAlt className="favorites-date-icon" />
                      <span className="favorites-date-text">
                        Favorited: {car.dateFavorited}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="favorites-empty-state">
              <FaHeart className="favorites-empty-icon" />
              <h3>No favorite cars found</h3>
              <p>Start adding cars to your favorites to see them here.</p>
              <button className="favorites-action-btn">
                <FaCar />
                Browse Cars
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {sortedCars.length > 0 && (
          <div className="favorites-pagination">
            <button className="favorites-pagination-btn" disabled>
              Previous
            </button>
            <div className="favorites-pagination-info">
              Showing 1-{sortedCars.length} of {sortedCars.length} favorite cars
            </div>
            <button className="favorites-pagination-btn">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
