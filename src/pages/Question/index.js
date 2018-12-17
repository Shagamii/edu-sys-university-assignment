import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'

import { Questions } from '../../components/Questions'

function renderAnswer(correct) {
  if (correct == null) return null

  const style = {
    fontSize: '40px',
  }

  if (correct) {
    return <div style={style}>正解やで</div>
  }
  return <div style={style}>不正解やな</div>
}

export class Question extends Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: [], 
      question: null,
      isLoading: true,
      selectedNum: 1,
      correct: null
    }
  }

  componentDidMount() {
    this.fetchQuestions()
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props
    if (prevProps.match.params.id !== id) {
      this.fetchQuestions()
    }
  }

  fetchQuestions = () => {
    const { user, match: { params: { id } } } = this.props
    firebase
      .database()
      .ref('questions/' + user.uid)
      .once('value')
      .then(result => {
        const questions = result.val() || []
        const question = questions.filter(q => q.id === parseInt(id))[0]
        if (result) {
          this.setState({
            question,
            questions,
            isLoading: false,
          })
        }
      })
  }

  onChangeSelectedNum = (selectedNum) => {
    this.setState({ selectedNum })
  }

  onSubmitAnswer = (e) => {
    e.preventDefault()
    const {
      question,
      selectedNum
    } = this.state
    const correct = question.answer === selectedNum
    const newQuestion = { ...question, answeredCorrect: correct }
    this.setState({
      question: newQuestion,
      correct,
    })

    const {
      user,
      match: {
        params: {
          id
        }
      }
    } = this.props
    const {
      questions,
    } = this.state
    const newQuestions = questions.filter(q => q.id !== parseInt(id))
    newQuestions.push(newQuestion)

    firebase
      .database()
      .ref("questions/" + user.uid)
      .set(newQuestions)

    this.setState({
      questions: newQuestions
    })
  }

  render() {
    const { questions, question, selectedNum, isLoading, correct } = this.state

    if (isLoading) return (<div>isLoading</div>)

    const {
      text,
      choices,
    } = question

    return (
      <div style={{ padding: '30px 10vw' }}>
        <h1>問題</h1>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <div>
              <p>{ text }</p>
            </div>
            <div>
              <form onSubmit={this.onSubmitAnswer} >
                {
                  Object.entries(choices).sort((a, b) => a[0] > b[0]).map(([num, choice]) => (
                    <div key={num}>
                      <input
                        type='radio'
                        onChange={() => this.onChangeSelectedNum(parseInt(num))}
                        checked={selectedNum === parseInt(num)}
                      />
                      {num} : {choice}
                    </div>
                  ))
                }
                <input type='submit' />
              </form>
            { renderAnswer(correct) }
            </div>
          </div>
          <div>
            <Questions
              questions={questions}
            />
          </div>
        </div>
        <Link to='/'>Homeへ</Link>
      </div>
    )
  }
}
