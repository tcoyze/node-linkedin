/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   2/6/14
 */


(function() {

    var _ = require('lodash');

    var People = function(Inherits, config) {
        this.config = config;

        Inherits(this);

        var short_fields = [
            'date-of-birth',
            'educations',
            'languages'
        ];

        var fields = [
            'id', 'first-name', 'last-name', 'maiden-name', 'distance',
            'formatted-name', 'headline', 'location', 'relation-to-viewer',
            'industry', 'current-share', 'num-connections', 'num-connections-capped',
            'summary', 'specialties', 'positions', 'public-profile-url','picture-url','picture-urls::(original)',
            'email-address', 'last-modified-timestamp', 'proposal-comments','associations', 'interests',
            'publications', 'patents', 'languages', 'skills', 'certifications',
            'educations', 'courses', 'volunteer', 'three-current-positions', 'three-past-positions', 'num-recommenders',
            'recommendations-received', 'mfeed-rss-url', 'following', 'job-bookmarks',
            'suggestions', 'date-of-birth', 'member-url-resources','related-profile-views', 'honors-awards',
            'phone-numbers', 'bound-account-types', 'im-accounts', 'main-address',
            'twitter-accounts', 'primary-twitter-account', 'connections', 'group-memberships',
            'network'
        ];

        this.me = function(_fields, cb) {
            if (_.isFunction(_fields)) {
                cb = _fields;
                _fields = fields;
            }
            this.createCall('GET', 'people/~:(' + _fields.join(',') + ")", cb)(this.config);
        };

        this.url = function(url, _fields, cb) {
            if (_.isFunction(_fields)) {
                cb = _fields;
                _fields = short_fields;
            }
            this.createCall('GET', 'people/url=' + encodeURIComponent(url) + ":("+ _fields.join(',') +")", cb)(this.config);
        };

        this.id = function(id, _fields, cb) {
            if (_.isFunction(_fields)) {
                cb = _fields;
                _fields = short_fields;
            }
            this.createCall('GET', 'people/id=' + id + ":("+ _fields.join(',') +")", cb)(this.config);
        };

        this.search = function(options, cb) {
            this.createCall('GET', 'people-search', options, cb)(this.config);
        };

        this.invite = function(options, cb) {
            this.createCall('POST', 'people/~/mailbox', {json: options}, cb)(this.config);
        };


// TylerMergge ADDED BELOW (EricMergge refined)

		//Following SUB endpoints
		this.following_get =  function(id, cb) {
				this.createCall('GET', 'people/' + id + '/following/companies', cb)(this.config);
			};
			
		this.following_create= function(id, cb) {
				this.createCall('POST', 'people/~/companies/' + id, cb)(this.config);
			};
			
		this.following_remove= function(id, cb) {
				this.createCall('DELETE', 'people/~/companies/id=' + id, cb)(this.config);
			};
		
		//Suggestions sub endpoints
		this.suggestions_companies = function(cb) {
				this.createCall('GET', 'people/~/suggestions/to-follow/companies', cb)(this.config);
			};

		this.suggestions_jobs= function(cb) {
				this.createCall('GET', 'people/~/suggestions/job-suggestions', cb)(this.config);
			};
		
		//jobBookmarks sub endpoints

		this.jobBookmarks_get =  function(ID, cb) {
				this.createCall('GET', 'people/' + ID + '/job-bookmarks', cb)(this.config);
			};
		this.jobBookmarks_create= function(ID, cb) {
				this.createCall('POST', 'people/~/job-bookmarks', 
					{json: {
							job: ID //{
									// values: [{ id: ID}]
									// }
						  }
					},
					cb)(this.config);
			};

		this.jobBookmarks_remove= function(ID, cb) {
				this.createCall('DELETE', 'people/~/job-bookmarks/' + ID, cb)(this.config);
		};
		
		this.shares = function(body, cb) {

			this.createCall('POST', 'people/~/shares', {_xml:body}, cb)(this.config);
		};
		
		//Networks sub endpoints
		this.network_feed = function(id, options, cb) {
				var url = 'people/';
				if( id == "~" )
					url += id + '/network/updates';
				else
					url += 'id=' + id + '/network/updates';

				this.createCall('GET', url, options, cb)(this.config);
			};

		this.network_stats= function(cb) {
				this.createCall('GET', 'people/~/network/network-stats', cb)(this.config);
			};

		this.network_getUpdate= function(key, cb) {
				this.createCall('GET', 'people/~/network/updates/key=' + key, cb)(this.config);
			};

		this.network_getUpdateComments = function(key, cb) {
				this.createCall('GET', 'people/~/network/updates/key=' + key + '/update-comments', cb)(this.config);
			};

		this.network_getUpdateLikes= function(key, cb) {
				this.createCall('GET', 'people/~/network/updates/key=' + key + '/likes', cb)(this.config);				
			};

		this.network_createComment= function( key, text, cb ) {
				this.createCall('POST', 'people/~/network/updates/key=' + key + '/update-comments', {_xml: {comment: text}}, cb)(this.config);
			};
		
		this.network_createLike= function( key, cb ) {
				this.createCall('PUT', 'people/~/network/updates/key=' + key + '/is-liked', {_xml: "<is-liked>true</is-liked>"}, cb)(this.config);			
			};

		this.network_removeLike= function( key, cb ) {
				this.createCall('PUT', 'people/~/network/updates/key=' + key + '/is-liked', {_xml: "<is-liked>false</is-liked>"}, cb)(this.config);				
			};			
		
        return this;

    }.bind(this);

    module.exports = People;

}).call(this);
