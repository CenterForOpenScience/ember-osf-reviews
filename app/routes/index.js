import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),

    model() {
        if (!this.get('session.isAuthenticated')) return [];
        return this.get('store').query('preprint-provider', {
            'filter[reviews_workflow]': 'None',
            'filter[permissions]': 'set_up_moderation'
        });
    }
});
