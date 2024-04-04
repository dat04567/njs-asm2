import Featured from '../../components/featured/Featured';
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import PropertyList from '../../components/propertyList/PropertyList';
import './home.css';
import { json, defer, useLoaderData, Await } from 'react-router-dom';
import { Suspense } from 'react';

const Home = () => {
   const { quantityByArea, quantityByType, hotelsByRating } = useLoaderData();
   return (
      <div>
         
         <Header />
         <div className="homeContainer">
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
               <Await resolve={quantityByArea}>{(hotels) => <Featured hotels={hotels} />}</Await>
            </Suspense>
            <h1 className="homeTitle">Browse by property type</h1>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
               <Await resolve={quantityByType}>{(hotels) => <PropertyList hotels={hotels} />}</Await>
            </Suspense>
            <h1 className="homeTitle">Homes guests love</h1>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
               <Await resolve={hotelsByRating}>{(hotels) => <FeaturedProperties hotels={hotels} />}</Await>
            </Suspense>
            <MailList />
  
         </div>
      </div>
   );
};

export default Home;

async function loadHotelsForArea() {
   const response = await fetch('http://localhost:5000/api/booking/quanlity');
   if (!response.ok) {
      throw json(
         { message: 'Could not fetch hotel for area.' },
         {
            status: 500,
         }
      );
   } else {
      const resData = await response.json();

      return resData;
   }
}

async function loadHotelsForType() {
   const response = await fetch('http://localhost:5000/api/booking/quantityByType');
   if (!response.ok) {
      throw json(
         { message: 'Could not fetch hotel by type .' },
         {
            status: 500,
         }
      );
   } else {
      const resData = await response.json();
      return resData;
   }
}

async function loadHotels() {
   const response = await fetch('http://localhost:5000/api/booking/hotelForRating');
   if (!response.ok) {
      throw json(
         { message: 'Could not fetch hotels.' },
         {
            status: 500,
         }
      );
   } else {

      const resData = await response.json();

      return resData;
   }
}

export function loader() {
   return defer({
      quantityByArea: loadHotelsForArea(),
      quantityByType: loadHotelsForType(),
      hotelsByRating: loadHotels(),
   });
}
