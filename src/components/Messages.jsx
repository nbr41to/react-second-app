// Room.js
import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";
import "firebase/firestore";

const Messages = () => {
    const [messages, setMessages] = useState(null);
    useEffect(() => {
        firebase.firestore()
            .collection("messages")
            .onSnapshot((snapshot) => {
                // 取得します
                let getMessages = snapshot.docs.map((doc) => {
                    return doc.data();
                });
                // 並び替えます（timeで）
                getMessages = getMessages.sort((a, b) => {
                    if (a.time > b.time) {
                        return 1;
                    } else {
                        return -1;
                    }
                })
                // それを更新します
                setMessages(getMessages);
            });
    }, [messages]);
    // messagesが変更されたときだけ実行,[]なら,常に実行.

    return (
        <>
            <h2>MESSAGES!!</h2>
            {/* 条件付きレンダリング これはVueの方が優秀 */}
            {messages &&
                <>
                    {messages.map((message, index) => {
                        return (
                            <div key={index}>
                                <hr />
                                <p>name: {message.user} | {message.time}</p>
                                <p>message: {message.content}</p>
                            </div>
                        )
                    })}
                </>
            }
        </>
    );
};

export default Messages;