'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Contributor {
    constructor(contributor) {
        this.contributor = contributor;
    }


    render(ul) {

        // TODO: replace the next line with your code.
        //Util.createAndAppend('pre', container, JSON.stringify(this.contributor, null, 2));
        const a = Util.createAndAppend('a', ul, {
            href: this.contributor.html_url,
            target: '_blank',
        })
        const li = Util.createAndAppend('li', a, {
            class: 'contributor_item',
        });
        Util.createAndAppend('img', li, {
            src: this.contributor.avatar_url,
            height: '50px',
            class: 'contributor_avatar',
        });
        const contDataDiv = Util.createAndAppend('div', li, {
            class: 'contributor_data',
        });
        Util.createAndAppend('div', contDataDiv, {
            text: this.contributor.login,
        });
        Util.createAndAppend('div', contDataDiv, {
            text: `${this.contributor.contributions}`,
            class: 'contribution_badge',
        });
    }
}
