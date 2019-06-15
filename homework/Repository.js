'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Repository {
    constructor(repository) {
        this.repository = repository;
    }

    /*
     * Render the repository info to the DOM.
     * @param {HTMLElement} container The container element in which to render the repository.
     */
    render(table) {
        // TODO: replace the next line with your code.
        //Util.createAndAppend('pre', container, JSON.stringify(this.repository, null, 2));
        const tr = Util.createAndAppend('tr', table);
        Util.createAndAppend('td', tr, {
            text: 'Repository:',
            class: 'label',
        });
        const repoLink = Util.createAndAppend('td', tr);
        Util.createAndAppend('a', repoLink, {
            href: this.repository.svn_url,
            target: '_blank',
            text: this.repository.name,
        });
        const descriptionTr = Util.createAndAppend('tr', table);
        Util.createAndAppend('td', descriptionTr, {
            text: `Description: ${this.repository.description}`,
        });
        const forksTr = Util.createAndAppend('tr', table);
        Util.createAndAppend('td', forksTr, {
            text: `Forks:  ${this.repository.forks}`,
        });
        const updatedTr = Util.createAndAppend('tr', table);
        Util.createAndAppend('td', updatedTr, {
            text: `Updated:  ${this.repository.updated_at}`,
        });
    }


    /**
     * Returns an array of contributors as a promise
     */
    fetchContributors() {
        return Util.fetchJSON(this.repository.contributors_url);

    }

    /**
     * Returns the name of the repository
     */
    name() {
        return this.repository.name;
    }
}
