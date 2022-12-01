import { Link } from "react-router-dom";
import { useState } from "react";
import messageService from "../services/messages";

const Messages = ({ messages, setMessages }) => {
  const [message, setMessage] = useState("");

  const sortedMessages = messages
    .sort((a, b) => a.posted - b.posted)
    .slice(0, 20);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {sortedMessages.map((msg) => (
          <li key={msg.id}>
            <Link to={`/${msg.id}`}>{msg.text}</Link>
            <span>(Posted: {new Date(msg.posted).toString()})</span>
          </li>
        ))}
      </ul>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const newMessage = await messageService.create({ text: message });
          setMessages([newMessage].concat(messages));
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
