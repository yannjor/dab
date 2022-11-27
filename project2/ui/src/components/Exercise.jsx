import { useState } from "react";
import submissionService from "../services/submissions";
import Notification from "./Notification";

const Exercise = ({ exercise }) => {
  const [code, setCode] = useState("");
  const [notification, setNotification] = useState(null);

  const clearNotification = () => {
    setTimeout(() => setNotification(null), 5000);
  };

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
          const submissionId = await submissionService.create({
            code: code,
            exercise_id: exercise.id,
          });
          setNotification({ text: "You submission is being graded..." });
          clearNotification();
          setCode("");
          const checkStatus = setInterval(async () => {
            console.log("checking grading status");
            const status = await submissionService.getStatus(submissionId);
            console.log(status);
            if (status !== "GRADING") {
              setNotification({ text: status, error: status === "FAIL" });
              clearNotification();
              clearInterval(checkStatus);
            }
          }, 5000);
        }}
      >
        <textarea
          onChange={({ target }) => setCode(target.value)}
          value={code}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Exercise;
