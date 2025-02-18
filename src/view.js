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

    const header = document.createElement('h3');
    header.textContent = item.title;

    const description = document.createElement('p');
    description.textContent = item.description;

    feed.append(header, description);
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

    const button = document.createElement('button');
    button.textContent = t('viewing');
    button.classList.add('btn', 'btn-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.dataset.id = id;
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#modal';

    post.append(elemTitle, button);
    fragment.prepend(post);
  });

  posts.innerHTML = '';
  postsList.append(fragment);
  posts.append(header, postsList);
};


const renderErrorss = (elements, i18n, value) => {
  const { t } = i18n;

  const { feedback } = elements;

  if(!value) {
    return;
  }

  switch (value) {
    case 'errors.invalidUrl':
      feedback.textContent = t(value);
      break;

    case 'errors.conflict':
      feedback.textContent = t(value);
      break;

    case 'errors.invalidRss':
      feedback.textContent = t(value);
      break;
    
      case 'Axios':
        feedback.textContent = t('errors.networkError');
        break;

      default:
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
      submitButton.disabled = false;
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