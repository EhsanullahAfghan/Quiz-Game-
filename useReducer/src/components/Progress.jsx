const Progress = ({ index, numQuestions, question, points }) => {
  let GetTotal = 0;
  const TotalNum = question.map((point) => (GetTotal += point.points));

  return (
    <header className="progress">
      <progress id="react" value={points} max={GetTotal}></progress>

      <p>
        Questions: {index + 1} / {numQuestions}
      </p>

      <p>
        {points}/{GetTotal}
      </p>
    </header>
  );
};

export default Progress;
