import { Link } from "react-router-dom";
import { useState } from "react";

const Messages = ({ messages, setMessages }) => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <Link to={`/${msg.id}`}>{msg.text}</Link>
          </li>
        ))}
      </ul>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          console.log("hi");
          const newMessage = { text: message };
          setMessages(messages.concat(newMessage));
        }}
      >
        <textarea
          onChange={({ target }) => setMessage(target.value)}
          value={message}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Messages;
