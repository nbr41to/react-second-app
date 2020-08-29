import React, { useState, useContext } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";
import { Redirect, Link } from "react-router-dom";
import shortid from "shortid"

const Login = ({ history }) => {
  // Stateを準備しますー
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ログインボタン押したときの関数
  const user = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/"); // "/"に遷移
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const guestLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword("guest@guest.com", "a12345")
      .then(() => {
        firebase.auth().currentUser.updateProfile({ displayName: "guest_" + shortid.generate() })
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // ログイン済みの場合はリダイレクト
  if (user) {
    return <Redirect to={"/"} />;
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="email"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={guestLogin}>Guestでログイン</button>
      <br />
      <Link to="/signup">サインアップ</Link>
    </>
  );
};

export default Login;
