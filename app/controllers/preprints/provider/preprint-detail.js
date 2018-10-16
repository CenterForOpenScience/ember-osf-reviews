import { computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import { task, waitForQueue } from 'ember-concurrency';
import $ from 'jquery';


const DATE_LABEL = {
    created: 'content.dateLabel.createdOn',
    submitted: 'content.dateLabel.submittedOn',
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
    i18n: service(),
    theme: service(),
    toast: service(),
    store: service(),

    queryParams: { chosenFile: 'file' },

    fullScreenMFR: false,
    savingAction: false,
    showLicense: false,

    _activeFile: null,
    chosenFile: null,

    userHasEnteredReview: false,
    showWarning: false,
    previousTransition: null,

    hasTags: bool('preprint.tags.length'),
    expandedAbstract: navigator.userAgent.includes('Prerender'),

    dummyMetaData: computed(function() {
        return new Array(7);
    }),

    // The currently selected file (defaults to primary)
    activeFile: computed('preprint', {
        get() {
            return this.getWithDefault('_activeFile', this.get('preprint.primaryFile'));
        },
        set(key, value) {
            return this.set('_activeFile', value);
        },
    }),

    fileDownloadURL: computed('model', function() {
        const { location: { origin } } = window;
        return [
            origin,
            this.get('theme.id') !== 'osf' ? `preprints/${this.get('theme.id')}` : null,
            this.get('model.preprintId'),
            'download',
        ].filter(part => !!part).join('/');
    }),

    actionDateLabel: computed('preprint.provider.reviewsWorkflow', function() {
        return this.get('preprint.provider.reviewsWorkflow') === PRE_MODERATION ?
            DATE_LABEL.submitted :
            DATE_LABEL.created;
    }),

    hasShortenedDescription: computed('preprint.description', function() {
        const preprintDescription = this.get('preprint.description');

        return preprintDescription && preprintDescription.length > 350;
    }),

    useShortenedDescription: computed('expandedAbstract', 'hasShortenedDescription', function() {
        return this.get('hasShortenedDescription') && !this.get('expandedAbstract');
    }),

    description: computed('preprint.description', function() {
        // Get a shortened version of the abstract, but doesn't cut in the middle of word by going
        // to the last space.
        return this.get('preprint.description')
            .slice(0, 350)
            .replace(/\s+\S*$/, '');
    }),
    supplementalMaterialDisplayLink: computed('preprint.node.links.html', function() {
        const supplementalLink = this.get('preprint.node.links.html');
        if (supplementalLink) {
            return supplementalLink.replace(/^https?:\/\//i, '');
        }
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
        leavePage() {
            const previousTransition = this.get('previousTransition');
            if (previousTransition) {
                this.set('userHasEnteredReview', false);
                this.set('showWarning', false);
                previousTransition.retry();
            }
        },
        submitDecision(trigger, comment, filter) {
            this.toggleProperty('savingAction');
            const action = this.store.createRecord('review-action', {
                actionTrigger: trigger,
                target: this.get('preprint'),
            });

            if (comment) {
                action.comment = comment;
            }

            this._saveAction(action, filter);
        },
    },

    _saveAction(action, filter) {
        return action.save()
            .then(this._toModerationList.bind(this, { status: filter, page: 1, sort: '-date_last_transitioned' }))
            .catch(this._notifySubmitFailure.bind(this))
            .finally(() => this.set('savingAction', false));
    },

    _toModerationList(queryParams) {
        this.set('userHasEnteredReview', false);
        this.transitionToRoute('preprints.provider.moderation', { queryParams });
    },

    _notifySubmitFailure() {
        this.get('toast').error(this.get('i18n').t('components.preprintStatusBanner.error'));
    },

    fetchData: task(function* (preprintId) {
        const response = yield this.get('store').findRecord(
            'preprint',
            preprintId,
            { include: ['node', 'license', 'review_actions', 'contributors'] },
        );

        this.set('preprint', response);
        this.set('authors', response.get('contributors'));
        this.get('loadMathJax').perform();

        // required for breadcrumbs
        this.set('model.breadcrumbTitle', response.get('title'));
    }),

    loadMathJax: task(function* () {
        if (!MathJax) return;
        yield waitForQueue('afterRender');
        yield MathJax.Hub.Queue(['Typeset', MathJax.Hub, [$('.abstract')[0], $('#preprintTitle')[0]]]);
    }),
});
