import React from 'react';
import './newHotel.css'
import { FormHotel } from 'components';



function NewHotel() {
   return <main className='new-hotel'>
      <div className='title-hotel'>Add New Hotel</div>
      <FormHotel method="post" />
   </main>;
}

export default NewHotel;





