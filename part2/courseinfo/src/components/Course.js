import React from 'react'

const HeaderCourse = (props) => <h1>{props.course}</h1>

const Part = (props) => <p>{props.name} {props.exer}</p>

const Content = ({parts}) => (
  parts.map(value => {
    return (
    <Part name = {value.name} exer = {value.exercises} key = {value.id} />
    )
  })
)

const Total = ({parts}) => {
  let total = parts.reduce((sum, part) => sum += part.exercises, 0)
  return (<p> Number of exercises {total} </p>)
}

const Course = ({course}) => {
  return (
    <div>
      <HeaderCourse course={course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

export default Course