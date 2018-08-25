import React, { Component } from 'react';
import { connect } from 'react-redux'
import Clipboard from "clipboard";
import moment from 'moment';

import { toggleHideLink, removeLink } from '../actions/links';

class LinkListItem extends Component {
  state = { copyText: false };

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard
      .on("success", () => {
        this.setState(() => ({ copyText: true }));
        setTimeout(() => this.setState(() => ({ copyText: false })), 1000);
      })
      .on("error", () => {
        console.log("Unable to copy. Please manually copy link.");
      });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  handleHideUnHide = e => {
    const { _id, toggleHideLink } = this.props;
    toggleHideLink(_id);
  };
  handleRemoveItem = () => {
    const { _id, removeLink } = this.props;
    removeLink(_id);
  };
  renderFormatedVisitAndTime(){
		const { visited, lastVisitedAt } = this.props;
		const visitMsg = visited === 1 ? 'visit' : 'visits';
		let visitedMsg = typeof lastVisitedAt === 'number' ? `(visited ${moment(lastVisitedAt).fromNow()})` : false;

		return <p className="item__msg">{visited} {visitMsg} {visitedMsg}</p>;
	}
  render() {
    const { url, shortUrl, hide } = this.props;
    return (
			<div className="item">
        <h2>{url}</h2>
        <p className="item__msg">{shortUrl}</p>
        {this.renderFormatedVisitAndTime()}
        <a type="button" href={shortUrl} target="_blank" className="button button--link button--pill">
          Visit
        </a>
				<button ref="copy" data-clipboard-text={shortUrl} className="button button--pill">
          {this.state.copyText ? "Copied" : "Copy"}
        </button>
				<button onClick={this.handleHideUnHide} className="button button--pill">
          {hide ? "Unhide" : "Hide"}
        </button>
				<button onClick={this.handleRemoveItem} className="button button--pill">Remove</button>
      </div>
    );
  }
}

const mapStateToProps = ({ link: { hide } }) => ({ hide })

const mapDispatchToProps = dispatch => ({
	toggleHideLink: id => dispatch(toggleHideLink(id)),
	removeLink: id => dispatch(removeLink(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(LinkListItem);