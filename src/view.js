import onChange from 'on-change';

export default (elements, i18n, state) => {
	const { t } = i18n;
	//const { form, fields, errorFields } = elements;

	const formRender = (watchedState) => { // обновляет внешний вид и состояние HTML формы на основе состояния объекта watchedState
		const form = document.querySelector('.rss-form');
		const input = document.querySelector('#url-input');
		
		if (watchedState.validation.status === 'invalid') {
			input.classList.add('is-invalid');
		}
		if (watchedState.validation.status === 'valid') {
			input.classList.remove('is-invalid');
			form.reset(); //сбрасывает все поля формы к начальнщму значению
			form.elements.url.focus();
		}
	};

	const feedbackRender = () => {
		const feedback = document.querySelector('.feedback');
		feedback.classList.remove('text-success');
		feedback.classList.remove('text-danger');
	};

	


};