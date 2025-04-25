import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import i18n from "./ultis/i18n";

// Plugin CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-awesome-lightbox/build/style.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admin/Content/ManageUser";
import DashBoard from "./components/Admin/Content/DashBoard/DashBoard";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

// Toast
import { Bounce, ToastContainer } from "react-toastify";

// loading on top page
import 'nprogress/nprogress.css'
import { PersistGate } from "redux-persist/integration/react";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import NotFound from "./components/Home/NotFound";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import ManageQuestion from "./components/Admin/Content/Question/ManageQuestion";
import PrivateRoute from "./routes/PrivateRoute";

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
      {
        path: "users", element:
          <PrivateRoute>
            <ListQuiz />
          </PrivateRoute>
      },
    ],
  },
  { path: 'home', element: <Navigate to="/" replace /> },
  { path: 'quiz/:id', Component: DetailQuiz },
  {
    path: "/admin",
    element:
      <PrivateRoute>
        <Admin />
      </PrivateRoute>,
    children: [
      { index: true, Component: DashBoard },
      { path: 'manage-users', Component: ManageUser },
      { path: 'manage-quiz', Component: ManageQuiz },
      { path: 'manage-question', Component: ManageQuestion },
    ]
  },
  { path: '/login', Component: Login },
  { path: '/sign-up', Component: Signup },
  { path: '*', Component: NotFound },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense>
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
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
