import { Routes, Route, useMatch } from "react-router-dom";

import Exercise from "./components/Exercise";
import Exercises from "./components/Exercises";

const App = () => {
  const exercises = [
    {
      id: 1,
      name: "Sum of three values",
      description:
        "Write a function int sum(int first, int second, int third) that returns the sum of the given integers. As an example, the function call sum(1, 2, 3) should return the value 6.",
    },
    {
      id: 2,
      name: "Sum with formula",
      description:
        "Write a function String sumWithFormula(int first, int second) that returns the written out sum of the given integers and the sum. As an example, the function call sumWithFormula(1, 2) should return the string 1+2=3 and the function call sumWithFormula(1, 1) should return the string 1+1=2. Note! Do not add spaces to the returned string.",
    },
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
