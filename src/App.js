import Handlebars from 'handlebars';
import * as Pages from './pages/index';
import pageConfig from './utils/pageConfig';
import { userStore } from './store/userStore.js';
import Heading from './components/heading/heading.js';
import Input from './components/input/input.js';
import Button from './components/button/button.js';
import Link from './components/link/link.js';
import Footer from './components/footer/footer.js';
import BackLink from './components/backLink/backLink.js';
import Avatar from './components/avatar/avatar.js';

Handlebars.registerPartial('Heading', Heading);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Footer', Footer);
Handlebars.registerPartial('BackLink', BackLink);
Handlebars.registerPartial('Avatar', Avatar);

export default class App {
  constructor() {
    this.state = {
      currentPage: 'Config',
      formValid: false,
      user: userStore.get(),
      userEdit: false,
      passwordChange: false,
    };
    this.appElement = document.getElementById('app');
  }

  render() {
    const pageKey = this.state.currentPage;
    const templateString = Pages[pageKey] || Pages.NotFound;
    const template = Handlebars.compile(templateString);
    const pageConf = pageConfig[pageKey] || {};
    const context = pageConf.context ? pageConf.context(this.state) : {};
    this.appElement.innerHTML = template(context);
    this.attachEventListeners();
  }

  attachEventListeners() {
    const pageKey = this.state.currentPage;
    const pageConf = pageConfig[pageKey];

    if (pageConf && pageConf.validate) {
      const { inputs, submitId, check } = pageConf.validate;
      const inputIds =
        typeof inputs === 'function' ? inputs(this.state) : inputs;

      const elems = inputIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      const onInput = () => {
        const values = elems.map((el) => el.value);
        this.state.formValid = check(values);
        this.updateButtonState(submitId);
      };

      elems.forEach((el) => el.addEventListener('input', onInput));
      onInput();
    }

    const loginBtn = document.getElementById('login-submit');
    const registerBtn = document.getElementById('registration-submit');
    const changeUserBtn = document.getElementById('change-user');
    const changePassBtn = document.getElementById('change-password');
    const saveUserBtn = document.getElementById('save-user');
    const exitBtn = document.getElementById('exit-button');

    loginBtn?.addEventListener('click', () => this.auth());
    registerBtn?.addEventListener('click', () => this.auth());
    changeUserBtn?.addEventListener('click', () => this.editUser(true));
    changePassBtn?.addEventListener('click', () => this.changePass(true));
    saveUserBtn?.addEventListener('click', () => this.saveUserConfig());
    exitBtn?.addEventListener('click', () => this.exit());

    document.querySelectorAll('.link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    });
  }

  auth() {
    this.state.currentPage = 'Chat';
    this.render();
  }

  editUser(value) {
    this.state.userEdit = value;
    this.render();
  }

  changePass(value) {
    this.state.passwordChange = value;
    this.render();
  }

  saveUserConfig() {
    if (!this.state.formValid) return;

    this.state.userEdit = false;
    this.state.passwordChange = false;
    this.render();
  }

  exit() {
    this.state.currentPage = 'Login';
    this.render();
  }

  changePage(page) {
    this.state.currentPage = page;
    this.state.formValid = false;
    this.render();
  }

  updateButtonState(buttonId = 'login-submit') {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.disabled = !this.state.formValid;
    }
  }
}
