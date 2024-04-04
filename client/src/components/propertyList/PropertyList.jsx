import './propertyList.css';

const PropertyList = ({ hotels }) => {
   return (
      <div className="pList">
         {hotels.map((hotel, index) => (
            <div key={index}  className="pListItem">
               <img
                  src={hotel.image}
                  alt=""
                  className="pListImg"
               />
               <div className="pListTitles">
                  <h1>{hotel._id.charAt(0).toUpperCase() + hotel._id.slice(1)}</h1>
                  <h2>  {hotel.count} {hotel._id} </h2>
               </div>
            </div>
         ))}
      </div>
   );
};

export default PropertyList;
