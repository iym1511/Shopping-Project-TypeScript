import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// react-parsist
import { persistStore } from "redux-persist"
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter basename={process.env.PUBLIC_URL}> {/** 깃 배포 빈화면일때 주소오류 잡아주는거 */}
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
