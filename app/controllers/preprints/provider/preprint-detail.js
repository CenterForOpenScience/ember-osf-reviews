import { computed } from '@ember/object';
import { alias, bool } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import permissions from 'ember-osf/const/permissions';


const DATE_LABEL = {
    created: 'content.date_label.created_on',
    submitted: 'content.date_label.submitted_on',
};
const PRE_MODERATION = 'pre-moderation';

/**
 * @module ember-osf-reviews
 * @submodule controllers
 */

/**
 * @class Moderation Detail Controller
 */
export default Controller.extend({
    currentUser: service(),
    i18n: service(),
    theme: service(),
    toast: service(),

    node: alias('model.node'),

    fullScreenMFR: false,
    savingAction: false,
    showLicense: false,

    _activeFile: null,
    chosenFile: null,

    queryParams: { chosenFile: 'file' },

    hasTags: bool('node.tags.length'),
    expandedAbstract: navigator.userAgent.includes('Prerender'),

    // The currently selected file (defaults to primary)
    activeFile: computed('model', {
        get() {
            return this.getWithDefault('_activeFile', this.get('model.primaryFile'));
        },
        set(key, value) {
            return this.set('_activeFile', value);
        },
    }),

    fileDownloadURL: computed('model', function() {
        const { location: { origin } } = window;
        return [
            origin,
            this.get('theme.isSubRoute') ? `preprints/${this.get('theme.id')}` : null,
            this.get('model.id'),
            'download',
        ].filter(part => !!part).join('/');
    }),

    actionDateLabel: computed('model.provider.reviewsWorkflow', function() {
        return this.get('model.provider.reviewsWorkflow') === PRE_MODERATION ?
            DATE_LABEL.submitted :
            DATE_LABEL.created;
    }),

    isAdmin: computed('node', function() {
        // True if the current user has admin permissions for the node that contains the preprint
        return (this.get('node.currentUserPermissions') || []).includes(permissions.ADMIN);
    }),

    hasShortenedDescription: computed('node.description', function() {
        const nodeDescription = this.get('node.description');

        return nodeDescription && nodeDescription.length > 350;
    }),

    useShortenedDescription: computed('expandedAbstract', 'hasShortenedDescription', function() {
        return this.get('hasShortenedDescription') && !this.get('expandedAbstract');
    }),

    description: computed('node.description', function() {
        // Get a shortened version of the abstract, but doesn't cut in the middle of word by going
        // to the last space.
        return this.get('node.description')
            .slice(0, 350)
            .replace(/\s+\S*$/, '');
    }),

    actions: {
        toggleShowLicense() {
            this.toggleProperty('showLicense');
        },
        expandMFR() {
            this.toggleProperty('fullScreenMFR');
        },
        expandAbstract() {
            this.toggleProperty('expandedAbstract');
        },
        chooseFile(fileItem) {
            this.setProperties({
                chosenFile: fileItem.get('id'),
                activeFile: fileItem,
            });
        },
        submitDecision(trigger, comment, filter) {
            this.toggleProperty('savingAction');

            const action = this.store.createRecord('action', {
                actionTrigger: trigger,
                target: this.get('model'),
            });

            if (comment) {
                action.comment = comment;
            }

            return action.save()
                .then(() => {
                    this.toggleProperty('savingAction');
                    this.transitionToRoute('preprints.provider.moderation', {
                        queryParams: { status: filter, page: 1, sort: '-date_last_transitioned' },
                    });
                })
                .catch(() => {
                    this.toggleProperty('savingAction');
                    return this.get('toast')
                        .error(this.get('i18n').t('components.preprint-status-banner.error'));
                });
        },
    },
});
