import React from 'react';
//import Main from './layout/homepage/main/Main';
//import Heading from './layout/homepage/heading/Heading';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getReduxStore, getRrfProp } from './config/firebase-redux';
import './App.css';
//import ViewArticle from './layout/view-article/ViewArticle';
//import NewArticle from './layout/new-article/NewArticle';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
//import Login from './layout/login/Login';
import RouterManager from './layout/router-manager/RouterManager';

function App() {
  return (
    <div className="App">
      <Provider store={getReduxStore()}>
        <ReactReduxFirebaseProvider {...getRrfProp()}>
          <Router>
            <RouterManager/>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </div>
  );
}

export default App;
