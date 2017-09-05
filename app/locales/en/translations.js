const preprints = `{{preprintWords.Preprints}}`;
const brand = `OSF Preprints`;

export default {
    global: {
        cancel: `Cancel`,
        abstract: `Abstract`,
        doi: `DOI`,
        tags: `Tags`,
        preprints,
        brand,
        brand_name: 'OSF',
        provider_brand: `{{name}} {{preprintWords.Preprints}}`,
        title: `Title`,
        authors: `Authors`,
        license: 'License',
        pre_moderation: `pre-moderation`,
        post_moderation: `post-moderation`,
    },
    index: {
        feature: {
            title: `Moderate your collection`,
            description: `At last, the ability to manage what scholarly works are displayed with your branding. 
            No more working on off-topic papers confusing loyal researchers.`,
            list_1: `See all submissions in one place.`,
            list_2: `Provide feedback to authors.`,
            list_3: `Manage collections settings.`
        },
        workflow: {
            title: `Choose your workflow`,
            list_1: `Have greater control over what material is publicly available by choosing pre-moderation.`,
            list_2: `Keep the time delay between submission and public access minimal by choosing post-moderation.`,
            figure: {
                pre_moderation: `Pre-moderation`,
                post_moderation: `Post-moderation`
            }
        },
        contact: {
            title: `Want to start a moderated service?`,
            paragraph: `Create your own branded preprints servers backed by the OSF. Check out the open source code and the requirements and road map. Input welcome!`,
            contact_us: `Contact us`
        }
    },
    moderation_list: {
        newest: `Newest`,
        oldest: `Oldest`,
        pending: `Pending`,
        accepted: `Accepted`,
        rejected: `Rejected`,
        sort: `Sort`,
        record: {
            submitted_on: `submitted on`,
            by: `by`
        }
    },
    moderation_base: {
        moderation_tab: `Moderation`,
        settings_tab: `Settings`
    },
    error_page: {
        title: `Page not found`,
        details: `The page you were looking for is not found on the OSF Reviews service.`,
        report: `If this should not have occurred and the issue persists, please report it to`,
        go_to: `Go to OSF Reviews`
    }
};
