import "./searchItem.css";
import reFetch from "../../hooks/useFetch"
import {Link} from "react-router-dom"; 

const handleClick = () => {
  reFetch();
}

const SearchItem = ({item}) => {
  return ( 
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt="" 
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance} from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          {item.title}
        </span>
        <span className="siFeatures">
          {item.description}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button onClick={handleClick}>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">See availabilities</button>
          </Link>
        </div>
      </div>
    </div> 
  );
};

export default SearchItem;
