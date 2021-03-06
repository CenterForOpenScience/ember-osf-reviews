import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default Component.extend({
    store: service(),
    localClassNames: 'provider-links-component',

    tagName: 'li',

    init() {
        this._super(...arguments);
        this.iconMap = {
            preprint: 'fa-graduation-cap',
            paper: 'fa-file-text-o',
            thesis: 'fa-book',
            work: 'fa-file-text',
        };
        this.pendingCount = null;
        this.get('fetchData').perform();
    },

    fetchData: task(function* () {
        const results = yield this.get('store').findRecord('preprint-provider', this.get('provider.id'), {
            adapterOptions: {
                query: { related_counts: true },
            },
            reload: true,
        });
        this.set('pendingCount', results.get('reviewableStatusCounts.pending'));
    }),
});
