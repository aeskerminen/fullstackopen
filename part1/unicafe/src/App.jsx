import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.clickHandler}>{props.text}</button>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ goodNum, neutralNum, badNum }) => {
  const total = goodNum + neutralNum + badNum

  if (total !== 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <StatisticsLine text={"good"} value={goodNum}></StatisticsLine>
          <StatisticsLine text={"neutral"} value={neutralNum}></StatisticsLine>
          <StatisticsLine text={"bad"} value={badNum}></StatisticsLine>
          <StatisticsLine text={"total"} value={total}></StatisticsLine>
          <StatisticsLine text={"average"} value={(goodNum * 1 + neutralNum * 0 + -1 * badNum) / total}></StatisticsLine>
          <StatisticsLine text={"positive"} value={goodNum / total}></StatisticsLine>
        </table>

      </div>
    )
  } else {
    return (
      <div>
        <h1>No feedback given</h1>
      </div>
    )
  }
}

const Feedback = ({ goodHandler, neutralHandler, badHandler }) => {
  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button clickHandler={goodHandler} text='good'></Button>
        <Button clickHandler={neutralHandler} text='neutral'></Button>
        <Button clickHandler={badHandler} text='bad'></Button>
      </div>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback goodHandler={() => setGood(good + 1)} neutralHandler={() => setNeutral(neutral + 1)} badHandler={() => setBad(bad + 1)}></Feedback>
      <Statistics goodNum={good} neutralNum={neutral} badNum={bad}></Statistics>
    </div>
  )
}

export default App