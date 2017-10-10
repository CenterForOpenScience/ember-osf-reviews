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
        const emptyModels = {
            providers: [],
            actionsList: [],
        };

        if (!this.get('session.isAuthenticated')) {
            return emptyModels;
        }
        return hash({
            providers: this.get('store').query('preprint-provider', {
                'filter[permissions]': 'view_actions,set_up_moderation',
            }),
            actionsList: this.get('currentUser.user').then((user) => {
                return user.query('actions', { page: params.page, include: 'target,provider' });
            }),
        }).catch(() => {
            return emptyModels;
        }); // On any error, assume no permissions to anything.
    },
});
