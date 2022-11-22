import { Link } from "react-router-dom";

const Exercises = ({ exercises }) => {
  const completed = exercises.all.filter((ex) =>
    exercises.completed.includes(ex.id)
  );
  const nonCompleted = exercises.all.filter(
    (ex) => !exercises.completed.includes(ex.id)
  );

  return (
    <div>
      <h1>Exercises</h1>
      <h2>Non-completed</h2>
      <ul>
        {nonCompleted.map((ex) => (
          <li key={ex.id}>
            <Link to={`/${ex.id}`}>{ex.name}</Link>
          </li>
        ))}
      </ul>
      {completed.length > 0 && (
        <div>
          <h2>Completed</h2>
          <ul>
            {completed.map((ex) => (
              <li key={ex.id}>
                <Link to={`/${ex.id}`}>{ex.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Exercises;
