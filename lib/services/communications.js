/**
 * @author  TYLER COYNER
 * @since   11/21/14
 */

(function() {
    var _ = require('lodash');

    var Communications = function(Inherits, config) {

        this.config = config;

        Inherits(this);

		this.mailbox = {
			sendMessage: function(body, cb) {
				this.createCall('POST', 'people/~/mailbox', {json: body}, cb)(this.config);
			}
		}
        return this;
    }.bind(this);

    module.exports = Communications;
}).call(this);
