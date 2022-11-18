import { Link } from "react-router-dom";

const Exercises = ({ exercises }) => {
  return (
    <div>
      <h1>Exercises</h1>
      <ul>
        {exercises.map((ex) => (
          <li key={ex.id}>
            <Link to={`/${ex.id}`}>{ex.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exercises;
