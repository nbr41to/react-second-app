// Room.js
import React, { useState, useContext } from "react";
import firebase from "../config/firebase";
import "firebase/firestore";
import { AuthContext } from "../AuthService";
import Messages from "../components/Messages"

const Room = () => {
  const [value, setValue] = useState('')


  const user = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const d = new Date(); // Today
    const DateTimeFormat = 'YYYY/MM/DD hh:mi:ss'; // "2019/10/04 12:34:56" 
    let time = DateTimeFormat
      .replace(/YYYY/g, String(d.getFullYear()))
      .replace(/MM/g, ('0' + (d.getMonth() + 1)).slice(-2))
      .replace(/DD/g, ('0' + d.getDate()).slice(-2))
      .replace(/hh/g, ('0' + d.getHours()).slice(-2))
      .replace(/mi/g, ('0' + d.getMinutes()).slice(-2))
      .replace(/ss/g, ('0' + d.getSeconds()).slice(-2));
    firebase.firestore().collection('messages').add({
      content: value,
      user: user.displayName,
      time: time
    })
      .catch((error) => { console.log(error) })
    // 入力ボックスを初期化
    setValue("");
  }
  // console.log(messages);
  return (
    <>
      <h1>ChatApp</h1>
      <Messages />
      <hr />
      <p>{user.displayName}でログインしています</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>
      <button onClick={() => firebase.auth().signOut()}>Logout</button>
    </>
  );
};

export default Room;