import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from 'react-modal';

import { addLink, emptyError } from "../actions/links";

class AddLinkForm extends Component {
  state = {
    isOpen: false
  };
  handleOnSubmit = e => {
    e.preventDefault();
		this.props.addLink(e.target.link.value.trim());

		setTimeout(() => {
			if (!this.props.error) this.setState({ isOpen: false });
		}, 500);
  };
  renderError = () => {
    const error = this.props.error;
    return <p>{error}</p>;
  };
  handleAddLinkModal = (e) => {
		this.setState({ isOpen: !this.state.isOpen });
	}
	handleOnClose = () => {
		this.handleAddLinkModal()
		this.props.emptyError()
	}
  render() {
    return (
      <div>
        <button onClick={this.handleAddLinkModal} className="button">+ Add Link</button>
				<Modal 
					isOpen={this.state.isOpen} 
					contentLabel="Add link form"
					onAfterOpen={() => this.refs.url.focus()}
					onRequestClose={this.handleOnClose}
					className="boxed-view__box"
					overlayClassName="boxed-view boxed-view--modal"
				>
          <h1>Add link</h1>
					{this.renderError()}
					<form onSubmit={this.handleOnSubmit} className="boxed-view__form">
            <input type="text" name="link" ref="url" placeholder="URL" />
            <button className="button">Add Link</button>
						<button type="button" onClick={this.handleOnClose} className="button button--secondary">Close</button>
					</form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ link: { error } }) => ({ error })

const mapDispatchToProps = dispatch => ({
	addLink: link => dispatch(addLink(link)),
	emptyError: () => dispatch(emptyError())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLinkForm);