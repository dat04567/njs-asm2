import React from 'react';
import {Outlet} from 'react-router-dom'
import { NavBar, Navigation } from '../../components';
import './root.css'

function Root() {
   return <>
      <NavBar />
      <Navigation />
      <Outlet />
   </>
}

export default Root;