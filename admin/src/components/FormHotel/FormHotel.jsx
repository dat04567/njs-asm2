import React from 'react';
import { Form, redirect } from 'react-router-dom';
import './formHotel.css';
import { useInput } from 'hook/useInput';
import { isNotEmpty } from 'utils/validation';
import instance from 'utils/axios';
import requests from 'utils/request';

function FormHotel({ method, hotel }) {
   const {
      value: nameValue,
      handleInputChange: handleNamelChange,
      hasError: nameHasError,
   } = useInput(hotel?.name || '', (value) => isNotEmpty(value));

   const {
      value: typeValue,
      handleInputChange: handleTypelChange,
      hasError: typeHasError,
   } = useInput(hotel?.type || '', (value) => isNotEmpty(value));
   const {
      value: cityValue,
      handleInputChange: handleCitylChange,
      hasError: cityHasError,
   } = useInput(hotel?.city || '', (value) => isNotEmpty(value));
   const {
      value: addressValue,
      handleInputChange: handleAdresslChange,
      hasError: addressHasError,
   } = useInput(hotel?.address || '', (value) => isNotEmpty(value));

   const {
      value: descValue,
      handleInputChange: handleDescChange,
      hasError: descHasError,
   } = useInput(hotel?.desc || '', (value) => isNotEmpty(value));

   const {
      value: distanceValue,
      handleInputChange: handleDistanceChange,
      hasError: distanceHasError,
   } = useInput(hotel?.distance || '', (value) => isNotEmpty(value));

   const price = hotel?.cheapestPrice === undefined ? '' : '' + hotel.cheapestPrice;
   const {
      value: priceValue,
      handleInputChange: handlePriceChange,
      hasError: priceHasError,
   } = useInput(price, (value) => isNotEmpty(value));

   const {
      value: titleValue,
      handleInputChange: handleTitleChange,
      hasError: titleHasError,
   } = useInput(hotel?.title || '', (value) => isNotEmpty(value));

   const images = hotel?.photos.join('\n');
   const {
      value: photosValue,
      handleInputChange: handlePhotosChange,
      hasError: photosHasError,
   } = useInput(images || '', (value) => isNotEmpty(value));

   const rooms = hotel?.rooms.map((room) => room.title).join('\n');

   const {
      value: roomsValue,
      handleInputChange: handleRoomsChange,
      hasError: roomsHasError,
   } = useInput(rooms || '', (value) => isNotEmpty(value));

   return (
      <Form method={method} className="form-hotel">
         <div>
            <label htmlFor="">Name</label>
            <input
               type="text"
               placeholder="My Hotel"
               value={nameValue}
               onChange={handleNamelChange}
               name="name"
            />
         </div>
         <div>
            <label htmlFor="">Type</label>
            <input
               type="text"
               placeholder="hotel"
               name="type"
               value={typeValue}
               onChange={handleTypelChange}
            />
         </div>
         <div>
            <label htmlFor="">City</label>
            <input
               type="text"
               placeholder="New York"
               name="city"
               value={cityValue}
               onChange={handleCitylChange}
            />
         </div>
         <div>
            <label htmlFor="">Address</label>
            <input
               type="text"
               placeholder="etton st. 216"
               name="address"
               value={addressValue}
               onChange={handleAdresslChange}
            />
         </div>
         <div>
            <label htmlFor="">Distance from City Center</label>
            <input
               type="text"
               placeholder="500"
               name="distance"
               value={distanceValue}
               onChange={handleDistanceChange}
            />
         </div>
         <div>
            <label htmlFor="">Title</label>
            <input
               type="text"
               placeholder="The best Hotel"
               name="title"
               value={titleValue}
               onChange={handleTitleChange}
            />
         </div>
         <div>
            <label htmlFor="">Description</label>
            <input
               type="text"
               placeholder="description"
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
               name="cheapestPrice"
               value={priceValue}
               onChange={handlePriceChange}
            />
         </div>
         <div>
            <label htmlFor="">Images</label>
            <textarea onChange={handlePhotosChange} value={photosValue} name="photos" />
         </div>
         <div>
            <label htmlFor="">Feature</label>
            <select id="" className="feature" name="feature">
               <option value="true">Yes</option>
               <option value="false">No</option>
            </select>
         </div>
         <div>
            <label htmlFor="">Rooms</label>
            <textarea
               className="rooms"
               name="rooms"
               value={roomsValue}
               onChange={handleRoomsChange}
            />
         </div>
         <button
            type="submit"
            className="submit"
            disabled={
               nameHasError ||
               typeHasError ||
               cityHasError ||
               addressHasError ||
               descHasError ||
               distanceHasError ||
               priceHasError ||
               typeHasError ||
               titleHasError ||
               photosHasError ||
               roomsHasError
            }>
            Send
         </button>
      </Form>
   );
}

export default FormHotel;

export async function action({ request, params }) {
   const formData = await request.formData();
   const hotelData = {
      hotelId: params.hotelId,
      name: formData.get('name') ,
      type: formData.get('type') ,
      city: formData.get('city') ,
      address: formData.get('address') ,
      distance: +formData.get('distance') ,
      title: formData.get('title') ,
      desc: formData.get('desc'),
      cheapestPrice: +formData.get('cheapestPrice'),
      photos: formData.get('photos').split('\n') ,
      feature: formData.get('feature') === 'true',
      rooms: formData.get('rooms').split('\n'),
   };
   const respones   = await instance.post(requests.postUpdateHotel, hotelData);
   window.confirm(respones.data.message);
   return redirect('/hotels');
}
