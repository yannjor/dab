const Exercise = ({ exercise }) => {
  return (
    <div>
      <h2>{exercise.name}</h2>
      <p>{exercise.description}</p>
      Write your solution here:
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log("hi");
        }}
      >
        <textarea></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Exercise;
