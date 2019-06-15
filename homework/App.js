'use strict';

/* global Util, Repository, Contributor */

class App {
  constructor(url) {
    this.initialize(url);
  }

  async initialize(url) {
    const root = document.getElementById('root');
    const header = Util.createAndAppend('header', root, {
      class: 'header',
    });
    Util.createAndAppend('p', header, {
      text: 'HYF Repositories',
    });
    const selectMenu = Util.createAndAppend('select', header, {
      class: 'repo_selector',
    });
    const containerDiv = Util.createAndAppend('div', root, {
      id: 'container',
    });
    const repoDiv = Util.createAndAppend('div', containerDiv, {
      class: 'left-div',
    });
    const table = Util.createAndAppend('table', repoDiv);

    const contributorsDiv = Util.createAndAppend('div', containerDiv, {
      class: 'right-div',
    });
    Util.createAndAppend('p', contributorsDiv, {
      text: 'Contributors',
      class: 'contributor_header',
    });
    const ul = Util.createAndAppend('ul', contributorsDiv, {
      id: 'contributor_list',
    });


    try {
      const repos = await Util.fetchJSON(url);
      console.log(repos);
      selectMenu.innerHTML = repos.sort((a, b) => a.name.localeCompare(b.name));
      this.repos = repos.map(repo => new Repository(repo));
      // TODO: add your own code here
      repos.forEach(elem => {
        Util.createAndAppend('option', selectMenu, {
          value: repos.indexOf(elem),
          text: elem.name
        });
      });
      this.repos[0].render(table);
      selectMenu.addEventListener('change', event => {
        const index = event.target.value;
        App.clearContainer(ul);
        this.fetchContributorsAndRender(index);
        App.clearContainer(table);
        this.repos[index].render(table);

      });
    } catch (error) {
      this.renderError(error);
    }
  }

  static clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  async fetchContributorsAndRender(index) {
    try {
      const repo = this.repos[index];
      console.log(repo);
      const contributors = await repo.fetchContributors();
      console.log(contributors);

      const contributorList = document.getElementById('contributor_list');

      contributors
        .map(contributor => new Contributor(contributor))
        .forEach(contributor => contributor.render(contributorList));
    } catch (error) {
      this.renderError(error);
    }
  }

  renderError(error) {
    console.log(error);
    const container = document.getElementById('root');
    App.clearContainer(container);
    Util.createAndAppend('div', container, {
      text: error.message,
      class: 'alert-error'
    });
  }
}

const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

window.onload = () => new App(HYF_REPOS_URL);
