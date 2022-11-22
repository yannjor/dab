import { Routes, Route, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import Exercise from "./components/Exercise";
import Exercises from "./components/Exercises";

import exerciseService from "./services/exercises";

const App = () => {
  const [exercises, setExercises] = useState({ all: [], completed: [] });

  useEffect(() => {
    if (!window.localStorage.getItem("exerciseUser")) {
      const userToken = nanoid(16);
      window.localStorage.setItem("exerciseUser", JSON.stringify(userToken));
    }
  }, []);

  useEffect(() => {
    exerciseService.getAll().then((exercises) => setExercises(exercises));
  }, []);

  const match = useMatch("/:id");
  const exercise = match
    ? exercises.all.find((ex) => ex.id === Number(match.params.id))
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
