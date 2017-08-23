import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        setupProvider(provider) {
            this.transitionToRoute('setup', provider.id);
        }
    }
});
