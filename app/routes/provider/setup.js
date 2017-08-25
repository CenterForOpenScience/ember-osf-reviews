import Ember from 'ember';

export default Ember.Route.extend({
    afterModel(model/*, transition */) {
        if (model.get('reviewsWorkflow')) return this.replaceWith('provider', model);
    }
});
