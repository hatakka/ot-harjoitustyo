import React from 'react'

const Header = ({name}) => {
    console.log(name)
    return(
        <>
        <h2>{name}</h2>
        </>
    );
}
  
const Content = ({parts}) => {
 
   return(
      <div>
        {parts.map(part =>
            <Part key={part.id} part={part} />
        )}
    </div>
  )
}
 
const Part = ({part}) => {
    return(
      <>
        <p>{part.name} {part.exercises}</p>
      </>
    );
  }
  
const Total = ({parts}) => {
    const totalCount = parts.reduce(
        (previousValue, currentValue)=>previousValue+currentValue.exercises, 0);

    console.log(totalCount);

    return (
        <>
            <strong>total of exercises {totalCount}</strong>
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