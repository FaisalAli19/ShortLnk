import React from 'react';
import { connect } from 'react-redux';

import { toggleHide } from "../actions/links";
import AddLinkForm from "./AddLinkForm";

const LinkForm = ({ hide, toggleHide }) => {
	return (
		<div>
			<label className="checkbox">
				<input className="checkbox__box" type="checkbox" checked={hide} id="toggle-link" onChange={() => toggleHide()} />
				Show hidden links
			</label>
			<AddLinkForm />
		</div>
	)
};

const mapStateToProps = ({ link: { hide } }) => ({ hide })

const mapDispatchToProps = dispatch => ({
	toggleHide: () => dispatch(toggleHide())
})


export default connect(mapStateToProps, mapDispatchToProps)(LinkForm);