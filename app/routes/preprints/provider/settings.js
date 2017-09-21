import Base from '../../base';

export default Base.extend({
    model() {
        return this.modelFor('preprints.provider');
    },
});
