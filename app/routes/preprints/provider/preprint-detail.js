import { isArray } from '@ember/array';
import $ from 'jquery';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ConfirmationMixin from 'ember-onbeforeunload/mixins/confirmation';

export default Route.extend(ConfirmationMixin, {
    theme: service(),
    currentUser: service(),

    model(params) {
        return this.store.findRecord(
            'preprint',
            params.preprint_id,
            { include: ['node', 'license', 'actions'] },
        );
    },

    afterModel(model) {
        return model.get('node').then(this._checkNodePublic.bind(this));
    },

    setupController() {
        scheduleOnce('afterRender', this, function() {
            if (!MathJax) return;
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, [$('.abstract')[0], $('#preprintTitle')[0]]]);
        });

        return this._super(...arguments);
    },

    renderTemplate(controller, model) {
        // We're a special page.
        // Render into the applications outlet rather than the `provider` outlet.
        this.render(this.routeName, {
            controller,
            into: 'application',
            model,
        });
    },

    actions: {
        error(error) {
            if (error && error.errors && isArray(error.errors)) {
                return this.intermediateTransitionTo('page-not-found');
            }
        },
        willTransition(transition) {
            if (this.controller.get('userHasEnteredReview')) {
                this.controller.set('showWarning', true);
                this.controller.set('previousTransition', transition);
                transition.abort();
            }
        },
    },

    isPageDirty() {
        // If true, shows a confirmation message when leaving the page
        // True if the reviewer has any unsaved changes including comment edit or state change.
        return this.controller.get('userHasEnteredReview');
    },

    _checkNodePublic(node) {
        if (!node.get('public')) {
            this.transitionTo('page-not-found');
        }
    },
});
