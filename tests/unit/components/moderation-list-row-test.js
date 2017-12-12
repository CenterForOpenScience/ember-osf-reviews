import { run } from '@ember/runloop';
import { moduleForComponent } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import { freezeDateAt, unfreezeDate } from 'ember-mockdate-shim';

moduleForComponent('moderation-list-row', 'Unit | Component | moderation list row', {

    unit: true,
    needs: [
        'model:action',
        'model:node',
        'model:user',
        'model:preprint',
        'model:preprint-provider',
        'service:i18n',
        'service:theme',
    ],
});

test('noActions computed property', function(assert) {
    this.inject.service('store');

    run(() => {
        const component = this.subject();
        assert.ok(component);
        const action1 = this.store.createRecord('action', {
            fromState: 'rejected',
            toState: 'accepted',
            dateModified: '2017-10-29T14:57:35.949534Z',
            creator: { fullName: 'Kung-fu Panda' },
            comment: 'test comment 1',
        });

        const action2 = this.store.createRecord('action', {
            fromState: 'pending',
            toState: 'rejected',
            dateModified: '2017-10-28T14:57:35.949534Z',
            creator: { fullName: 'Kung-fu Panda' },
            comment: 'test comment 2',
        });
        const actions = [action1, action2];
        const submission = this.store.createRecord('preprint', { actions });
        component.setProperties({ submission });
        assert.ok(!component.get('noActions'));
        component.set('submission.actions', []);
        assert.ok(component.get('noActions'));
    });
});

test('latestActionCreator computed property', function(assert) {
    this.inject.service('store');

    run(() => {
        const component = this.subject();
        assert.ok(component);
        const action1 = this.store.createRecord('action', {
            fromState: 'rejected',
            toState: 'accepted',
            dateModified: '2017-10-29T14:57:35.949534Z',
            creator: { fullName: 'Po' },
            comment: 'test comment 1',
        });

        const action2 = this.store.createRecord('action', {
            fromState: 'pending',
            toState: 'rejected',
            dateModified: '2017-10-28T14:57:35.949534Z',
            creator: { fullName: 'Kung-fu Panda' },
            comment: 'test comment 2',
        });
        const actions = [action1, action2];
        const submission = this.store.createRecord('preprint', { actions });
        component.setProperties({ submission });
        assert.strictEqual(component.get('latestAction'), action1);
        assert.strictEqual(component.get('latestActionCreator'), action1.creator.fullName);
    });
});

test('relevantDate computed property', function(assert) {
    this.inject.service('store');
    run(() => {
        freezeDateAt(new Date('2017-01-05T14:57:35.949534Z'));
        const component = this.subject();
        assert.ok(component);
        const submission = this.store.createRecord('preprint', { dateLastTransitioned: '2017-01-05T14:57:30.949534Z' });
        component.setProperties({ submission });
        assert.strictEqual(component.get('relevantDate'), 'a few seconds ago');
        component.set('submission.dateLastTransitioned', '2017-01-01T14:57:35.949534Z');
        assert.strictEqual(component.get('relevantDate'), 'January 01, 2017');
        component.set('submission.dateLastTransitioned', '2017-01-05T12:50:35.949534Z');
        assert.strictEqual(component.get('relevantDate'), '2 hours ago');
        component.set('submission.dateLastTransitioned', '2017-01-05T14:50:35.949534Z');
        assert.strictEqual(component.get('relevantDate'), '7 minutes ago');
        unfreezeDate();
    });
});
