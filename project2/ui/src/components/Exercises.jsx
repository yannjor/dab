import { Link } from "react-router-dom";

const Exercises = ({ exercises }) => {
  return (
    <div>
      <ul>
        {exercises.map((ex) => (
          <li key={ex.id}>
            <Link to={`/${ex.id}`}>{ex.question}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exercises;
