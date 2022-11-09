const Exercise = ({ exercise }) => {
  return (
    <div>
      <h2>{exercise.question}</h2>
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
