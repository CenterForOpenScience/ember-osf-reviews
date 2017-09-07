import Ember from 'ember';
import SetupController from 'reviews/controllers/preprints/provider/setup';


export default SetupController.extend({
    providerSettings: Ember.computed('model', 'reviewsCommentsPrivate', function() {
        let res = this._super();
        res.forEach(setting => (setting.disabled = true));
        // Don't show anon comments settings if comments are private
        if (this.get('model.reviewsCommentsPrivate')) {
            res.slice(1, 2);
        }
        return res;
    }),
    // Null out actions, just in case.
    actions: {
        submit() {}
    },
});
