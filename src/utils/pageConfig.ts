const fields = [
  {
    id: 'config-email',
    span: 'Почта',
    name: 'email',
    type: 'email',
  },
  {
    id: 'config-login',
    span: 'Логин',
    name: 'login',
    type: 'text',
  },
  {
    id: 'config-name',
    span: 'Имя',
    name: 'first_name',
    type: 'text',
  },
  {
    id: 'config-second_name',
    span: 'Фамилия',
    name: 'second_name',
    type: 'text',
  },
  {
    id: 'config-display_name',
    span: 'Имя в чате',
    name: 'display_name',
    type: 'text',
  },
  {
    id: 'config-phone',
    span: 'Телефон',
    name: 'phone',
    type: 'text',
  },
];
const passChangeFields = [
  {
    id: 'old-password',
    span: 'Старый пароль',
    name: 'oldPassword',
    type: 'password',
  },
  {
    id: 'new-password',
    span: 'Новый пароль',
    name: 'newPassword',
    type: 'password',
  },
  {
    id: 'check-password',
    span: 'Повторите новый пароль',
    name: 'pass_check',
    type: 'password',
  },
];

const pageConfig = {
  Login: {
    validate: {
      inputs: ['login-input', 'password-input'],
      submitId: 'login-submit',
      check: (values: any) => values.every((v: any) => v.trim() !== ''),
    },
    context: (state: any) => ({ isDisable: !state.formValid }),
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
      check: (values: any) => values.every((v: any) => v.trim() !== ''),
    },
    context: (state: any) => ({ isDisable: !state.formValid }),
  },
  Chat: {},
  Config: {
    validate: {
      inputs: (state: any) => {
        const ids = [];
        if (state.userEdit) {
          ids.push(...fields.map((f) => f.id));
        }
        if (state.passwordChange) {
          ids.push(...passChangeFields.map((f) => f.id));
        }
        return ids;
      },
      submitId: 'save-user',
      check: (values: any) => values.every((v: any) => v.trim() !== ''),
    },
    context: (state: any) => ({
      user: state.user,
      readonly: !state.userEdit,
      isPassChanging: state.passwordChange,
      canSave: state.passwordChange || state.userEdit,
      isDisable: !state.formValid,
      passChangeFields: passChangeFields,
      fields: fields.map((field) => ({
        ...field,
        value: state.user[field.name] || '',
      })),
    }),
  },
  NotFound: {},
  Error: {},
};

export default pageConfig;
