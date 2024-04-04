import React, { useState } from 'react';
import './DetailsHotel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCircleArrowLeft,
   faCircleArrowRight,
   faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
function DetailsHotel({ hotel, faLocationDot, setOpen : setOpenBill   }) {
   const [slideNumber, setSlideNumber] = useState(0);
   const [open, setOpen] = useState(false);

   const handleOpen = (i) => {
      setSlideNumber(i);
      setOpen(true);
   };

   const handleMove = (direction) => {
      let newSlideNumber;

      if (direction === 'l') {
         newSlideNumber = slideNumber === 0 ? hotel.photos.length - 1: slideNumber - 1;
      } else {
         newSlideNumber = slideNumber === hotel.photos.length  - 1 ? 0 : slideNumber + 1;
      }

      setSlideNumber(newSlideNumber);
   };

   return (
      <>
         {open && (
            <div className="slider">
               <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
               />
               <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove('l')}
               />
               <div className="sliderWrapper">
                  <img src={hotel.photos[slideNumber]} alt="" className="sliderImg" />
               </div>
               <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove('r')}
               />
            </div>
         )}
         <div className="hotelWrapper">
            <button className="bookNow" onClick={() => setOpenBill()}>Reserve or Book Now!</button>
            <h1 className="hotelTitle">{hotel.title || hotel.name}</h1>
            <div className="hotelAddress">
               <FontAwesomeIcon icon={faLocationDot} />
               <span>{hotel.address}</span>
            </div>
            <span className="hotelDistance">
               Excellent location – {hotel.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
               Book a stay over $114 at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
               {hotel.photos.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                     <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
                  </div>
               ))}
            </div>
            <div className="hotelDetails">
               <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">Stay in the heart of City</h1>
                  <p className="hotelDesc">{hotel.desc}</p>
               </div>
               <div className="hotelDetailsPrice">
                  <h2>
                     <b>${hotel.cheapestPrice}</b> (1 nights)
                  </h2>
                  <button onClick={() => setOpenBill()} >Reserve or Book Now!</button>
               </div>
            </div>
         </div>
      </>
   );
}

export default DetailsHotel;
