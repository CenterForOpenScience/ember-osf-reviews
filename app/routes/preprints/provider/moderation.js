import Ember from 'ember';
/**
 * @module ember-osf-reviews
 * @submodule routes
 */

/**
 * @class provider Route Handler
 */
export default Ember.Route.extend({
    theme: Ember.inject.service(),

    queryParams: {
        sort: { refreshModel: true },
        status: { refreshModel: true },
        page: { refreshModel: true }
    },

    model(params) {
        const provider = this.modelFor('preprints.provider');
        // Pass `true` to force reloading (added in cos-forks/ember-data-has-many-query)
        return provider.query('preprints', {
            'filter[reviews_state]': params.status,
            'meta[reviews_state_counts]': true,
            sort: params.sort,
            page: params.page
        }, true).then((results) => {
            return {
                submissions: results.toArray(),
                totalPages: results.get('meta.total'),
                statusCounts: results.get('meta.reviews_state_counts'),
            };
        });
    },

    setupController(controller, model) {
        this._super(controller, model);
        this.controllerFor('preprints.provider').set('pendingCount', model.statusCounts.pending);
    },

    actions: {
        loading(transition) {
            let controller = this.controllerFor('preprints.provider.moderation');
            controller.set('loading', true);
            transition.promise.finally(function() {
                controller.set('loading', false);
            });
        },
    }
});
