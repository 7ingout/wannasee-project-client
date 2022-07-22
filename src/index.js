import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';
import{ Provider } from 'react-redux';
import rootReducer from './modules';


const store = createStore(rootReducer);
console.log(store.getState());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< HEAD

  <React.StrictMode>
=======
>>>>>>> 2b52a0fc690defa92c468c58967459c2122dd829
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
<<<<<<< HEAD
  </React.StrictMode>

=======
>>>>>>> 2b52a0fc690defa92c468c58967459c2122dd829
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
