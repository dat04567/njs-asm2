import React from 'react';
import './hotelList.css';
import HotelItem from 'components/hotelItem/HotelItem';

function HotelList({hotels}) {
   
   return (
      <>
         <table className="hotelsList">
            <thead>
               <tr>
                  <th>
                     <input type="checkbox" name="" id="" />
                  </th>
                  <th>
                     <span>ID</span>
                  </th>
                  <th>
                     <span>Name</span>
                  </th>
                  <th>
                     <span>Type</span>
                  </th>
                  <th>
                     <span>Title</span>
                  </th>
                  <th>
                     <span>City</span>
                  </th>
                  <th>
                     <span>Action</span>
                  </th>
               </tr>
            </thead>

            <tbody>
               {hotels.map( (hotel) => <HotelItem key={hotel._id} {...hotel} />) }
            </tbody>
         </table>
      </>
   );
}

export default HotelList;




