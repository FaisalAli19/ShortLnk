import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withTracker } from "meteor/react-meteor-data";
import FlipMove from 'react-flip-move';

import { Links } from "../../collections";
import LinkListItem from "./LinkListItem";

class LinkLists extends Component {
	renderLinkListsItems = () => {
		const { links, hide } = this.props;
		const filterLinks = hide ? links.filter(link => link.hide) : links.filter(link => !link.hide);

		if (filterLinks.length === 0) {
			return <div className="item">
				<p className="item__no-link">No Links Found</p>
        </div>;
    }
		
		return filterLinks.map(link => {
			return <LinkListItem key={link._id} shortUrl={Meteor.absoluteUrl(link._id)} {...link} />;
		});
	}
	render() {
		return (
			<div>
				<FlipMove maintainContainerHeight={true} >
					{this.renderLinkListsItems()}
				</FlipMove>
			</div>
		)
	}
}

const LinkContainer = withTracker(props => {
	const linkSub = Meteor.subscribe("userLinks", Meteor.userId());

	return {
		linkReady: linkSub.ready(),
		links: Links.find().fetch()
	};
})(LinkLists);

const mapStateToProps = ({ link: { hide } }) => ({ hide })

export default connect(mapStateToProps)(LinkContainer);
