import Handlebars from 'handlebars';
import * as Pages from './Pages';

export default class App {
  constructor() {
    this.state = {
      currentPage: '',
      user: {},
    };
    this.appElement = document.getElementById('app');
  }

  render() {
    let template;
    this.attachEventListeners;
  }
}
