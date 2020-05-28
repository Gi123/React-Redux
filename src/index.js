import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from "./actions/reducer";
var redux = require("redux");
var Provider = require("react-redux").Provider;
var store = redux.createStore(reducer);

store.dispatch({
    type:"SET_STATE",
    state:{
        items:[
            {id:0,name:"Текстовый блок", statusdate:"01.01.2021", status:true,datecreate:"01.01.2020"},
            {id:1,name:"Текстовый блок 1", statusdate:"00.00.0000",status:false,datecreate:"01.01.2020"},
        ]
    }
})

ReactDOM.render(
  <Provider  store={store}>
    <App />
  </Provider >,
  document.getElementById('root')
);

serviceWorker.unregister();
