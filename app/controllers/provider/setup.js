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
        tpl.provider = this.get('model.name');
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

            this.get('model').save().then(() => {
                return this.transitionToRoute('provider', this.get('model'));
            }).catch(() => {
                this.get('toast').error({
                    msg: `Unable to complete the setup of ${this.get('model.name')}, please try again later.`,
                    title: 'That\'s not supposed to happen...',
                })
            });
        }
    }
});
