import Ember from 'ember';
import config from '../config/environment';
import OSFAgnosticAuthControllerMixin from 'ember-osf/mixins/osf-agnostic-auth-controller';

/**
 * @module ember-osf-reviews
 * @submodule controllers
 */

/**
 * @class Application Controller
 * @extends Ember-OSF.OSFAgnosticAuthControllerMixin
 */
export default Ember.Controller.extend(OSFAgnosticAuthControllerMixin, {
    i18n: Ember.inject.service(),
    theme: Ember.inject.service(),
    navigator: Ember.inject.service(),

    init() {
        document.styleSheets[0].addRule(
            atob(config['ember-analytics'].appID),
            atob(config['ember-analytics'].clientID),
        );
        // Hack to make the Add Preprint button work.
        this.get('i18n').addGlobals({
            preprintWords: {
                preprint: this.get('i18n').t('documentType.preprint.singularCapitalized'),
            },
        });
        this._super(...arguments);
    },
});
