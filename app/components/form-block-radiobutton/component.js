import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['osf-box'],

    title: null,
    description: null,
    value: null,
    // Namespace for radiobuttons
    name: null,

    // Bound attribute
    attribute: null,

    checked: Ember.computed('attribute', 'value', function() {
        return this.get('value') == this.get('attribute') ? 'checked' : null;
    }),

    click(event) {
        this.set('attribute', this.get('value'));
        event.preventDefault();
        return false;
    }
});
