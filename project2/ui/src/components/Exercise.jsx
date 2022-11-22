import { useState } from "react";
import submissionService from "../services/submissions";
import Notification from "./Notification";

const Exercise = ({ exercise }) => {
  const [code, setCode] = useState("");
  const [notification, setNotification] = useState(null);

  return (
    <div>
      {notification && (
        <Notification message={notification.text} error={notification.error} />
      )}
      <h2>{exercise.name}</h2>
      <p>{exercise.description}</p>
      Write your solution here:
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await submissionService.create({
            code: code,
            exercise_id: exercise.id,
          });
          setNotification({ text: response});
          setTimeout(() => setNotification(null), 5000);
          setCode("");
        }}
      >
        <textarea onChange={({ target }) => setCode(target.value)} value={code}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Exercise;
