import React from 'react';

const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
}

const Content = (props) => {
  console.log(props);
  return(
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </div>
  );
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.count}</p>
    </>
  );
}

const Part = (props) => {
  return(
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  );
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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
      exercises: 14
    }
  ]
  let total = 0
  parts.forEach(value => {
    total += value.exercises
  })
  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total count={total} />
    </div>
  );
}

export default App;