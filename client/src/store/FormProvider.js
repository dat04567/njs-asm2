import React, { useCallback, useReducer } from 'react';
import BillContext from './form-context';
import { useSubmit } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';
const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000;

const initForm = {
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
   nameRooms: [],
   numberDate: 1,
   price: 0,
   payMethod: '',
};

const formReducer = (state, action) => {
   switch (action.type) {
      case 'SET_FORM': {
         return {
            ...state,
            [action.name]: action.value,
         };
      }
      case 'SET_DATE': {
         return {
            ...state,
            date: action.date,
            numberDate: action.numberDate,
         };
      }
      case 'SET_PRICE': {
         return {
            ...state,
            price: action.price,
         };
      }
      case 'SET_PAYMENT': {
         return {
            ...state,
            payMethod: action.payMethod,
         };
      }
      case 'ADD_ROOM': {
         console.log(action);
         let updatedItems;
         if (action.checked) {
            // if not find room add new room
            updatedItems = {
               ...state,
               nameRooms: state.nameRooms.concat([+action.nameRoom]),
               rooms: state.rooms.concat([ action._id ]),
            };
         } else {
            const roomIndex = state.rooms.indexOf(action._id);
            const newRoom = [...state.rooms];
            newRoom.splice(roomIndex, 1);
            updatedItems = {
               ...state,
               rooms: newRoom,
               nameRooms: state.nameRooms.filter((name) => name !== +action.nameRoom),
            };
         }

         return updatedItems;
      }
      default: 
         return state;
   }
};
const FormProvider = (props) => {
   const [formData, dispatchFormData] = useReducer(formReducer, initForm);
   const submit = useSubmit();
   const handleChange = (e) => {
      dispatchFormData({ type: 'SET_FORM', name: [e.target.name], value: e.target.value });
   };
   const handleRooms = useCallback((idRoom, e) => {
      dispatchFormData({
         type: 'ADD_ROOM',
         _id: idRoom,
         nameRoom: e.target.value,
         checked: e.target.checked,
      });
   },[]);

   const handlePayment = useCallback( (e) => {
      dispatchFormData({ type: 'SET_PAYMENT', payMethod: e.target.value });
   },[]);

   const handleDate =useCallback(  (item) => {
      // calulate date
      const date = item.selection;
      const diffInMilliseconds = date.endDate.getTime() - new Date(date.startDate).getTime();
      const diffInDays = diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS;
      // if diffInDays = 0 default 1
      dispatchFormData({
         type: 'SET_DATE',
         date: [item.selection],
         numberDate: diffInDays > 0 ? diffInDays : 1,
      });
   },[]);

   const handlePrice = useCallback((price) => {
      dispatchFormData({ type: 'SET_PRICE', price: price });
   },[]);

   const handleSubmit =  async (idHotel) => {
      const {
         phone,
         name,
         cardNumber,
         email,
         price,
         payMethod,
         nameRooms,
         date,
         rooms,
         numberDate,
      } = formData;
      if (!phone || !name || !cardNumber || !email) {
         window.alert('Please enter not field empty');
         return;
      } else if (!price) {
         window.alert('Please enter room');
         return;
      } else if (!payMethod) {
         window.alert('Please enter payment method');
         return;
      }

      const token = getAuthToken();
      console.log(token);
      const data = {
         idHotel: idHotel,
         numberRoom: nameRooms,
         numberDate,
         rooms : rooms,
         name,
         phone,
         cardNumber,
         email,
         payMethod,
         date : date[0],
         user : token.email
      };
      submit(data, { method: 'post', action: `/hotels/${idHotel}` , encType :"application/json" });
   };

   const formContext = {
      data: { ...formData },
      setFormData: handleChange,
      handleRooms,
      handleDate,
      handlePrice,
      handleSubmit,
      handlePayment,
   };

   return <BillContext.Provider value={formContext}>{props.children}</BillContext.Provider>;
};
export default FormProvider;
