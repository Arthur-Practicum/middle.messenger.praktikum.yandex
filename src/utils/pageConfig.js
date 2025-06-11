const pageConfig = {
  Login: {
    validate: {
      inputs: ['login-input', 'password-input'],
      submitId: 'login-submit',
      check: (values) => values.every((v) => v.trim() !== ''),
    },
    context: (state) => ({ isDisable: !state.formValid }),
  },
  Registration: {
    validate: {
      inputs: [
        'email-input',
        'login-input',
        'name-input',
        'second_name-input',
        'phone-input',
        'password-input',
        'password-check-input',
      ],
      submitId: 'registration-submit',
      check: (values) => values.every((v) => v.trim() !== ''),
    },
    context: (state) => ({ isDisable: !state.formValid }),
  },
  Chat: {},
  Config: {
    context: (state) => ({ settings: state.settings }),
  },
  NotFound: {},
  Error: {},
};

export default pageConfig;
