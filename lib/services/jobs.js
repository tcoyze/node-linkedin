/**
 * @author  MERGGE:::TYLER COYNER
 * @since   11/21/14
 */

(function() {
    var _ = require('lodash');

    var Jobs = function(Inherits, config) {

        this.config = config;

        Inherits(this);

        var fields = ['id','customer-job-code','active','posting-date','expiration-date','posting-timestamp,company:(id,name)','position:(title,location,job-functions,industries,job-type,experience-level)','skills-and-experience','description-snippet','description','salary','job-poster:(id,first-name,last-name,headline)','referral-bonus','site-job-url','location-description'];

        this.listing = function(id, cb) {
            this.createCall('GET', 'jobs/' + id + ":(" + fields.join(',') + ")", cb)(this.config);
        };
		
		this.search = function(options, cb) {
			var url = 'job-search';
			this.createCall('GET', url, options, cb)(this.config);
		};

        return this;
    }.bind(this);

    module.exports = Jobs;
}).call(this);