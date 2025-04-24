import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const isAuthencated = useSelector(state => state.user.isAuthencated);

  if (!isAuthencated) {
    return (<Navigate to={'/login'}></Navigate>)
  }
  return (
    <>
      {props.children}
    </>
  )
}

export default PrivateRoute;