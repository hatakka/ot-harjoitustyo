import React from 'react'

const Header = ({name}) => {
    console.log(name)
    return(
        <>
        <h1>{name}</h1>
        </>
    );
}
  
const Content = ({parts}) => {
    console.log(parts);

    return(
      <>
       <ul>
        {parts.map(part =>
            <Part part={part} />
        )}
      </ul>
    </>
  )
}
 
const Part = ({part}) => {
    return(
      <>
        <br/>{part.name} {part.exercises}
      </>
    );
  }
  
const Total = (props) => {
    let total = 0
    props.parts.forEach(value => {
        total += value.exercises
    })
    return (
        <>
            <p>Number of exercises {total}</p>
        </>
    );
}

const Course = ({course}) => {
    console.log(course);
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts}/>
            <Total parts={course.parts} />
        </>
    );
}

  export default Course