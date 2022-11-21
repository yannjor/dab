import { Routes, Route, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";

import Exercise from "./components/Exercise";
import Exercises from "./components/Exercises";

import exerciseService from "./services/exercises";

const App = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    exerciseService.getAll().then((exercises) => setExercises(exercises));
  }, []);

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
