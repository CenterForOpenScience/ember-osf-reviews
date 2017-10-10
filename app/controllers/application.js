import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import OSFAgnosticAuthControllerMixin from 'ember-osf/mixins/osf-agnostic-auth-controller';

/**
 * @module ember-osf-reviews
 * @submodule controllers
 */

/**
 * @class Application Controller
 * @extends Ember-OSF.OSFAgnosticAuthControllerMixin
 */
export default Controller.extend(OSFAgnosticAuthControllerMixin, {
    i18n: service(),
    theme: service(),
    navigator: service(),

    init() {
        // Hack to make the Add Preprint button work.
        this.get('i18n').addGlobals({
            preprintWords: {
                preprint: this.get('i18n').t('documentType.preprint.singularCapitalized'),
            },
        });
        this._super(...arguments);
    },
});
