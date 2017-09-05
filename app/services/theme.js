import Ember from 'ember';
import config from 'ember-get-config';
import { pluralize } from 'ember-inflector';


export default Ember.Service.extend({
    i18n: Ember.inject.service(),
    store: Ember.inject.service(),

    provider: null,

    id: Ember.computed.alias('provider.id'),
    isLoaded: Ember.computed.empty('provider'),
    isProvider: Ember.computed.not('isNotProvider'),
    isNotProvider: Ember.computed.equal('provider.id', 'OSF'),

    signupUrl: Ember.computed('id', function() {
        const query = Ember.$.param({
            campaign: `${this.get('id')}-reviews`,
            next: window.location.href
        });

        return `${config.OSF.url}register?${query}`;
    }),

    onProviderLoad: Ember.observer('provider', function() {
        const locale = Ember.getOwner(this).factoryFor(`locale:${this.get('i18n.locale')}/translations`).class;

        this.get('i18n').addGlobals({
            provider: {
                name: this.get('provider.name'),
                type: Ember.get(locale, `documentType.${this.get('provider.preprintWord')}`),
            }
        });
    }),

    loadProvider(id) {
        return this.get('store').findRecord('preprint-provider', id.toLowerCase()).then(provider => {
            this.set('provider', provider);
            return provider
        });
    },

});
