import Ember from 'ember';

/**
 * @module ember-osf-reviews
 * @submodule routes
 */

/**
 * @class Provider Route Handler
 */
export default Ember.Route.extend({
    model(params) {
        return this.store.findRecord('preprint-provider', params.provider_id.toLowerCase()).catch(() => {
            this.replaceWith('page-not-found');
        });
    },
    afterModel(model/*, transition */) {
        if (!model.get('reviewsWorkflow')) return this.transitionTo('provider.setup', model);
    }
});
