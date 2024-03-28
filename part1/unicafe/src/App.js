import { useState } from 'react'

const Button = (props) => <button onClick = {props.handleClick}>{props.text}</button>

const TableHead = (props) => {
  return (
    <thead>
    <tr>
      <th></th>
      <th>Good</th>
      <th>Neutral</th>
      <th>Bad</th>
      <th>Total</th>
    </tr>
  </thead>
  )
}

const StatisticsLine = ({value}) => <td>{value}</td>

const StatisticRaw = ({header, good, neutral, bad, total}) => {

  return (
    <tr>
    <th>{header}</th>
      <StatisticsLine value = {good}/>
      <StatisticsLine value = {neutral}/>
      <StatisticsLine value = {bad}/>
      <StatisticsLine value = {total}/>
    </tr>
  )
}

const Statistics = (props) => {

  let totalClick

  totalClick = props.good + props.bad + props.neutral
  
  if (totalClick === 0) {
    return <p>No feedback given</p>
  }

  let badScore
  let totalScore

  badScore = props.bad * -1
  totalScore = props.good + badScore

  let average
  average = (totalScore / totalClick).toFixed(2)

  let positive
  positive = (100 / totalClick * props.good).toFixed(2) + "%"

  return (
  <>
    <table>
      <TableHead />
      <tbody>
        <StatisticRaw header="Total" good={props.good} neutral={props.neutral} bad={props.bad} total={totalClick} />
        <StatisticRaw header="Score" good={props.good} neutral={0} bad={badScore} total={totalScore} />
      </tbody>
    </table>

    <p>The average is {average}</p>
    <p>There is {positive} of positive feedback</p>
  </>
  )
}

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give Feedback</h1>
      <Button handleClick = {() => setGood(prevGood => prevGood + 1)} text = "good"/>
      <Button handleClick = {() => setNeutral(prevNeutral => prevNeutral + 1)}text = "neutral"/>
      <Button handleClick = {() => setBad(prevBad => prevBad + 1)}text = "bad"/>
      
      
      <h1>Statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App;