import React, { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
}

const State = ({type, count}) => {
  return (
    <div>{type} {count}</div>
  );
}

const Button = (props) => {
  console.log(props)
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  return (
    <>
      <Header text={'statistics'} />
      <State type="good" count={props.stats[0]} />
      <State type="neutral" count={props.stats[1]} />
      <State type="bad" count={props.stats[2]} />
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  return (
    <div>
      <Header text={'give feedback'} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics stats={[good, neutral, bad]} />
    </div>
  )
}

export default App