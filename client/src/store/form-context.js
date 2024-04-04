import React from 'react';

const BillContext = React.createContext({
   data: {
      name: '',
      email: '',
      phone: '',
      cardNumber: '',
      date: [
         {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
         },
      ],
      rooms: [],
      nameRooms : [],
      numberDate : 1, 
      price : 0,
      payMethod : ''
   },
   setFormData: () => {},
});
export default BillContext;
