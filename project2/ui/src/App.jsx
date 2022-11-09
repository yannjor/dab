import { Routes, Route, useMatch } from "react-router-dom";

import Exercise from "./components/Exercise";
import Exercises from "./components/Exercises";

const App = () => {
  const exercises = [
    { id: 1, question: "What is 1+1?" },
    { id: 2, question: "What is the meaning of life?" },
  ];

  const match = useMatch("/:id");
  const exercise = match
    ? exercises.find((ex) => ex.id === Number(match.params.id))
    : null;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Exercises exercises={exercises} />} />
        <Route path="/:id" element={<Exercise exercise={exercise} />} />
      </Routes>
    </div>
  );
};

export default App;
