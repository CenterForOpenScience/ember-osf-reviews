import Ember from 'ember';

/**
 * @module ember-osf-reviews
 * @submodule routes
 */

/**
 * @class Provider Route Handler
 */
export default Ember.Route.extend({
    theme: Ember.inject.service(),

    model(params) {
        return this.get('theme').loadProvider(params.provider_id).catch(() => {
            this.replaceWith('page-not-found')
        });
    },
    afterModel(model, transition) {
        if (!model.get('reviewsWorkflow') && transition.targetName !== 'provider.setup') return this.replaceWith('provider.setup', model);
    }
});
