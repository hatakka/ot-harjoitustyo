import React, { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
}

const StatisticLine = ({type, value}) => {
  return (
    <tr>
      <td>{type}</td><td>{value}</td>
    </tr>
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
    positive = stats[0] / count * 100.00
  }
  return (
    <>
      <StatisticLine type="average" value={average} />
      <StatisticLine type="positive" value={positive + ' %'} />
    </>
  )
}
const Statistics = ({stats}) => {
  let total = 0
  stats.forEach(element => {
    total +=element
  });
 
  if (total === 0) {
    return (
      <>
       <Header text={'statistics'} />
       <div>No feedback given</div>
      </>
    )
  }

  return (
    <>
      <Header text={'statistics'} />
      <div>
        <table>
          <tbody>
            <StatisticLine type="good" value={stats[0]} />
            <StatisticLine type="neutral" value={stats[1]} />
            <StatisticLine type="bad" value={stats[2]} />
            <StatisticLine type="all" value={total} />
            <Analysis stats={stats} count={total} />
         </tbody>
        </table>
      </div>
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