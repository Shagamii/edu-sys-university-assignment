import React, { Component } from 'react'
import firebase from 'firebase'
import { Questions } from '../../components/Questions'
import { Form } from '../../components/Form'

const initialState = () => ({
  text: '',
  choices: {
    1: '',
    2: '',
    3: '',
    4: '',
  },
  answer: 1,
  questions: [],
})

export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = initialState()
  }

  componentDidMount() {
    const { user } = this.props
    firebase
      .database()
      .ref('questions/' + user.uid)
      .once('value')
      .then(result => {
        const questions = result.val() || []
        if (result) {
          this.setState({
            questions
          })
        }
      })
  }

  onChangeText = ({ target: { value } }) => {
    this.setState({ text: value })
  }

  onChangeChoice = (idx, e) => {
    const { value } = e.target
    const { choices } = this.state
    const newChoices = { ...choices, [idx]: value }
    this.setState({ choices: newChoices })
  }

  onChangeAnswer = ({ target: { value } }) => {
    if (value < 1 || value > 4) return

    this.setState({ answer: value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {
      text,
      choices,
      answer,
      questions,
    } = this.state
    const {
      user
    } = this.props

    if (text.length === 0 || Object.values(choices).some(c => c.length === 0)) {
      return
    }

    const id = parseInt(Math.random() * 1000000)
    const question = [{
      id,
      text,
      choices,
      answer,
      answeredCorrect: null
    }]
    const newQuestions = questions != null ? questions.concat(question) : question
    const initial = initialState()
    this.setState({
      ...initial,
      questions: newQuestions,
    })

    firebase
      .database()
      .ref("questions/" + user.uid)
      .set(newQuestions)
  }

  render() {
    console.log(this.state)
    const {
      text,
      choices,
      answer,
      questions
    } = this.state
    const {
      onSubmit,
      onChangeAnswer,
      onChangeChoice,
      onChangeText
    } = this

    return (
      <div style={{ padding: '15px 10vw' }}>
        <h1>勉強するぞ！</h1>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <h2>問題作成</h2>
            <Form
              text={text}
              choices={choices}
              answer={answer}
              onSubmit={onSubmit}
              onChangeAnswer={onChangeAnswer}
              onChangeChoice={onChangeChoice}
              onChangeText={onChangeText}
            />
          </div>
          <div style={{ padding: '0 30px' }}>
            <h2>問題一覧</h2>
              <Questions
                questions={questions}
              />
          </div>
        </div>
      </div>
    )
  }
}