import Ember from 'ember';
import { loadRelation } from 'ember-osf/utils/load-relationship';

const ContributorListComponent = Ember.Component.extend({
    tagName: 'ul',
    node: null,
    contributors: Ember.computed('node', function() {
        return loadRelation(this.get('node'), 'contributors');
    }),
    bibliographicContributors: Ember.computed.filterBy('contributors', 'bibliographic', true),
});

ContributorListComponent.reopenClass({
    positionalParams: ['node'],
});

export default ContributorListComponent;
