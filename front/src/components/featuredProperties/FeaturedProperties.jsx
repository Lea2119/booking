import React from 'react';
import './featuredProperties.css';
import useFetch from '../../hooks/useFetch';

const FeaturedProperties = () => {
  const { data, loading } = useFetch("http://localhost:8080/back/hotels/countByCity?cities=rome,berlin,london");

  return (
    <div className="fp">
      {loading ? (
        'Loading'
      ) : (
        <>
          {Array.isArray(data) && data.map((count, index) => (
            <div className="fpItem" key={index}>
              <span className="fpName">City {index + 1}</span>
              <span className="fpCount">{count}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
