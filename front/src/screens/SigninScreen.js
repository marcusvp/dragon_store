import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>sign in</h1>
        </div>
        <div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </div>
        <div>
          <label htmlFor="email">email address</label>
          <input
            type="email"
            id="email"
            placeholder="enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            placeholder="enter pasword"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            sign in
          </button>
        </div>
        <div>
          <label />
          <div>
            new user?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
