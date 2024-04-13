import { useState } from 'react'
import viteLogo from '/vite.svg'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 20
      }
    ]
  }

  const Header = (props) => {
    return (
      <h1>{props.content}</h1>
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.content.name} {props.content.exercises}
      </p>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part content={props.content[0]}></Part>
        <Part content={props.content[1]}></Part>
        <Part content={props.content[2]}></Part>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <p>Number of exercises {props.content[0].exercises + props.content[1].exercises + props.content[2].exercises}</p>
    )
  }

  return (
    <div>
      <Header content={course.name}></Header>
      <Content content={course.parts}></Content>
      <Total content={course.parts}></Total>
    </div>
  )
}

export default App
