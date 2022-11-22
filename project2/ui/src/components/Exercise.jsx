import { useState } from "react";
import submissionService from "../services/submissions";

const Exercise = ({ exercise }) => {
  const [solution, setSolution] = useState("");

  return (
    <div>
      <h2>{exercise.name}</h2>
      <p>{exercise.description}</p>
      Write your solution here:
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await submissionService.create({
            solution: solution,
            exercise_id: exercise.id,
          });
          setSolution("");
        }}
      >
        <textarea
          onChange={({ target }) => setSolution(target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Exercise;
