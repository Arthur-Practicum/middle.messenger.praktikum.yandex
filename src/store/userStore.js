class UserStore {
  constructor() {
    this.user = {
      email: 'pochta@yandex.ru',
      login: 'ivanivanov',
      first_name: 'Иван',
      second_name: 'Иванов',
      display_name: 'Иван',
      phone: '+7 (909) 967 30 30',
    };
  }

  get() {
    return this.user;
  }
}

export const userStore = new UserStore();
