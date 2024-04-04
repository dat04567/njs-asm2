import React, { useContext } from 'react';
import BillContext from '../../store/form-context';
const  FormBill =  () => {
   const {setFormData, data} = useContext(BillContext);
   return (
      <form className="pay-form" >
         <div>
            <label htmlFor="fullname">Your Full Name: </label>
            <input type="text" name="name" placeholder="Full Name" value={data.name} onChange={setFormData} required />
         </div>

         <div>
            <label htmlFor="email">Your Email:</label>
            <input type="text" name="email" placeholder="Email" value={data.email} onChange={setFormData}  />
         </div>
         <div>
            <label htmlFor="email">Your Phone Number:</label>
            <input type="number" name="phone" placeholder="Your Phone Number" value={data.phone} required onChange={setFormData}  />
         </div>

         <div>
            <label htmlFor="email">Your Indentity Card Number</label>
            <input type="number" name="cardNumber" placeholder="Card Number" value={data.cardNumber} required onChange={setFormData}  />
         </div>
       
      </form>
   );
}

export default FormBill;
