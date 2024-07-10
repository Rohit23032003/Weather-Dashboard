
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './languages.js';
import SignUp from './SignUp.js';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom' ;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' >
      <Route path='' element={<SignUp/>}/>
      <Route path='/login/:Id' element = {<App/>}/>
    </Route>
  )
); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <I18nextProvider i18n={i18n}>
  <RouterProvider router={router}/>
  </I18nextProvider>
);
