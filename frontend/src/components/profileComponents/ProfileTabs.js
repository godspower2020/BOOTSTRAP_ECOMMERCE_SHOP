import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from './../LoadingError/Toast';
import { toast } from "react-toastify";
import { updateUserProfile } from "../../redux/actions/userActions";

const ProfileTabs = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const toastId = React.useRef(null);

  const ToastObjects = {
    pauseOnFocusLoss : false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 3000,
  }

  const dispatch = useDispatch()

  const userProfileDetails = useSelector((state) => state.userProfileDetails)
  const {loading, error, user} = userProfileDetails;

  const userUpdateProfileDetails = useSelector((state) => state.userUpdateProfileDetails)
  const {loading: updateLoading} = userUpdateProfileDetails;

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [dispatch, user])

  const submitHandler = (e) => {
    e.preventDefault();
    // password match
    if(password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("password does not match", ToastObjects)
      }
    } else {
      // update profile
      dispatch(updateUserProfile({id: user._id, name, email, password}));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("profile updated successfully", ToastObjects)
      }
    }
  }

  return (
    <>
      <Toast />
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        {updateLoading && <Loading />}
      <form className="row  form-container"
      onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">UserName</label>
            <input className="form-control" type="text" required 
             value={name} 
             onChange={(e) => setName(e.target.value)}/>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail Address</label>
            <input className="form-control" type="email" required
             value={email} 
             onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">New Password</label>
            <input className="form-control" type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirm new Password</label>
            <input className="form-control" type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
