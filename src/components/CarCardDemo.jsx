import React from 'react';
import CarCard from './CarCard';

const CarCardDemo = () => {
  const sampleCars = [
    {
      id: 1,
      images: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'
      ],
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
    },
    {
      id: 2,
      images: [
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'
      ],
      make: 'Honda',
      model: 'Civic',
      variant: 'Sport',
      year: 2021,
      price: 22000,
      fuel: 'Petrol',
      mileage: 25000,
      location: 'Los Angeles',
      transmission: 'Manual',
      tag: 'Trade'
    },
    {
      id: 3,
      images: [
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'
      ],
      make: 'BMW',
      model: '3 Series',
      variant: 'M Sport',
      year: 2023,
      price: 45000,
      fuel: 'Petrol',
      mileage: 8000,
      location: 'Chicago',
      transmission: 'Automatic',
      tag: 'Normal'
    }
  ];

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}>
      <h1 style={{ color: '#d01818', marginBottom: '20px' }}>Car Cards Demo</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        width: '100%',
        maxWidth: '1200px'
      }}>
        {sampleCars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarCardDemo;
