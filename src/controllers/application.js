import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import _ from 'lodash';

import resources from '../locales/index.js';
import watcher from '../views/view.js';
import parseRss from '../models/parser.js';

const getProxy = (url) => {
  const proxy = new URL('/get', 'https://allorigins.hexlet.app');
  proxy.searchParams.set('disableCache', true);
  proxy.searchParams.set('url', url);
  return proxy.toString();
};

const validate = (url, feeds) => {
  const urlSchema = yup
    .string()
    .required()
    .url()
    .notOneOf(feeds);
  return urlSchema.validate(url, { abortEarly: false });
};

export default () => {
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: true,
    resources,
  }).then(() => {
    yup.setLocale({
      string: {
        url: 'errors.invalidUrl',
        required: 'errors.notEmpty',
      },
      mixed: {
        notOneOf: 'errors.conflict',
      },
    });
  });

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    button: document.querySelector('button[type="submit"]'),
    feedback: document.querySelector('.feedback'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
    modal: document.querySelector('#modal'),
    modalTitle: document.querySelector('#modal .modal-title'),
    modalBody: document.querySelector('#modal .modal-body'),
    redirect: document.querySelector('#modal a'),
  };

  const state = {
    form: {
      status: '',
      valid: false,
      errors: '',
    },
    links: [],
    posts: [],
    feeds: [],
    currentPosts: {},
    readPosts: [],
  };

  const watchedState = watcher(elements, i18n, state); // Наблюдаемое состояние

  const update = () => {
    const { feeds, posts } = state;
    const promises = feeds.map((feed) => {
      const url = getProxy(feed.link);

      const getNewPost = axios.get(url).then((response) => {
        const data = parseRss(response.data.contents);
        const currentPosts = data.posts.map((post) => ({ ...post, id: feed.id }));
        const oldPost = posts.filter((post) => post.id === feed.id);
        const newPost = _.differenceWith(currentPosts, oldPost, _.isEqual);

        if (newPost.length > 0) {
          newPost.forEach((post) => {
            watchedState.posts.push(post);
          });
        }
      });
      return getNewPost;
    });
    Promise.all(promises).finally(() => { setTimeout(update, 5000); });
  };

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    watchedState.form.status = 'loading';
    watchedState.form.errors = null;

    const formData = new FormData(event.target);
    const url = formData.get('url'); // получаем значение поля формы 'url'.

    validate(url, watchedState.links)
      .then((validUrl) => {
        const rssNews = axios.get(getProxy(validUrl));
        return rssNews;
      })
      .then((response) => {
        const { feed, posts } = parseRss(response.data.contents);
        watchedState.links.push(url);
        watchedState.form.status = 'success';

        const id = _.uniqueId();
        watchedState.feeds.push({ ...feed, id, link: url });
        posts.forEach((post) => watchedState.posts.push({ ...post, id }));
      })
      .catch((err) => {
        watchedState.form.status = 'failed';
        if (err.message === 'Network Error') {
          watchedState.form.errors = 'errors.networkError';
          elements.form.querySelector('.error-message').textContent = 'errors.networkError';
          elements.form.querySelector('.error-message').style.display = 'block';
        } else if (err.errors) {
          watchedState.form.errors = err.errors.join();
          elements.form.querySelector('.error-message').textContent = err.errors.join();
          elements.form.querySelector('.error-message').style.display = 'block';
        } else {
          watchedState.form.errors = err.name;
          elements.form.querySelector('.error-message').textContent = err.name;
          elements.form.querySelector('.error-message').style.display = 'block';
        }
      });
  });
  elements.posts.addEventListener('click', (event) => {
    const currentLink = event.target.href ?? event.target.previousElementSibling.href;
    const indexOfPost = state.posts.findIndex((item) => item.link === currentLink);
    watchedState.currentPosts = indexOfPost;

    if (!state.readPosts.includes(state.posts[indexOfPost])) {
      state.readPosts.push(state.posts[indexOfPost]);
    }
  });
  update();
};
