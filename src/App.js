import Handlebars from 'handlebars';
import * as Pages from './pages/index';

import Header from './components/header/header.js';
import Input from './components/input/input.js';
import Button from './components/button/button.js';
import Link from './components/link/link.js';
import Footer from './components/footer/footer.js';
import ArrowBack from './components/arrowBack/arrowBack.js';

Handlebars.registerPartial('Header', Header);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Footer', Footer);
Handlebars.registerPartial('ArrowBack', ArrowBack);

export default class App {
  constructor() {
    this.state = {
      currentPage: 'config',
      formValid: false,
    };
    this.appElement = document.getElementById('app');
  }

  render() {
    let template;
    if (this.state.currentPage === 'login') {
      template = Handlebars.compile(Pages.Login);
      this.appElement.innerHTML = template({
        isDisable: !this.state.formValid,
      });
    } else if (this.state.currentPage === 'registration') {
      template = Handlebars.compile(Pages.Registration);
      this.appElement.innerHTML = template({
        isDisable: !this.state.formValid,
      });
    } else if (this.state.currentPage === 'notFound') {
      template = Handlebars.compile(Pages.NotFound);
      this.appElement.innerHTML = template({});
    } else if (this.state.currentPage === 'error') {
      template = Handlebars.compile(Pages.Error);
      this.appElement.innerHTML = template({});
    } else if (this.state.currentPage === 'chat') {
      template = Handlebars.compile(Pages.Chat);
      this.appElement.innerHTML = template({});
    } else if (this.state.currentPage === 'config') {
      template = Handlebars.compile(Pages.Config);
      this.appElement.innerHTML = template({});
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
    if (this.state.currentPage === 'login') {
      const inputs = ['login-input', 'password-input'].map((id) =>
        document.getElementById(id),
      );

      const validateForm = () => {
        this.state.formValid = inputs.every(
          (input) => input && input.value.trim() !== '',
        );
        this.updateButtonState();
      };

      inputs.forEach(
        (input) => input && input.addEventListener('input', validateForm),
      );
      validateForm();
    } else if (this.state.currentPage === 'registration') {
      const inputs = [
        'email-input',
        'login-input',
        'name-input',
        'second_name-input',
        'phone-input',
        'password-input',
        'password-check-input',
      ].map((id) => document.getElementById(id));

      const validateForm = () => {
        this.state.formValid =
          inputs.every((input) => input && input.value.trim() !== '') &&
          inputs[5].value === inputs[6].value;
        this.updateButtonState('registration-submit');
      };

      inputs.forEach(
        (input) => input && input.addEventListener('input', validateForm),
      );
      validateForm();
    }

    const formFooterLinks = document.querySelectorAll('.form-footer-link');
    formFooterLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    });
  }

  changePage(page) {
    this.state.currentPage = page;
    this.render();
  }

  updateButtonState(buttonId = 'login-submit') {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.disabled = !this.state.formValid;
    }
  }
}
