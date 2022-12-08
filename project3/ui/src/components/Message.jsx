import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import messageService from "../services/messages";

const Message = (props) => {
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);
  const [message, setMessage] = useState(props.message);
  const { id } = useParams();

  useEffect(() => {
    if (!message) {
      messageService.getById(id).then((m) => {
        setMessage(m);
        messageService.getReplies(m.id).then((res) => setReplies(res));
      });
    } else {
      messageService.getReplies(message.id).then((res) => setReplies(res));
    }
  }, [message, id]);

  return (
    <div>
      {message && (
        <div>
          <h2>{message.text}</h2>
          {replies.length > 0 && <h3>Replies</h3>}
          <ul>
            {replies.map((re) => (
              <li key={re.id}>{re.text}</li>
            ))}
          </ul>
          <h3>Add reply</h3>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const newReply = await messageService.createReply(message.id, {
                reply,
              });
              setReplies([newReply].concat(replies));
              setReply("");
            }}
          >
            <textarea
              onChange={({ target }) => setReply(target.value)}
              value={reply}
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Message;
