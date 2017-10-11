import { bind } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import ArrayProxy from '@ember/array/proxy';
import $ from 'jquery';
import { Promise as EmberPromise } from 'rsvp';
/**
 * @module ember-osf-reviews
 * @submodule routes
 */

/**
 * @class provider Route Handler
 */
export default Route.extend({
    theme: service(),
    store: service(),

    queryParams: {
        sort: { refreshModel: true },
        status: { refreshModel: true },
        page: { refreshModel: true },
    },

    model(params) {
        const provider = this.modelFor('preprints.provider');
        return this.query(provider, 'preprints', {
            'filter[reviews_state]': params.status,
            'meta[reviews_state_counts]': true,
            sort: params.sort,
            page: params.page,
        }).then(this._resolveModel.bind(this));
    },

    setupController(controller, model) {
        this._super(controller, model);
        this.controllerFor('preprints.provider').set('pendingCount', model.statusCounts.pending);
        controller.set('loading', false);
    },

    actions: {
        loading(transition) {
            const controller = this.controllerFor('preprints.provider.moderation');
            controller.set('loading', true);
            transition.promise.finally(function() {
                controller.set('loading', false);
            });
        },
    },

    _resolveModel(response) {
        return {
            submissions: response.toArray(),
            totalPages: Math.ceil(response.links.meta.total / response.links.meta.per_page),
            statusCounts: response.meta.reviews_state_counts,
        };
    },

    // TODO: add this to osf-model, remove ember-data-has-many-query dependency?
    query(model, propertyName, params) {
        const reference = model.hasMany(propertyName);
        const promise = new EmberPromise((resolve, reject) => {
            // HACK: ember-data discards/ignores the link if an object on the belongsTo side
            // came first. In that case, grab the link where we expect it from OSF's API
            const url = reference.link() || model.get(`links.relationships.${propertyName}.links.related.href`);
            if (url) {
                $.ajax(url, {
                    data: params,
                    xhrFields: {
                        withCredentials: true,
                    },
                }).catch(reject)
                    .then(bind(this, this._queryDone, resolve));
            } else {
                reject(`Could not find a link for '${propertyName}' relationship`);
            }
        });

        const ArrayPromiseProxy = ArrayProxy.extend(PromiseProxyMixin);
        return ArrayPromiseProxy.create({ promise });
    },

    _queryDone(resolve, payload) {
        const store = this.get('store');
        store.pushPayload(payload);
        const records = payload.data.map(datum => store.peekRecord(datum.type, datum.id));
        records.meta = payload.meta;
        records.links = payload.links;
        resolve(records);
    },

});
