import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
    session: service(),
    currentUser: service(),

    queryParams: ['page'],
    page: 1,

    showSetup: notEmpty('providersToSetup'),

    providersToSetup: computed('model.providers.[]', function() {
        return this.get('model.providers').filter(provider =>
            !provider.get('reviewsWorkflow') && provider.get('permissions').includes('set_up_moderation'));
    }),

    sidebarProviders: computed('model.providers.[]', function() {
        return this.get('model.providers').filter(provider =>
            provider.get('reviewsWorkflow') || provider.get('permissions').includes('set_up_moderation'));
    }),

    showDashboard: computed('model.providers.[]', function() {
        const providers = this.get('model.providers');
        return providers.any(p => p.get('reviewsWorkflow'));
    }),

    actions: {
        transitionToDetail(provider, reviewable) {
            this.transitionToRoute('preprints.provider.preprint-detail', provider.get('id'), reviewable.get('id'));
        },
        setupProvider(provider) {
            this.transitionToRoute('preprints.provider.setup', provider.id);
        },
        pageChanged() {
            this.incrementProperty('page');
        },
    },
});
