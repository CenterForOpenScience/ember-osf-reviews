import { filterBy } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { loadRelation } from 'ember-osf/utils/load-relationship';

const ContributorListComponent = Component.extend({
    tagName: 'ul',
    node: null,
    contributors: computed('node', function() {
        return loadRelation(this.get('node'), 'contributors');
    }),
    bibliographicContributors: filterBy('contributors', 'bibliographic', true),
});

ContributorListComponent.reopenClass({
    positionalParams: ['node'],
});

export default ContributorListComponent;
