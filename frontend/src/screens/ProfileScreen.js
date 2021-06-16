import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, editProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  USER_DETAILS_RESET,
  USER_EDIT_PROFILE_RESET,
} from "../constants/userConstants";

export default function ProfileScreen() {
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userEditProfile = useSelector((state) => state.userEditProfile);
  const {
    success: editSuccess,
    loading: editLoading,
    error: editError,
  } = userEditProfile;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
    } else {
      dispatch(editProfile(name, email, password));
    }
  };

  useEffect(() => {
    if (!user || user.email !== userInfo.email || user.name !== userInfo.name) {
      dispatch({ type: USER_EDIT_PROFILE_RESET });
      dispatch({ type: USER_DETAILS_RESET });
      dispatch(detailsUser(userInfo.id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo, user]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>user profile</h1>
        </div>
        <div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </div>
        <>
          {editLoading && <LoadingBox></LoadingBox>}
          {editError && <MessageBox variant="danger">{editError}</MessageBox>}
          {editSuccess && (
            <MessageBox variant="success">
              profile updated successfully
            </MessageBox>
          )}
          <div>
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              placeholder="enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email">email address</label>
            <input
              type="email"
              id="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              placeholder="enter pasword"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="confirmPassword">confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="confirm pasword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              update
            </button>
          </div>
        </>
      </form>
    </div>
  );
}
