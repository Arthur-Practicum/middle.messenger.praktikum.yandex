import Handlebars from 'handlebars';
import * as Pages from './pages/index';

import Header from './components/header/header.js';
import Input from './components/input/input.js';
import Button from './components/button/button.js';
import Link from './components/link/link.js';

Handlebars.registerPartial('Header', Header);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);

export default class App {
  constructor() {
    this.state = {
      currentPage: 'login',
      formValid: false,
    };
    this.appElement = document.getElementById('app');
  }

  render() {
    let template;
    if (this.state.currentPage === 'login') {
      template = Handlebars.compile(Pages.Login);
      this.appElement.innerHTML = template({
        isDisplayed: !this.state.formValid,
      });
    } else if (this.state.currentPage === 'registration') {
      template = Handlebars.compile(Pages.Registration);
      this.appElement.innerHTML = template({
        isDisplayed: !this.state.formValid,
      });
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
    if (this.state.currentPage === 'login') {
      const loginInput = document.getElementById('login-input');
      const passwordInput = document.getElementById('password-input');
      const validateForm = () => {
        this.state.formValid = this.checkFormValidation();
        this.updateButtonState();
      };

      if (loginInput && passwordInput) {
        loginInput.addEventListener('input', validateForm);
        passwordInput.addEventListener('input', validateForm);
        validateForm();
      }
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

  checkFormValidation() {
    const loginInput = document.getElementById('login-input');
    const passwordInput = document.getElementById('password-input');
    if (!loginInput || !passwordInput) return false;
    return loginInput.value.trim() !== '' && passwordInput.value.trim() !== '';
  }

  updateButtonState() {
    const button = document.getElementById('login-submit');
    if (button) {
      button.disabled = !this.state.formValid;
    }
  }
}
