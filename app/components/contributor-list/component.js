import { filterBy } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
    tagName: 'ul',

    bibliographicContributors: filterBy('model.contributors', 'bibliographic', true),
});
