import './searchItem.css';

const SearchItem = ({ name, featured, cheapestPrice,distance,rating,photos,title }) => {
   return (
      <div className="searchItem">
         <img src={photos[0]} alt="" className="siImg" />
         <div className="siDesc">
            <h1 className="siTitle">{name}</h1>
            <span className="siDistance">{distance} from center</span>
            {/* <span className="siTaxiOp">{tag}</span> */}
            <span className="siSubtitle">{title}</span>
            {featured && (
               <div>
                  <span className="siCancelOp">Free cancellation </span>
                  <span className="siCancelOpSubtitle">
                     You can cancel later, so lock in this great price today!
                  </span>
               </div>
            )}
         </div>
         <div className="siDetails">
            <div className="siRating">
               <span>Excellent</span>
               <button>{rating}</button>
            </div>
            <div className="siDetailTexts">
               <span className="siPrice">${cheapestPrice}</span>
               <span className="siTaxOp">Includes taxes and fees</span>
               <button className="siCheckButton">See availability</button>
            </div>
         </div>
      </div>
   );

};

export default SearchItem;

// export function
