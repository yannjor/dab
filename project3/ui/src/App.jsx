import { Routes, Route, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import Messages from "./components/Messages.jsx";
import Message from "./components/Message.jsx";

import messageService from "./services/messages";

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!window.localStorage.getItem("messageUser")) {
      const userToken = nanoid(16);
      window.localStorage.setItem("messageUser", JSON.stringify(userToken));
    }
  }, []);

  useEffect(() => {
    messageService.getAll().then((messages) => setMessages(messages));
  }, []);

  const match = useMatch("/:id");
  const message = match
    ? messages.find((message) => message.id === Number(match.params.id))
    : null;

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Messages messages={messages} setMessages={setMessages} />}
        />
        <Route path="/:id" element={<Message message={message} />} />
      </Routes>
    </div>
  );
};

export default App;
