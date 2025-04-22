import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admin/Content/ManageUser";
import DashBoard from "./components/Admin/Content/DashBoard";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// loading on top page
import 'nprogress/nprogress.css'
import { PersistGate } from "redux-persist/integration/react";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import NotFound from "./components/Home/NotFound";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";

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
      { index: true, Component: HomePage },
      { path: "users", Component: ListQuiz },
    ],
  },
  { path: 'home', element: <Navigate to="/" replace /> },
  { path: 'quiz/:id', Component: DetailQuiz },
  {
    path: "/admin",
    Component: Admin,
    children: [
      { index: true, Component: DashBoard },
      { path: 'manage-users', Component: ManageUser },
      { path: 'manage-quiz', Component: ManageQuiz },
    ]
  },
  { path: '/login', Component: Login },
  { path: '/sign-up', Component: Signup },
  { path: '*', Component: NotFound },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={1800}
        limit={4}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
