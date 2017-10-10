import { computed } from '@ember/object';
import SetupController from 'reviews/controllers/preprints/provider/setup';


export default SetupController.extend({
    providerSettings: computed('model', 'reviewsCommentsPrivate', function() {
        const res = this._super();
        res.forEach(setting => (setting.disabled = true));
        // Don't show anon comments settings if comments are private
        if (this.get('model.reviewsCommentsPrivate')) {
            return res.slice(0, 2);
        }
        return res;
    }),
    // Null out actions, just in case.
    actions: {
        submit() {},
    },
});
