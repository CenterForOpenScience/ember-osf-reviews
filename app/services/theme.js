import Ember from 'ember';
import config from 'ember-get-config';


export default Ember.Service.extend({
    i18n: Ember.inject.service(),
    store: Ember.inject.service(),

    provider: null,

    id: Ember.computed.alias('provider.id'),
    domain: Ember.computed.alias('provider.domain'),
    isLoaded: Ember.computed.empty('provider'),
    isProvider: Ember.computed.not('isNotProvider'),
    isNotProvider: Ember.computed.equal('provider.id', 'OSF'),

    signupUrl: Ember.computed('id', function() {
        const query = Ember.$.param({
            campaign: `${this.get('id')}-reviews`,
            next: window.location.href,
        });

        return `${config.OSF.url}register?${query}`;
    }),

    baseServiceUrl: Ember.computed('isProvider', 'domain', 'id', function() {
        let baseURL = '/';

        if (!this.get('domain')) {
            baseURL += 'preprints/';
            if (this.get('provider.id')) {
                baseURL += `${this.get('provider.id')}/`;
            }
        } else {
            baseURL = this.get('domain');
        }
        return baseURL;
    }),

    onProviderLoad: Ember.observer('provider', function() {
        const locale = Ember.getOwner(this).factoryFor(`locale:${this.get('i18n.locale')}/translations`).class;
        this.get('i18n').addGlobals({
            provider: {
                id: this.get('provider.id'),
                name: this.get('provider.name'),
                type: Ember.get(locale, `documentType.${this.get('provider.preprintWord')}`),
            },
        });
    }),

    loadProvider(id) {
        return this.get('store').findRecord('preprint-provider', id.toLowerCase(), { reload: true, backgroundReload: false, adapterOptions: { query: { related_counts: true } } }).then((provider) => {
            this.set('provider', provider);
            return provider;
        });
    },

});
