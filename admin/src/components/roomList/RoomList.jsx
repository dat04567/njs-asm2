import React from 'react';
import './roomList.css';
import RoomItem from 'components/roomItem/RoomItem';

function RoomList({rooms}) {

   
   return (
      <table className="roomsList">
         <thead>
            <tr>
               <th>
                  <input type="checkbox" name="" id="" />
               </th>
               <th>
                  <span>ID</span>
               </th>
               <th>
                  <span>Title</span>
               </th>
               <th>
                  <span>Description</span>
               </th>
               <th>
                  <span>Price</span>
               </th>
               <th>
                  <span>Max People</span>
               </th>
               <th>
                  <span>Action</span>
               </th>
            </tr>
         </thead>

         <tbody>
            {rooms.map((room) => (
               <RoomItem key={room._id} {...room} />
            ))}
         </tbody>
      </table>
   );
}

export default RoomList;
