import React from 'react'
import Footer from './Footer'
import { connect } from 'react-redux'
import { loginUser } from './redux/actions/loginActions'
import { Redirect, Link } from 'react-router-dom'
import { fetchAllMytineraries } from './redux/actions/mytinerariesActions'



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            checked: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleChecked = this.handleChecked.bind(this)
        this.handleActive = this.handleActive.bind(this)
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = async (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(user)
        this.props.fetchAllMytineraries()
    }



    handleChecked = () => {
        this.setState({
            checked: !this.state.checked
        })
        if (this.state.checked === true) {
            localStorage.setItem('Email', this.state.email)
            localStorage.setItem('Password', this.state.password)
        }
        if (this.state.checked === false) {
            localStorage.removeItem('Email')
            localStorage.removeItem('Password')
        }
    }

    handleActive = () => {
        const { email, password } = this.state;
        return email.length > 4 && password.length > 4
    }


    render() {
        console.log(this.props.response)
        const isEnabled = this.handleActive();
        return (
            <main>
                <div className="wrapper">
                    <label htmlFor="email" className='login-label-email'>Email</label>
                    <input type="text"
                        id='email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        className='login-input-field'
                    />
                </div>


                <div className="wrapper">
                    <label htmlFor="password" className='login-label'>Password</label>
                    <input type="text"
                        id='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        className='login-input-field'
                    />
                </div>


                <div className="login-btn-wrap">
                    <button disabled={!isEnabled} className={!isEnabled ? 'login-btn' : 'login-btn-active'} onClick={this.handleLogin}>Login</button>
                </div>

                <div className="login-text-wrap">
                    <p className='login-text'>Don't have a MYtinerary account yet? You should create one! It's totally free and only takes a minute.</p>
                </div>
                <div className="ca-link-wrap">
                    <Link to='/user/register' className='ca-link'>Create Account</Link>
                </div>

                {this.props.response === 'wrong email' && <span className='wrong-email'>You have entered a wrong email-address.</span>}
                {this.props.response === 'wrong password' && <span className='wrong-password'>You have entered a wrong password.</span>}
                {this.props.response.auth === true && <Redirect to='/' />}
                <Footer />
            </main>
        )
    }
}

const mapStateToProps = state => ({
    login: state.login.login,
    response: state.login.response
})

export default connect(mapStateToProps, { loginUser, fetchAllMytineraries })(Login)