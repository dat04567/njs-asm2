import React from 'react';
import { Form, Link } from 'react-router-dom';

function HotelItem({ _id, city, name, type, title }) {
   return (
      <tr>
         <td>
            <input type="checkbox" name="" id="" />
         </td>
         <td>
            <span>{_id}</span>
         </td>
         <td>
            <span>{name}</span>
         </td>
         <td>
            <span>{type}</span>
         </td>
         <td>
            <span>{title}</span>
         </td>
         <td>
            <span>{city}</span>
         </td>
         <td> 
            <Form method='post'>
               <input type="text"  name='_id' defaultValue={_id}  hidden />
               <button>Delete</button>
            </Form>
            <div>
               <input type="text"  name='_id' defaultValue={_id}  hidden />
               <Link to={`/hotel/${_id}`}>
                  <button >Edit</button>
               </Link>
            </div>
         </td>
      </tr>
   );
}

export default HotelItem;
