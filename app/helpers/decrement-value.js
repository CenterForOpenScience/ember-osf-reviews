import Ember from 'ember';
/**
 * Decrement the first parameter by second parameter value.
 *
 * Sample usage:
 * ```handlebars
 * {{decrement-value 10 2}}
 * ```
 * This should return 8
 *
 * @class decrement-value
 * */
export function decrementValue(params/* , hash */) {
    return params[0] - params[1];
}

export default Ember.Helper.helper(decrementValue);
