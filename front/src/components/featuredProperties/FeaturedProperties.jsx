import React from 'react';
import './featuredProperties.css';
import useFetch from '../../hooks/useFetch';

const FeaturedProperties = () => {
  const { data, loading } = useFetch("https://booking-app-ag0s.onrender.com/back/hotels?featured=true");

  return (
    <div className="fp">
      {loading ? (
        'Loading'
      ) : (
        <>
          {Array.isArray(data) && data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <span>{item.rating} Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
