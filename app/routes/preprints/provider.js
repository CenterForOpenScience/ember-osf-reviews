import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @module ember-osf-reviews
 * @submodule routes
 */

/**
 * @class Provider Route Handler
 */
export default Route.extend({
    theme: service(),

    model(params) {
        return this.get('theme').loadProvider(params.provider_id)
            .catch(() => this.replaceWith('page-not-found'));
    },

    afterModel(model, transition) {
        if (!model.get('permissions').includes('view_submissions')) {
            this.replaceWith('forbidden');
        } else if (!model.get('reviewsWorkflow') && transition.targetName !== 'preprints.provider.setup') {
            this.replaceWith('preprints.provider.setup', model);
        }
    },
});
