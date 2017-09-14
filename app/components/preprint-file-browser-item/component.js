import Ember from 'ember';


const PreprintFileBrowserItem = Ember.Component.extend({
    classNames: ['col-xs-2'],
    classNameBindings: ['isPrimary:primary', 'isSelected:selected'],

    file: null,
    selected: true,
    isPrimary: false,

    icon: Ember.computed('file', function() {
        return {
            file: 'fa-file-text',
            folder: 'fa-folder',
        }[this.get('file.kind')];
    }),

    click() {
        if (!this.attrs.selectFile) return;
        this.attrs.selectFile(this.get('file'));
    }
});

PreprintFileBrowserItem.reopenClass({
    positionalParams: ['file']
});

export default PreprintFileBrowserItem
