import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../redux/actions/userActions";
import Header from "./../components/Header";
import Message from './../components/LoadingError/Error';
import Loading from './../components/LoadingError/Loading';
import { toast } from "react-toastify";
import Toast from "../components/LoadingError/Toast";

const Login = ({location, history}) => {
  window.scrollTo(0, 0);
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const toastId = React.useRef(null);

  const ToastObjects = {
    pauseOnFocusLoss : false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 3000,
  }

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1]:"/";

  const userLogin = useSelector((state) => state.userLogin)
  const {error, loading, userInfo} = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }
  return (
    <>
      <Header />
      <Toast />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form className="Login mt-3 col-md-8 col-lg-4 col-11" onSubmit={submitHandler}
        >
          <input type="email" placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p>
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Create Account</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
