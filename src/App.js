import React, { Component } from 'react';
import firebase from 'firebase'
import firebaseApp from './firebase'
import { Routes } from './routes'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        this.setState({ user })
      })
  }

  logIn() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebaseApp
      .auth()
      .signInWithRedirect(provider)
  }

  logOut = () => {
    firebase
      .auth()
      .signOut()

    this.setState({
      user: null
    })
  }

  render() {
    const { user } = this.state
    if (!user) {
      return (
        <div>
          <button onClick={this.logIn}>
            Googleアカウントでログイン
          </button>
        </div>
      )
    }

    return (
      <div>
        <button onClick={this.logOut} style={{ postion: 'absolute', top: 0 }}>ログアウトする</button>
        <Routes
          user={user}
        />
      </div>
    );
  }
}

export default App
