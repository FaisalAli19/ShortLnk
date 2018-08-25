import { WebApp } from 'meteor/webapp';

import { Links } from '../imports/collections'

// Simpl Schema Error config file
import '../imports/startup/simple-schema-config';

// user config file
import '../imports/startup/users';

// link method and pub file
import '../imports/startup/links';


Meteor.startup(() => {
	WebApp.connectHandlers.use((req, res, next) => {
		const except = ["/links", '/', '/signup']
		const id = except.includes(req.url) ? "" : req.url.slice(1);

		if (id) {
			const link = Links.findOne(id)

			if (link) {
				// Set the status code
				res.statusCode = 302;
				// set header to the url
				res.setHeader('Location', link.url);
				// end the response
				res.end()
				// update link analytic data
				Meteor.call('updateLinkAnalytics', id)
			}else {
				next()
			}
		
		}else{
			next();
		}
	})
});