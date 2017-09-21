import { moduleFor, test } from 'ember-qunit';

moduleFor('route:preprints/provider/moderation', 'Unit | Route | preprints/provider/moderation', {
    // Specify the other units that are required for this test.
    needs: [
        'service:theme',
    ],
});

test('it exists', function(assert) {
    const route = this.subject();
    assert.ok(route);
});
