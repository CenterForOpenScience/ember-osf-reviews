import Ember from 'ember';
import I18nService from 'ember-i18n/services/i18n';

export default I18nService.extend({
    globals: {},

    t(key, data = {}) {
        data = Ember.merge(data, this.get('globals'));
        return this._super(key, data);
    },

    addGlobal(key, value) {
        this.set(`globals.${key}`, value);
    },

    addGlobals(globals) {
        this.set('globals', Ember.merge(this.get('globals'), globals));
    },
});
