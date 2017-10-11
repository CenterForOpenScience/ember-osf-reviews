import { computed } from '@ember/object';
import SetupController from 'reviews/controllers/preprints/provider/setup';


export default SetupController.extend({
    providerSettings: computed('model', 'reviewsCommentsPrivate', function() {
        const settings = this._super();
        for (const s of settings) {
            s.disabled = true;
        }
        // Don't show anon comments settings if comments are private
        if (this.get('model.reviewsCommentsPrivate')) {
            return settings.slice(0, 2);
        }
        return settings;
    }),
    // Null out actions, just in case.
    actions: {
        submit() {},
    },
});
