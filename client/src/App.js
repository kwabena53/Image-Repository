import './App.css';
import { store, persistor } from "./store";
import { Provider, useDispatch, } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from 'react';
import { getData } from './duck/action';
import DefaultLayout from './Components/Layouts/DefaultLayout';
import PrivateRoute from './Components/Layouts/PrivateRoute';

import { BrowserRouter as Router } from "react-router-dom";



const App = () => {

  const dispatch = useDispatch()
  const storedData = localStorage.getItem('storedApods')

  useEffect(() => {
    if (!storedData) {
      dispatch(getData())
    }
  }, [dispatch, storedData])



  return (
    <Router>
      <PrivateRoute path="/" component={DefaultLayout} />
    </Router>
  )
}


const AppWrapper = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}
export default AppWrapper;
