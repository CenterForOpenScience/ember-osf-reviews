import Ember from 'ember';

const REVIEWS_PROVIDER_SETTINGS = [{
    disabled: false,
    name: 'reviewsWorkflow',
    title: 'Moderation Type',
    description: '',
    options: [{
        value: 'pre-moderation',
        title: 'Pre-moderation',
        description: 'All preprints are placed in a queue for a moderator to accept or reject. Preprints are displayed publicly only after approval.',
    }, {
        value: 'post-moderation',
        title: 'Post-moderation', 
        description: 'All preprints are displayed publicly immediately upon submission. Preprints also appear in a queue for a moderator to accept or reject. If rejected, the preprint is no longer displayed publicly.',
    }]
}, {
    disabled: false,
    name: 'reviewsCommentsPrivate',
    title: 'Comment Visibility',
    description: 'Moderators can add comments when making a decision about a submission.',
    options: [{
        value: true,
        title: 'Moderators',
        description: 'Comments will be visible to {{PROVIDER}} moderators NOT contributors on the submission.'
    }, {
        value: false,
        title: 'Moderators and Contributors',
        description: 'Comments will be visible to {{PROVIDER}} moderators AND contributors on the submission.',
    }]
}, {
    disabled: true,
    name: 'reviewsCommentsAnonymous',
    title: 'Moderator Comments',
    description: 'If moderator comments are visible to contributors, the moderator’s name can can be displayed or hidden from the contributors.',
    options: [{
        value: true,
        title: 'Anonymized comments',
        description: 'All comments will be visible to the contributors of the submission, but the moderators name will not be displayed.',
    }, {
        value: false,
        title: 'Named comments',
        description: 'All comments will be visible to the contributors of the submission and the moderator’s OSF profile name will be displayed.',
    }]
}];


export default Ember.Controller.extend({
    currentUser: Ember.inject.service(),
    session: Ember.inject.service(),
    toast: Ember.inject.service(),

    // Defaults
    reviewsWorkflow: 'pre-moderation',
    reviewsCommentsPrivate: true,
    reviewsCommentsAnonymous: true,

    settingsOptions: Ember.computed('model', function() {
        // TODO find a better way to do this
        Ember.set(REVIEWS_PROVIDER_SETTINGS[1]['options'][0], 'description', REVIEWS_PROVIDER_SETTINGS[1]['options'][0].description.replace('{{PROVIDER}}', this.get('model.name')));
        Ember.set(REVIEWS_PROVIDER_SETTINGS[1]['options'][1], 'description', REVIEWS_PROVIDER_SETTINGS[1]['options'][1].description.replace('{{PROVIDER}}', this.get('model.name')));
        return REVIEWS_PROVIDER_SETTINGS;
    }),

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
