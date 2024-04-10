import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({ header, selected, votes }) => {
  return (
    <div>
      <h1>{header}</h1>
      <p>{selected}</p>
      <p>Votes: {votes}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initalArr = new Uint32Array(anecdotes.length)

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initalArr)

  console.log(points)

  return (
    <div>
      <Display header={"Anecdote of the day"} selected={anecdotes[selected]} votes={points[selected]}></Display>
      <div>
        <Button text={"next anecdote"} handleClick={() => setSelected(Math.floor(Math.random() * (anecdotes.length)))}></Button>
        <Button text={"vote"} handleClick={() => { const cp = [...points]; cp[selected] += 1; setPoints(cp) }}></Button>
      </div>
      <Display header={"Most voted for anecdote"} selected={anecdotes[points.indexOf(Math.max(...points))]} votes={Math.max(...points)}></Display>
    </div>
  )
}

export default App