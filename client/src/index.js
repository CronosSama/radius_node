import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose} from "redux"
import thunk from 'redux-thunk';
import jwtDecode from "jwt-decode"
import { setTokenHeader } from './api';
import {setUser} from "./actions/user_action"
import App from "./App"
import "./index.css"
import rootReducer from "./reducers/index"
//Provider will provide us access to the store from anycomponent,

const store = createStore(rootReducer,compose(applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

  if(localStorage.jwtToken){
    try {
    setTokenHeader(localStorage.jwtToken)
    store.dispatch(setUser(jwtDecode(localStorage.jwtToken)))

    }catch (error) {
    store.dispatch(setUser({}))

  }
  }

ReactDom.render(<Provider store={store}>
  <App />
</Provider>,
document.getElementById("root"))
















