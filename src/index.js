import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './Reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';



// Set up redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk) ));

  ReactDOM.render(
    <Provider store={store}>
   
      <BrowserRouter>
        <App />
      </BrowserRouter>
    
    </Provider>,
  document.getElementById('root')
);
registerServiceWorker();




