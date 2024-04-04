import { Link } from 'react-router-dom';
import './featuredProperties.css';

const FeaturedProperties = ({ hotels }) => {
   return (
      <div className="fp">
         {hotels.map((hotel,index) => (
            <div key={index} className="fpItem">
               <img
                  src={hotel.photos[0]}
                  alt=""
                  className="fpImg"
               />
               <span className="fpName">
                  <Link to={`/hotels/${hotel._id}`} target='blank'>
                     {hotel.name}
                  </Link>
               </span>
               <span className="fpCity">{hotel.city}</span>
               <span className="fpPrice">Starting from ${hotel.cheapestPrice}</span>
               <div className="fpRating">
                  <button>{hotel.rating}</button>
                  <span>Excellent</span>
               </div>
            </div>
         ))}
      </div>
   );
};

export default FeaturedProperties;
