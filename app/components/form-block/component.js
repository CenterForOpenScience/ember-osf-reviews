import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'section',
    classNameBindings: ['disabled'],

    title: null,
    disabled: false,
});
