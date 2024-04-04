import React from 'react';
import { Form, redirect } from 'react-router-dom';
import './formRoom.css';
import { useInput } from 'hook/useInput';
import { isNotEmpty } from 'utils/validation';
import instance from 'utils/axios';
import requests from 'utils/request';

function FormRoom({ method, room, titleHotels }) {
   const {
      value: descValue,
      handleInputChange: handleDescChange,
      hasError: descHasError,
   } = useInput(room?.desc || '', (value) => isNotEmpty(value));

   const price = room?.price === undefined ? '' : '' + room?.price;
   const {
      value: priceValue,
      handleInputChange: handlePriceChange,
      hasError: priceHasError,
   } = useInput(price, (value) => isNotEmpty(value));

   const {
      value: titleValue,
      handleInputChange: handleTitleChange,
      hasError: titleHasError,
   } = useInput(room?.title || '', (value) => isNotEmpty(value));

   const maxPeople = room?.maxPeople === undefined ? '' : '' + room?.maxPeople;
   const {
      value: maxPeopleValue,
      handleInputChange: handleMaxPeopleChange,
      hasError: maxPeopleHasError,
   } = useInput( maxPeople  || '', (value) => isNotEmpty(value));

   const rooms = room?.roomNumbers.join('\n');

   const {
      value: roomsValue,
      handleInputChange: handleRoomsChange,
      hasError: roomsHasError,
   } = useInput(rooms || '', (value) => isNotEmpty(value));

   return (
      <Form method={method} className="form-room">
         <div>
            <label htmlFor="">Title</label>
            <input
               type="text"
               placeholder="2 Bed Room"
               name="title"
               value={titleValue}
               onChange={handleTitleChange}
            />
         </div>
         <div>
            <label htmlFor="">Description</label>
            <input
               type="text"
               placeholder="King size bed, 1 bathroom"
               name="desc"
               onChange={handleDescChange}
               value={descValue}
            />
         </div>
         <div>
            <label htmlFor="">Price</label>
            <input
               type="text"
               placeholder="100"
               name="price"
               value={priceValue}
               onChange={handlePriceChange}
            />
         </div>
         <div>
            <label htmlFor="">Max People</label>
            <input
               type="text"
               placeholder="2"
               name="maxPeople"
               value={maxPeopleValue}
               onChange={handleMaxPeopleChange}
            />
         </div>
         <div className="form-room__last">
            <div className="form-room__rooms">
               <label htmlFor="">Rooms</label>
               <textarea name="rooms" value={roomsValue} onChange={handleRoomsChange} placeholder='give comma between from numbers' />
            </div>

            <div className="form-hotel__titleHotel">
               {/* new room add room into hotels  */}
               {
                  titleHotels && <>
                     <label htmlFor="">Choose a hotel</label>
                     <select id="" name="hotel" >
                        {titleHotels.map( (hotel) => {
                           return <option value={hotel._id} key={hotel._id}>{hotel.name}</option>
                        })}
                     </select>
                  </>
               }
              
            </div>
               <button
                  type="submit"
                  className="submit"
                  disabled={
                     descHasError ||
                     priceHasError ||
                     titleHasError ||
                     maxPeopleHasError ||
                     roomsHasError
                  }>
                  Send
               </button>
         </div>
      </Form>
   );
}

export default FormRoom;

export async function action({ request, params }) {
   const formData = await request.formData();
   const room = {
      _id: params.roomId,
      hotelId:formData.get('hotel'),
      title: formData.get('title') ,
      desc: formData.get('desc'),
      price: +formData.get('price'),
      roomNumbers: formData.get('rooms').split('\n').map( number => +number),
      maxPeople: +formData.get('maxPeople'),
   };
   const respones  = await instance.post(requests.postUpdateRoom, room);
   if(respones.status === 409 || respones.status === 500)
   {
      window.confirm(respones.data.error);
      return false;
   }
   return redirect('/rooms');
}
