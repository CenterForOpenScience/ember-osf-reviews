import Ember from 'ember';

const PROVIDER_SETTINGS = [{
    disabled: false,
    name: 'reviewsWorkflow',
    options: ['pre-moderation', 'post-moderation']
}, {
    disabled: false,
    name: 'reviewsCommentsPrivate',
    options: [true, false],
}, {
    disabled: true,
    name: 'reviewsCommentsAnonymous',
    options: [true, false],
}];


export default Ember.Controller.extend({
    i18n: Ember.inject.service(),
    toast: Ember.inject.service(),

    // Defaults
    reviewsWorkflow: 'pre-moderation',
    reviewsCommentsPrivate: true,
    reviewsCommentsAnonymous: true,

    _t(key, tpl={}) {
        return this.get('i18n').t(`setup.settings.${key}`, tpl);
    },

    _buildOption(setting, option) {
        return {
            value: option,
            title: this._t(`${setting.name}.options.${option}.title`),
            description: this._t(`${setting.name}.options.${option}.description`),
        };
    },

    _buildSetting(setting) {
        return {
            disabled: setting.disabled,
            attributeName: setting.name,
            title: this._t(`${setting.name}.title`),
            description: this._t(`${setting.name}.description`),
            options: setting.options.map(this._buildOption.bind(this, setting)),
        };
    },

    providerSettings: Ember.computed('model', function() {
        return PROVIDER_SETTINGS.map(this._buildSetting.bind(this));
    }),

    actions: {
        cancel() {
            this.transitionToRoute('index');
            return false;
        },
        submit() {
            PROVIDER_SETTINGS.forEach(setting => {
                this.set(`model.${setting.name}`, this.get(setting.name));
            });

            this.get('model').save().catch(() => {
                this.get('model').rollbackAttributes();

                this.get('toast').error(
                    this.get('i18n').t('setup.error.message').toString(),
                    this.get('i18n').t('setup.error.title').toString()
                );
            }).then(() => {
                return this.transitionToRoute('preprints.provider', this.get('model'));
            });
        }
    }
});
