import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../actions/auth';

class Login extends Component {
  state = {
    error: ""
  };
  handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value.trim();
		const password = e.target.password.value.trim();
		
		if (!email && !password) {
			this.setState(() => ({ error: 'Email and password are required!' }))
		} else if (email && !password) {
			this.setState(() => ({ error: 'Password field cannot be blank' }))
		} else if (!email && password) {
			this.setState(() => ({ error: "Email field cannot be blank" }));
		} else {
			this.props.loginUser({ email, password });
			this.setState(() => ({ error: "" }));
		}
	};
	renderError() {
		const error = this.state.error || this.props.error;
		if (error) return <p>{error}</p>

		return false;
	}
  render() {
    return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Short Lnk</h1>
					{this.renderError()}
					<form onSubmit={this.handleLogin} className="boxed-view__form">
						<input type="email" name="email" placeholder="Email" />
						<input type="password" name="password" placeholder="Password" />
						<button className="button">Login</button>
					</form>
					<Link to="/signup">Create account</Link>
				</div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { error} }) => ({ error });

const mapDispatchToProps = dispatch => ({
	loginUser: (value) => dispatch(loginUser(value))
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);