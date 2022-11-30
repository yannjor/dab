import { useState } from "react";

const Message = ({ message }) => {
  const [reply, setReply] = useState("");

  return (
    <div>
      <h2>{message.text}</h2>
      <ul>
        {message.replies((re) => (
          <li key={re.id}>{re.text}</li>
        ))}
      </ul>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          console.log("hi");
        }}
      >
        <textarea
          onChange={({ target }) => setReply(target.value)}
          value={reply}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Message;
