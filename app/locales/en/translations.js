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
    moderation_base: {
        moderation_tab: `Moderation`,
        settings_tab: `Settings`
    },
    error_page: {
        title: `Page not found`,
        details: `The page you were looking for is not found on the OSF Reviews service.`,
        report: `If this should not have occurred and the issue persists, please report it to`,
        go_to: `Go to OSF Reviews`
    },
    setup: {
        start: `Start Moderating`,
        which: `Which provider would you like to set up?`,
        mulitple_providers: `You're an Admin for Multiple Providers`,
        choose_settings: `Choose moderation settings for {{provider}}`,
        once_finalized: `Once finalized, moderation settings can only be changed by an OSF administrator.`,
        finalize: `Finalize Settings`,
        settings: {
            reviewsWorkflow: {
                title: `Moderation Type`,
                description: ``,
                options: {
                    'pre-moderation': {
                        title: `Pre-moderation`,
                        description: `All preprints are placed in a queue for a moderator to accept or reject. Preprints are displayed publicly only after approval.`,
                    },
                    'post-moderation': {
                        title: `Post-moderation`,
                        description: `All preprints are displayed publicly immediately upon submission. Preprints also appear in a queue for a moderator to accept or reject. If rejected, the preprint is no longer displayed publicly.`,
                    },
                },
            },
            reviewsCommentsPrivate: {
                title: `Comment Visibility`,
                description: `Moderators can add comments when making a decision about a submission.`,
                options: {
                    true: {
                        title: `Moderators`,
                        description: `Comments will be visible to {{provider}} moderators NOT contributors on the submission.`,
                    },
                    false: {
                        title: `Moderators and Contributors`,
                        description: `Comments will be visible to {{provider}} moderators AND contributors on the submission.`,
                    },
                }
            },
            reviewsCommentsAnonymous: {
                title: `Moderator Comments`,
                description: `If moderator comments are visible to contributors, the moderator’s name can can be displayed or hidden from the contributors.`,
                options: {
                    true: {
                        title: `Anonymized Comments`,
                        description: `All comments will be visible to the contributors of the submission, but the moderators name will not be displayed.`,
                    },
                    false: {
                        title: `Named Comments`,
                        description: `All comments will be visible to the contributors of the submission and the moderator’s OSF profile name will be displayed.`,
                    },
                }
            }
        }
    }
};
