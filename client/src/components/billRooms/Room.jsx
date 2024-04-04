import React from 'react';

function Room({ room, handleRoom }) {
   return (
      <div className="rooms">
         <div className="rooms-info">
            <h4>{room.title}</h4>
            <big>{room.desc}</big>
            <small className="count-people">
               Max people: <span>{room.maxPeople}</span>
            </small>
            <big>${room.price}</big>
         </div>
         <div className="rooms-number">
            {room.roomNumbers.map((number, index) => (
               <fieldset key={index}>
                  <p>{number}</p>
                  <input type="checkbox" value={number} name = {room}  onChange={handleRoom}/>
               </fieldset>
            ))}
         </div>
      </div>
   );
}

export default Room;
