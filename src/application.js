import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import resources from './locales/index.js';
import watch from './view.js';

export default async () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    submitButton: document.querySelector('button[type="submit"]'),
    feedback: document.querySelector('.feedback'),
    fields: {},
    errorFields: {},
  };


  const state = {
    form: {
      status: 'filling',// null неверно
      valid: false,
      errors: '',
    },
    links: [],
    posts: [],
    feeds: [],
  };

  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: true,
    resources,
  })
  .then(() => {
    yup.setLocale({
      mixed: {
        required: () => ({ key: 'feedback.notEmpty' }),
        conflict: () => ({ key: 'feedback.conflict' }),
      },
      string: {
        url: () => ({ key: 'feedback.invalidUrl' }),
      },
    });
  })
  .then(() => {
    const urlSchema = (addUrl) => yup.object({
        urlRss: yup.string()
            .url()
            .required()
            .notOneOf(addUrl, 'feedback.conflict'),
    });

  const watchedState = watch(elements, i18n, state); // Наблюдаемое состояние
  watchedState.form.status = 'filling'; // заполнение

/*const urlSchema = (addUrl) => yup.object({
    urlRss: yup.string()
    .url()
    .required()
    .notOneOf(addUrl),
  });*/

    elements.form.addEventListener('submit', (event) => {
      event.preventDefault();
      watchedState.form.process = 'loading';
      watchedState.form.errors = null;

      const formData = new FormData(event.target);
      const url = formData.get('url');
      const links = watchedState.data.feeds.map((feed) => feed.url);

    });

})
};

