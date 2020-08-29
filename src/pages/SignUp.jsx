import React from "react";
// 中括弧は必要だった
import { useState } from "react";
import firebase from "../config/firebase";
import { Link } from "react-router-dom";
import shortid from 'shortid';


const SignUp = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.updateProfile({ displayName: name })
          .then(() => {
            history.push("/");
            // console.log("サインアップ成功！")
            // console.log(firebase.auth().currentUser)
          })
      })
      // 失敗したら以下が発動する
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
        history.push("/"); // "/"に遷移
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">User Name</label>
          <input
            name="name"
            type="text"
            id="userName"
            placeholder="UserName"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={guestLogin}>Guestでログイン</button>
      <br />
      <Link to="/login">ログイン画面へ</Link>
    </div>
  );
};

export default SignUp;