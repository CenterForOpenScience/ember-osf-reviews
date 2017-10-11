import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
    currentUser: service(),
    session: service(),
    store: service(),

    queryParams: {
        page: { refreshModel: true },
    },

    model(params) {
        if (!this.get('session.isAuthenticated')) {
            return this._emptyModels();
        }
        return hash({
            providers: this.get('store').query('preprint-provider', {
                'filter[permissions]': 'view_actions,set_up_moderation',
            }),
            actionsList: this.get('currentUser.user').then(this._getActions.bind(this, params.page)),
        }).catch(this._emptyModels.bind(this)); // On any error, assume no permissions to anything.
    },

    _getActions(page, user) {
        return user.query('actions', { page, include: 'target,provider' });
    },

    _emptyModels() {
        return {
            providers: [],
            actionsList: [],
        };
    },
});
