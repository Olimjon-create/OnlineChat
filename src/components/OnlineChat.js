"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import styles from "../styles/OnlineChat.module.css";

const socket = io("http://localhost:3000");

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    socket.on("chat message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("chat message");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (msg.trim()) {
      socket.emit("chat message", msg);
      setMsg("");
    }
  };

  return (
    <div className={styles.chatContainer}>
      <header className={styles.chatHeader}>
        <div className={styles.name}>Name</div>
        <input
          style={{
            width: "500px",
            height: "40px",
            borderRadius: "10px",
            border: "none",
            paddingLeft: "20px",
          }}
          type="searchHere"
          placeholder="Search..."
        />
      </header>

      <main className={styles.chatMessages}>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            {message}
          </div>
        ))}
        console.log(message);
      </main>

      <form className={styles.chatForm} onSubmit={sendMessage}>
        <div className={styles.chatInputContainer}>
          <input
            type="text"
            placeholder="Xabar yozing..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            required
          />
          <button type="submit" className={styles.sendButton}>
            Send
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m0 0l-6-6m6 6l-6 6"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
