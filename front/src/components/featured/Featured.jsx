import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { loading } = useFetch(
    "https://booking-app-ag0s.onrender.com/back/hotels/countByCity?cities=rome,berlin,london"
  );

  // console.log(data);

  return (
    <div className="featured">
      {loading ? (
        <p>Loading, please wait...</p>
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1542820229-081e0c12af0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Rome 🇮🇹</h2>
              {/* <h2>{data[0]} properties</h2> */}
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1444838639505-f9042c5d2386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlcmxpbnxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Berlin 🇩🇪</h2>
              {/* <h2>{data[1]} properties</h2> */}
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1504226250946-dd1c795d34a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>London 🇬🇧</h2>
              {/* <h2>{data[2]} properties</h2> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
