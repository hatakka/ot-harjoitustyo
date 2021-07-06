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
      <Part part={props.p1}/>
      <Part part={props.p2}/>
      <Part part={props.p3}/>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header course={course} />
      <Content p1={part1} p2={part2} p3={part3} />
      <Total count={part1.exercises+part2.exercises+part3.exercises} />
    </div>
  );
}

export default App;