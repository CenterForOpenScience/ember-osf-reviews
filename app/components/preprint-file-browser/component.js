import Ember from 'ember';
import config from 'ember-get-config';
import {ArrayPromiseProxy, loadRelation} from 'ember-osf/utils/load-relationship';

function fileDownloadPath(file, node) {
    if (!file || !node) {
        return;
    }
    if (file.get('guid')) {
        return `${config.OSF.url}${file.get('guid')}/?action=download`;
    }
    return `${config.OSF.url}project/${node.get('id')}/files/osfstorage${file.get('path')}/?action=download`;
}

const PAGE_SIZE = 6;


export default Ember.Component.extend({
    pageNumber: 0,
    selectedFile: null,
    primaryFile: null,

    hasAdditionalFiles: Ember.computed.gt('files.length', 1),

    hasPrev: Ember.computed('pageNumber', function() {
        return this.get('pageNumber') > 0;
    }),

    hasNext: Ember.computed('pageNumber', function() {
        return (this.get('pageNumber') + 1) * PAGE_SIZE < this.get('files.length');
    }),

    fileIsPrimary: Ember.computed('selectedFile', 'primaryFile', function() {
        return this.get('selectedFile') === this.get('primaryFile');
    }),

    files: Ember.computed('preprint', function() {
        let promise = this.getWithDefault('preprint.node.files', new Ember.RSVP.Promise(() => null))
            .then(providers => providers.findBy('name', 'osfstorage'))
            .then(provider => loadRelation(provider, 'files'));
        return ArrayPromiseProxy.create({promise});
    }),

    page: Ember.computed('files.[]', 'pageNumber', function() {
        let offset = this.get('pageNumber') * PAGE_SIZE;
        return this.get('files').slice(offset, offset + PAGE_SIZE);
    }),

    didReceiveAttrs() {
        this.set('selectedFile', this.get('primaryFile'));
    },

    actions: {
        page(incr) {
            this.incrementProperty('pageNumber', incr);
        },
        selectFile(file) {
            this.set('selectedFile', file);
            if (this.attrs.selectFile) {
                this.sendAction('selectFile', file);
            }
        },
    },
});
