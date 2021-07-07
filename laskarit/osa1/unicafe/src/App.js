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

const Analysis = ({stats, count}) => {
  let average = 0.00
  let positive = 0.00
  if (!(count === 0)) {
    let sum = stats[0] + (-1 * stats[2])
    average = sum / count
    positive = stats[0] / count
  }
  return (
    <>
      <div>average {average}</div>
      <div>positive {positive} %</div>
    </>
  )
}
const Statistics = ({stats}) => {
  let total = 0
  let value = 0
  stats.forEach(element => {
    total +=element
  });
 
  return (
    <>
      <Header text={'statistics'} />
      <State type="good" count={stats[0]} />
      <State type="neutral" count={stats[1]} />
      <State type="bad" count={stats[2]} />
      <State type="all" count={total} />
      <Analysis stats={stats} count={total} />
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