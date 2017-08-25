import Ember from 'ember';

const REVIEWS_PROVIDER_SETTINGS = [{
    disabled: false,
    name: 'reviewsWorkflow',
    options: ['pre-moderation', 'post-moderation']
}, {
    disabled: false,
    name: 'reviewsCommentsPrivate',
    options: [true, false],
}, {
    disabled: true,
    name: 'reviewsCommentsAnonymous',
    options: [true, false],
}];


export default Ember.Controller.extend({
    currentUser: Ember.inject.service(),
    session: Ember.inject.service(),
    toast: Ember.inject.service(),

    // Defaults
    reviewsWorkflow: 'pre-moderation',
    reviewsCommentsPrivate: true,
    reviewsCommentsAnonymous: true,

    settingsOptions: REVIEWS_PROVIDER_SETTINGS,

    actions: {
        cancel() {
            this.transitionToRoute('index');
            return false;
        },
        submit() {
            REVIEWS_PROVIDER_SETTINGS.forEach(setting => {
                this.set(`model.${setting.name}`, this.get(setting.name));
            });

            this.get('model').save().then(() => {
                return this.transitionToRoute('provider', this.get('model'));
            }).catch(() => {
                this.get('toast').error({
                    msg: `Unable to complete the setup of ${this.get('model.name')}, please try again later.`,
                    title: 'That\'s not supposed to happen...',
                })
            });
        }
    }
});
