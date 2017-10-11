import Ember from 'ember';

const MESSAGES = {
    'not-found': 'components.error-page.details.not_found',
    'not-authenticated': 'components.error-page.details.not_authenticated',
    forbidden: 'components.error-page.details.forbidden',
    'not-setup': 'components.error-page.details.not_setup',
};
const TITLES = {
    'not-found': 'components.error-page.title.not_found',
    'not-authenticated': 'components.error-page.title.not_authenticated',
    forbidden: 'components.error-page.title.forbidden',
    'not-setup': 'components.error-page.title.not_setup',
};


export default Ember.Component.extend({
    classNames: ['reviews-error-page', 'content'],
    supportEmail: 'support@osf.io',

    errorMessage: Ember.computed('error', function() {
        return MESSAGES[this.get('error')];
    }),

    title: Ember.computed('error', function() {
        return TITLES[this.get('error')];
    }),
});
