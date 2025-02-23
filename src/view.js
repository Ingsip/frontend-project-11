import onChange from 'on-change';

const renderFeeds = (elements, i18n, value) => {
  const { t } = i18n; 
  const { feeds } = elements;
  const li = document.createElement('h2');
  li.textContent = t('feeds');

  const a = document.createElement('ul');
  a.classList.add('list-group', 'mb-5');

  value.forEach((item) => {
    const feed = document.createElement('li');
    feed.classList.add('list-group-item');

    const headerFeed = document.createElement('h3');
    headerFeed.textContent = item.title;

    const descriptionFeed = document.createElement('p');
    descriptionFeed.textContent = item.description;

    feed.append(headerFeed, descriptionFeed);
    a.prepend(feed);
  });
  feeds.innerHTML = '';
  feeds.append(li, a);
};

const modal = (elements, state, indexOfPost) => {
  const { modalTitle, modalBody, redirect } = elements;
  const titles = elements.posts.querySelectorAll('a');
  const currentPost = state.posts[indexOfPost];
  titles.forEach((title) => {
    if (title.href !== currentPost.link) {
      return;
    }
    title.classList.remove('fw-bold');
    title.classList.add('fw-normal');
    modalTitle.textContent = currentPost.title;
    modalBody.textContent = currentPost.description;
    redirect.href = currentPost.link;
    });
  };

const renderPosts = (elements, i18n, value, state) => {
  const { t } = i18n;
  const { posts } = elements;
  const header = document.createElement('h2');
  header.textContent = t('posts');

  const fragment = document.createDocumentFragment();

  const postsList  = document.createElement('ul');
  postsList.classList.add('list-group');

  value.forEach((item) => {
    const { title, link, id } = item;
    const post = document.createElement('li');
    post.classList.add('list-group-item', 'd-flex');
    post.classList.add('justify-content-between', 'align-items-start');

    const elemTitle = document.createElement('a');
    elemTitle.textContent = title;

    const text = state.readPosts.includes(item) ? 'fw-normal' : 'fw-bold';
    elemTitle.classList.add(text);

    elemTitle.setAttribute('href', link);
    elemTitle.setAttribute('target', '_blank');
    elemTitle.setAttribute('rel', 'noopener noreferrer');

    const buttonWatch = document.createElement('button');
    buttonWatch.textContent = t('viewing');
    buttonWatch.classList.add('btn', 'btn-primary', 'btn-sm');
    buttonWatch.setAttribute('type', 'button');
    buttonWatch.dataset.id = id;
    buttonWatch.dataset.bsToggle = 'modal';
    buttonWatch.dataset.bsTarget = '#modal';

    post.append(elemTitle, buttonWatch);
    fragment.prepend(post);
  });

  posts.innerHTML = '';
  postsList.append(fragment);
  posts.append(header, postsList);
};

const renderErrorss = (elements, i18n, value) => {
  if(!value) {
    return;
  }
  const { t } = i18n;

  const { feedback } = elements;

  switch (value) {
    case 'errors.invalidUrl':
      feedback.textContent = t(value);
      break;

    case 'errors.conflict':
      feedback.textContent = t(value);
      break;

    case 'errors.networkError':
      feedback.textContent = t(value);
      break;

    case 'Error':
      feedback.textContent = t('errors.invalidRss');
      break;

    default:
      feedback.textContent = t('errors.somethingWrong');
      break;
  }
};

const submitProcess = (elements) => {
  const { form, input, button } = elements;
  form.reset();
  input.focus();
  button.disabled = false;
};

const renderStatus = (elements, i18n, value) => {
  const { t } = i18n;
  const { input, feedback, button } = elements;
  switch (value) {
    case null:
      break;
    case 'loading':
      button.disabled = true;
      feedback.classList.remove('text-danger');
      feedback.classList.remove('text-success');
      feedback.classList.add('text-secondary');
      feedback.textContent = t(value);
      break;

    case 'success':
      input.classList.remove('is-invalid');
      feedback.classList.replace('text-secondary', 'text-success');
      feedback.textContent = t(value);
      break;

    case 'failed':
      input.classList.add('is-invalid');
      feedback.classList.remove('text-success');
      feedback.classList.remove('text-secondary');
      feedback.classList.add('text-danger');
      button.disabled = false;
      break;
  
    default:
      break;
  }
};

export default (elements, i18n, state) => {
  const formProcess = onChange(state, (path, value) => {
    switch (path) {
      case 'form.status':
        renderStatus(elements, i18n, value);
        break;

      case 'links':
        submitProcess(elements);
        break;

      case 'form.errors':
        renderErrorss(elements, i18n, value);
        break;

      case 'feeds':
        renderFeeds(elements, i18n, value);
        break;

      case 'posts':
        renderPosts(elements, i18n, value, state);
        break;

      case 'currentPosts':
        modal(elements, state, value);
        break;

      default:
        break;
    }
  });
  return formProcess;
};