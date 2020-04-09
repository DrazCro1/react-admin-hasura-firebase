import React from "react";
import { fetchUtils, Admin, Resource } from "react-admin";
import { TodoCreate, TodoEdit, TodoList } from "./todos";
import { UserList, UserShow } from "./users";
import hasuraDataProvider from "ra-data-hasura";
//import PostIcon from '@material-ui/icons/Book';
//import UserIcon from '@material-ui/icons/Group';
import { FirebaseAuthProvider } from "react-admin-firebase";
import CustomLoginPage from "./CustomLoginPage";

// Define Firebase auth provider
var firebaseConfig = {
  apiKey: "AIzaSyDqawfNnQJZnYe5gT6avbh0dMDd8bSZUYg",
  authDomain: "nocodetests.firebaseapp.com",
  databaseURL: "https://nocodetests.firebaseio.com",
  projectId: "nocodetests",
  storageBucket: "nocodetests.appspot.com",
  messagingSenderId: "238378227919",
  appId: "1:238378227919:web:9362ba62d0fb629959ffba",
  measurementId: "G-2GZ2ZKN4HC"
};

const firebaseOptions = {
  // Enable logging of react-admin-firebase
  logging: true,
  // Authentication persistence, defaults to 'session', options are 'session' | 'local' | 'none'
  persistence: "local"
};

// This defines the AuthProvider first
const fbAuthProvider = FirebaseAuthProvider(firebaseConfig, firebaseOptions);

// Create a client for Hasura with the right headers
const httpClient = (url, options = {}) => {
  return fbAuthProvider.getJWTToken().then(function (JWT){
      if (!options.headers) {
          options.headers = new Headers({ Accept: 'application/json' });
      }
      // add your own headers here
      options.headers.set('Authorization', `Bearer ${JWT}`);
      return fetchUtils.fetchJson(url, options);
    });
    };

// Define the dataprovider
const dataProvider = hasuraDataProvider('http://localhost:8081', httpClient);

// Define main App
const App = () => {
  return (
    <Admin
      loginPage={CustomLoginPage}
      dataProvider={dataProvider}
      authProvider={fbAuthProvider}
    >
      <Resource
        name="todos"
        list={TodoList}
        edit={TodoEdit}
        create={TodoCreate}
      />
      <Resource name="users" list={UserList} show={UserShow} />
    </Admin>
  );
};

export default App;
