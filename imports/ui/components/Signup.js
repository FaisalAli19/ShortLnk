import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { createUser } from '../actions/auth';

class Signup extends Component {
	state = {
		error: ''
	}
	onFormSubmit = (e) => {
		e.preventDefault();
		const email = e.target.email.value.trim();
		const password = e.target.password.value.trim();
		
		if(!email && !password){
			this.setState(() => ({ error: 'Email and password are required!' }))
		}else if (email && !password) {
			this.setState(() => ({ error: 'Password field cannot be blank' }))
		}else if (!email && password) {
			this.setState(() => ({ error: "Email field cannot be blank" }));
		}else if(email && password && password.length < 9) {
			this.setState(() => ({ error: "Password should be more than 8 character long" }));
		}else{
			this.props.createUser({ email, password });
			this.setState(() => ({ error: "" }));
		}
	}
	renderError(){
		const error = this.state.error || this.props.error;
		if(error) return <p>{error}</p>

		return false;
	}
	render() {
		return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Join Short Lnk</h1>
					{this.renderError()}
					<form onSubmit={this.onFormSubmit} noValidate className="boxed-view__form">
						<input type="email" name="email" placeholder="Email Id" />
						<input type="password" name="password" placeholder="Password" />
						<button className="button">Create Account</button>
					</form>
					<Link to="/">Have an account?</Link>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ auth: { error } }) => ({ error })

const mapDispatchToProps = dispatch => ({
	createUser: (value) => dispatch(createUser(value))
})


export default connect(mapStateToProps, mapDispatchToProps)(Signup);