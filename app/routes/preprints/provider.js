import Ember from 'ember';
import Base from '../base'

/**
 * @module ember-osf-reviews
 * @submodule routes
 */

/**
 * @class Provider Route Handler
 */
export default Base.extend({
    theme: Ember.inject.service(),
    model(params) {
        return this.get('theme').loadProvider(params.provider_id).catch(() => {
            this.replaceWith('page-not-found')
        });
    },
    afterModel(model, transition) {
        if (!model.get('reviewsWorkflow') && transition.targetName !== 'preprints.provider.setup') return this.replaceWith('preprints.provider.setup', model);
    },
    actions: {
        didTransition() {
            // TODO: make this less hacky
            // force the provider to reload on page transitions so statusCounts update
            if (!this.controller.get('model.reviewableStatusCounts')) {
                this.refresh();
            }
        }
    }
});
