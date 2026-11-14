const StartScreen = ({ Question_Length }) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{Question_Length} Question to test your React Mastery</h3>
      <button className="btn btn-ui">Let's Start</button>
    </div>
  );
};

export default StartScreen;
