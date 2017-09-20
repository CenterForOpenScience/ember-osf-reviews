import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL,
    willTransition(oldInfos, newInfos) {
        const disableList = ['settings', 'moderation'];
        const prevRoute = oldInfos.length ? oldInfos[oldInfos.length - 1].name.split('.') : null;
        const prevName = prevRoute != null ? prevRoute[prevRoute.length - 1] : null;
        const currentRoute = newInfos.length ? newInfos[newInfos.length - 1].name.split('.') : null;
        const currentName = currentRoute != null ? currentRoute[currentRoute.length - 1] : null;
        const disableResetScroll = disableList.includes(prevName) && disableList.includes(currentName);
        if (!disableResetScroll) {
            this._super(...arguments);
            window.scrollTo(0, 0);
        }
    }
});

Router.map(function() {
    this.route('preprints', function() {
        this.route('provider', {path: ':provider_id'}, function() {
            this.route('setup');
            this.route('moderation', {path: '/'});
            this.route('settings');
            this.route('preprint-detail', {path:':preprint_id'});
        });
    });
    this.route('dashboard');
    this.route('page-not-found');
});

export default Router;
