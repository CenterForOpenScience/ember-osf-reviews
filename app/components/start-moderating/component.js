import Ember from 'ember';


export default Ember.Component.extend({
    tagName: 'button',
    attributeBindings: ['disabled'],
    classNames: ['btn', 'btn-success', 'btn-lg'],

    disabled: false,
    choiceRequired: false,

    providers: [],
    selectedProvider: null,

    click() {
        if (this.get('providers.length') > 1) {
            this.set('choiceRequired', true);
            this.set('selectedProvider', this.get('providers.firstObject'));
            return;
        }
        this.setupProvider(this.get('providers.firstObject'));
    },

    setupProvider(provider) {
        this.set('disabled', true);
        this.get('action')(provider);
    },

    actions: {
        submit() {
            this.setupProvider(this.get('selectedProvider'));
        },

        cancel() {
            this.set('disabled', false);
            this.set('choiceRequired', false);
        }
    }
});
