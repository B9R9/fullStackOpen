import { useState, useEffect } from 'react'

function getRandomNumber (min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const DisplayAnecdote = ({text,vote}) => <p>{text} <br /> has {vote} vote</p>

const Button = ({handleClick,title}) => <button onClick = {handleClick}>{title}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const length = anecdotes.length

  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(Array.from({length: length}, (v, i) => 0))
  const [topRated, setTopRated] = useState(0)

  const addVoted = () => {
    setVoted(votedCopy => {
      const newVotes = [...votedCopy]
      newVotes[selected] += 1
      return newVotes 
    })
  }

  useEffect(() => {
    let topVotedIndex = voted.indexOf(Math.max(...voted))
    setTopRated(topVotedIndex)
  }, [voted])

  return (
    <div>
      <h1>Anectode of the day</h1>
      <DisplayAnecdote text={anecdotes[selected]} vote={voted[selected]}/>
      <Button handleClick = {addVoted} title="Vote"/>
      <Button handleClick = {() => setSelected(getRandomNumber(0, anecdotes.length - 1))} title="Next Anecdote"/>
      <h1>Anectode with most vote</h1>
      <DisplayAnecdote text={anecdotes[topRated]} vote={voted[topRated]}/>
    </div>
  )
}
export default App
