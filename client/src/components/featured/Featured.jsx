import './featured.css';

const Featured = ({ hotels }) => {
   return (
      <div className="featured">
         {hotels.map((hotel,index) => (
            <div key={index} className="featuredItem">
               <img
                  src={hotel.image}
                  alt=""
                  className="featuredImg"
               />
               <div className="featuredTitles">
                  <h1>{hotel._id}</h1>
                  <h2>{hotel.count} properties</h2>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Featured;
