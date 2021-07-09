import React, { useState } from 'react'

const Button = (props) => {
  console.log(props)
  return (
    <>
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    </>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
    
  const [selected, setSelected] = useState(0)

  const [points, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const copy = { ...points }
  // kasvatetaan olion kentän 2 arvoa yhdellä
  copy[2] += 1   

  const seed = () => {
    return Math.floor(Math.random() * anecdotes.length);
  }

  const handleClick = () => {
     setSelected(seed)
  }

  const handleVote = (index) => {
    const copy = [...points]
// kasvatetaan taulukon paikan 2 arvoa yhdellä
    copy[index] += 1
    setVotes(copy)
 }

 return (
    <div>
      {anecdotes[selected]}
      <br/>
      has {points[selected]} votes
      <div>
        <Button handleClick={() => handleVote(selected)} text="vote" />
        <Button handleClick={() => handleClick()} text="next anecdote" />
     </div>
   </div>
  )
}

export default App
