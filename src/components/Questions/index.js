import React from 'react'
import { Link } from 'react-router-dom'

function renderAnswerStatusMark(state) {
  if (state == null) return null

  if (state) {
    return <span>○</span>
  }
  return <span>×</span>
}

export const Questions = ({ questions }) => (
  questions.map(({ id, text, answeredCorrect  }) => (
    <Link to={`/questions/${id}`} key={id} style={{ marginBottom: '15px' }}>
      <p>{ text } {renderAnswerStatusMark(answeredCorrect)}</p>
    </Link>
  ))
)
