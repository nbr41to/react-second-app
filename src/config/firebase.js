// firebaseをimport
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  // 各人の認証情報を記述（firebaseからコピペ）
  apiKey: "AIzaSyABFUJab4y5PUhBkCkNOKwmCklnoYeSsp4",
  authDomain: "chatapp-nbp.firebaseapp.com",
  databaseURL: "https://chatapp-nbp.firebaseio.com",
  projectId: "chatapp-nbp",
  storageBucket: "chatapp-nbp.appspot.com",
  messagingSenderId: "907279149180",
  appId: "1:907279149180:web:008d247956b9e99fff81f9",
  measurementId: "G-NM2CEPP9R7"
};

// 上の認証情報をfirebaseに登録して
firebase.initializeApp(firebaseConfig);
// エクスポート
export default firebase;
