import SimpleSchema from "simpl-schema";
import shortid from "shortid";

import { Links } from '../collections';

Meteor.methods({
  addLink(url) {
    if (!this.userId) {
      throw new Meteor.Error(400, "not authorized!");
    }

    new SimpleSchema({
      url: {
        type: String,
        label: "Your link",
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });

    return Links.insert({
      url,
      _id: shortid.generate(),
      creator: Meteor.userId(),
      createdAt: Date.now(),
      hide: false,
      visited: 0,
      lastVisitedAt: null
    });
  },
  removeLink(id) {
    return Links.remove({ _id: id });
  },
  toggleHideLink(id) {
    const link = Links.findOne(id);
    link["hide"] = !link.hide;

    Links.update(id, { $set: link });
  },
  updateLinkAnalytics(id){
		Links.update(id, { 
			$set: { lastVisitedAt: Date.now() },
			$inc: {
				visited: 1
			}
		})
	}
});

Meteor.publish("userLinks", id => {
  return Links.find({ creator: id });
});