import SetupController from 'reviews/controllers/preprints/provider/setup';

export default SetupController.extend({
    _buildSetting(setting) {
        let res = this._super(setting);
        res.disabled = true;
        return setting;
    },
    // Null out actions, just in case.
    actions: {
        submit() {}
    },
});
