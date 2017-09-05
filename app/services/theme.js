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
        this.get('i18n').addGlobals({
            provider: {
                name: this.get('provider.name'),
                type: {
                    singular: this.get('provider.preprintWord'),
                    plural: pluralize(this.get('provider.preprintWord')),
                    singularCapitalized: this.get('provider.preprintWord').capitalize(),
                    pluralCapitalized: pluralize(this.get('provider.preprintWord')).capitalize(),
                }
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
