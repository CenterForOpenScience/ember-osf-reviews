import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function() {
    this.route('preprints', function() {
        this.route('provider', {path: ':provider_id'}, function() {
            this.route('setup');
            this.route('moderation');
            this.route('settings');
            this.route('preprint_detail', {path:':preprint_id'}); // TODO replace with actual route when merging
        });
    });
    this.route('dashboard');
    this.route('page-not-found');
});

export default Router;
