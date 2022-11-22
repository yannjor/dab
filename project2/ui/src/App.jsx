import { Routes, Route, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import Exercise from "./components/Exercise";
import Exercises from "./components/Exercises";

import exerciseService from "./services/exercises";
import submissionService from "./services/submissions";

const App = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    exerciseService.getAll().then((exercises) => setExercises(exercises));
  }, []);

  useEffect(() => {
    let userToken = window.localStorage.getItem("exerciseUser");
    if (!userToken) {
      userToken = nanoid(16);
      window.localStorage.setItem("exerciseUser", JSON.stringify(userToken));
    }
    submissionService.setToken(userToken);
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
