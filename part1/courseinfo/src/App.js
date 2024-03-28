const HeaderCourse = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => <p>{props.name} {props.exer}</p>

const Content = ({parts}) => (
  parts.map(value => {
    return (
    <Part name = {value.name} exer = {value.exercises} key = {value.name} />
    )
  })
)

const Total = ({parts}) => {
  let total = 0
  parts.map(value => {total = total + value.exercises})
  return (<p> Number of exercises {total} </p>)
}


const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
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
    }

  return (
    <div>
      <HeaderCourse course={course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

export default App