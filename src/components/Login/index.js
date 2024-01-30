// Write your JS code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: 'rahul', password: 'rahul@2021'}

  componentDidMount() {
    this.checkJwt()
  }

  onClickLogin = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response)
    const {history} = this.props
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 20})
      history.replace('/')
    }
  }

  checkJwt = () => {
    const {history} = this.props
    const jwToken = Cookies.get('jwt_token')
    if (jwToken !== undefined) {
      history.replace('/')
    }
  }

  render() {
    return (
      <div className="bg">
        <h1>Please Login</h1>
        <button onClick={this.onClickLogin} type="button">
          Login With Sample Creds
        </button>
      </div>
    )
  }
}

export default Login
