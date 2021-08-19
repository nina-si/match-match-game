import './styles.scss';
import { App } from './app';
import { Header } from './components/header/header';
import { PageTemplate } from './components/page-template';
import { MainBlock } from './components/main-block/main-block';
import { Button } from './components/button/button';
import { Registration } from './components/registration/registration';
import { Validator } from './components/validator/validator';
import { initIndexedDB } from './components/indexedDB/indexedDB';
import { saveSettings } from './components/settings/settings';

const wrapper = document.getElementById('wrapper');
const main = new MainBlock();

function openForm(): void {
  const form = document.querySelector('.registration-form');
  form?.classList.add('form-open');
}

function clearForm(): void {
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => {
    input.value = '';
  });
}

function closeForm(): void {
  const form = document.querySelector('.registration-form');
  form?.classList.remove('form-open');
}

window.onload = () => {
  if (!wrapper) throw Error('Wrapper element not found');
  else {
    const header = new Header();
    wrapper.appendChild(header.element);
    const page = new PageTemplate(wrapper, 'about');
    page.add();
    const registration = new Registration('/', 'GET');
    document.getElementById('main')?.appendChild(registration.element);
  }
};

main.clearMain();

const routes = [
  {
    name: 'about',
    component: async () => {
      const block = document.getElementById('main');
      if (!block) {
        throw Error('main element not found');
      }
      main.clearMain();
      if (!wrapper) throw Error('Wrapper element not found');
      else {
        const page = new PageTemplate(wrapper, 'about');
        page.add();
        const registration = new Registration('/', 'GET');
        document.getElementById('main')?.appendChild(registration.element);
      }
    },
  },
  {
    name: 'settings',
    component: async () => {
      const block = document.getElementById('main');
      if (!block) {
        throw Error('main element not found');
      }
      main.clearMain();
      if (!wrapper) throw Error('Wrapper element not found');
      else {
        const page = new PageTemplate(wrapper, 'settings');
        page.add();
        saveSettings();
      }
    },
  },
  {
    name: 'score',
    component: async () => {
      const block = document.getElementById('main');
      if (!block) {
        throw Error('main element not found');
      }
      main.clearMain();
      if (!wrapper) throw Error('Wrapper element not found');
      else {
        const page = new PageTemplate(wrapper, 'score');
        page.add();
      }
    },
  },
];

window.onpopstate = () => {
  const currentRouteName = window.location.hash.slice(1);
  const currentRoute = routes.find((p) => p.name === currentRouteName);
  const defaultRoute = routes.find((p) => p.name === 'default');
  (currentRoute || defaultRoute)?.component();
};

window.addEventListener('click', (e) => {
  if (e.target === document.getElementById('start-button')) {
    main.clearMain();
    const block = new MainBlock();
    wrapper?.appendChild(block.element);
    new App(block.element).start();
  }

  if (e.target === document.getElementById('register-btn')) {
    openForm();
    const form = document.querySelector('.registration-form');
    const fields = ['first-name', 'last-name', 'email'];

    const validator = new Validator(form, fields);
    validator.validateOnInput();
  }

  if (e.target === document.getElementById('cancel-btn')) {
    e.preventDefault();
    clearForm();
    closeForm();
  }

  if (e.target === document.querySelector('.submit-btn')) {
    e.preventDefault();
    initIndexedDB();
    const registerBtn = document.getElementById('register-btn');
    registerBtn?.parentNode?.removeChild(registerBtn);
    const startBtn = new Button();
    const header = document.querySelector('.main-header');
    header?.appendChild(startBtn.element);
    closeForm();
  }
});
