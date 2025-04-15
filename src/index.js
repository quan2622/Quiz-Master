import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";


// import { BrowserRouter } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     {/* <React.StrictMode> */}
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//     {/* </React.StrictMode> */}
//   </Provider>
// );


let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "users", Component: User },
      { path: "admin", Component: Admin },
    ],
  },
  { path: 'home', element: <Navigate to="/" replace /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
