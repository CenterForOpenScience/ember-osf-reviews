import Ember from 'ember';


export default Ember.Component.extend({
    tagName: 'button',
    attributeBindings: ['disabled'],
    classNames: ['btn', 'btn-success', 'btn-lg'],

    disabled: false,
    choiceRequired: false,

    providers: [],

    click() {
        if (this.get('providers.length') > 1) {
            this.set('choiceRequired', true);
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
            const id = Ember.$('input[type=radio][name=provider]:checked').val();
            // NOTE: == is used over === here on purpose. This is to cover the case that
            // provider.id happens to be an integer that is casted to a string.
            this.setupProvider(this.get('providers').find(provider => provider.id == id));
        },

        cancel() {
            this.set('disabled', false);
            this.set('choiceRequired', false);
        }
    }
});
