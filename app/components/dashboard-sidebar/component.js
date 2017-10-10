import Component from '@ember/component';

export default Component.extend({
    classNames: ['dashboard-sidebar'],

    iconMap: {
        preprint: 'fa-graduation-cap',
        paper: 'fa-file-text-o',
        thesis: 'fa-book',
    },
});
