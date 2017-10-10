import Route from '@ember/routing/route';
import ResetScrollMixin from 'reviews/mixins/reset-scroll';
import { module, test } from 'qunit';

module('Unit | Mixin | reset scroll');

test('it works', function(assert) {
    const RouteObject = Route.extend(ResetScrollMixin);
    const TestedRoute = RouteObject.create();
    TestedRoute.set('scrollTarget', {
        scrollTo() {
            return [...arguments];
        },
    });
    assert.ok(TestedRoute);
    assert.ok(ResetScrollMixin.detect(TestedRoute));
    assert.deepEqual(TestedRoute.activate(), [0, 0]);
});
