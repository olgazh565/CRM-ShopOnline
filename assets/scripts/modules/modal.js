import {addItemPage} from './render.js';
import {sendEditItem, sendNewItem} from './serviceAPI.js';
import {
    countModalTotal,
    countTableTotal,
    createElement,
    toBase64,
} from './services.js';
import {
    addItemData,
    blockCheckbox,
    controlErrorMessage,
    controlSuccessMsg,
    editItemData,
    editItemPage,
} from './controls.js';
import {createErrorMsg} from './createElements.js';

// создание и асинхронное подключение стилей в модалке

const styles = new Map();

export const loadStyle = url => {
    if (styles.has(url)) {
        return styles.get(url);
    }

    const stylePromise = new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;

        link.addEventListener('load', () => {
            resolve(link);
        });

        document.head.append(link);
    });

    styles.set(url, stylePromise);

    return stylePromise;
};

// Модальное окно

export const createModal = async (data, item = {}) => {
    const style = await loadStyle('./assets/css/modal.css');
    console.log('style: ', style);
    const isItem = Object.keys(item).length !== 0;

    const modalOverlay = createElement('div', {
        className: 'overlay modal-visible',
    });

    const modal = createElement('div', {
        className: 'modal',
    });

    const modalContainer = createElement('div', {
        className: 'modal__container',
    });

    const modalHeader = createElement('div', {
        className: 'modal__header',
    });

    const modalTitle = createElement('p', {
        className: 'modal__title',
        textContent: isItem ? 'Изменить товар' : 'Добавить товар',
    });

    const modalId = createElement('p', {
        className: 'modal__id',
    });

    const modalIdText = createElement('span', {
        className: 'modal__id-text',
        textContent: isItem ? 'id:' : '',
    });

    const modalIdNum = createElement('span', {
        className: 'modal__id-num',
        textContent: item.id ?? '',
    });

    const modalCloseBtn = createElement('button', {
        className: 'modal__close-btn',
        innerHTML: `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L22 22" stroke="#6E6893" stroke-width="3"
                    stroke-linecap="round" />
                <path d="M2 22L22 2" stroke="#6E6893" stroke-width="3"
                    stroke-linecap="round" />
            </svg>
        `,
    });

    modalId.append(modalIdText, modalIdNum);
    modalHeader.append(modalTitle, modalId);

    const modalForm = createElement('form', {
        className: 'modal__form form',
        action: 'https://jsonplaceholder.typicode.com/posts',
        method: 'POST',
        target: '_blank',
        noValidate: true,
    });

    const modalFieldset = createElement('fieldset', {
        className: 'form__fieldset',
    });

    const nameItem = createElement('div', {
        className: 'form__item form__item_name',
    });

    const nameLabel = createElement('label', {
        className: 'form__label',
        htmlFor: 'title',
        textContent: 'Наименование',
    });

    const nameInput = createElement('input', {
        className: 'form__input form__input_item',
        type: 'text',
        name: 'title',
        id: 'title',
        required: true,
        // pattern: '^[А-Яа-я\s]+$',
        value: item.title ?? '',
    });

    nameItem.append(nameLabel, nameInput);

    const categoryItem = createElement('div', {
        className: 'form__item form__item_category',
    });

    const categoryLabel = createElement('label', {
        className: 'form__label',
        htmlFor: 'category',
        textContent: 'Категория',
    });

    const categoryInput = createElement('input', {
        className: 'form__input form__input_item',
        type: 'text',
        name: 'category',
        id: 'category',
        required: true,
        // pattern: '^[А-Яа-я\s]+$',
        value: item.category ?? '',
    });

    categoryItem.append(categoryLabel, categoryInput);

    const unitsItem = createElement('div', {
        className: 'form__item',
    });

    const unitsLabel = createElement('label', {
        className: 'form__label',
        htmlFor: 'units',
        textContent: 'Единицы измерения',
    });

    const unitsInput = createElement('input', {
        className: 'form__input form__item_units form__input_item',
        type: 'text',
        name: 'units',
        id: 'units',
        required: true,
        // pattern: '^[А-Яа-я]+$',
        value: item.units ?? '',
    });

    unitsItem.append(unitsLabel, unitsInput);

    const discountItem = createElement('div', {
        className: 'form__item',
    });

    const discountLabel = createElement('label', {
        className: 'form__label form__label_checkbox',
        htmlFor: 'discount',
        textContent: 'Дисконт',
    });

    const discountWrapper = createElement('div', {
        className: 'form__checkbox-wrapper',
    });

    const discountCheckbox = createElement('input', {
        className: 'form__checkbox',
        type: 'checkbox',
        ariaLabel: 'Добавить скидку',
        checked: !isItem ? false : +item.discount !== 0,
    });

    const discountInput = createElement('input', {
        className: 'form__input form__input_checkbox form__input_item',
        type: 'number',
        name: 'discount',
        id: 'discount',
        required: true,
        title: 'Обязательное поле',
        disabled: !item.discount ? true : +item.discount === 0,
        value: !item.discount ? '' : +item.discount === 0 ? '' : item.discount,
    });

    discountWrapper.append(discountCheckbox, discountInput);
    discountItem.append(discountLabel, discountWrapper);

    const descriptionItem = createElement('div', {
        className: 'form__item form__item_description',
    });

    const descriptionLabel = createElement('label', {
        className: 'form__label',
        htmlFor: 'description',
        textContent: 'Описание',
    });

    const descriptionInput = createElement('textarea', {
        className: 'form__input form__input_item',
        name: 'description',
        id: 'description',
        rows: '5',
        minLength: '80',
        required: true,
        value: item.description ?? '',
    });

    descriptionItem.append(descriptionLabel, descriptionInput);

    const countItem = createElement('div', {
        className: 'form__item',
    });

    const countLabel = createElement('label', {
        className: 'form__label',
        htmlFor: 'count',
        textContent: 'Количество',
    });

    const countInput = createElement('input', {
        className: 'form__input form__item_count form__input_item',
        type: 'number',
        name: 'count',
        id: 'count',
        required: true,
        title: 'Обязательное поле',
        value: item.count ?? '',
    });

    countItem.append(countLabel, countInput);

    const priceItem = createElement('div', {
        className: 'form__item',
    });

    const priceLabel = createElement('label', {
        className: 'form__label',
        htmlFor: 'price',
        textContent: 'Цена',
    });

    const priceInput = createElement('input', {
        className: 'form__input form__item_price form__input_item',
        type: 'number',
        name: 'price',
        id: 'price',
        required: true,
        title: 'Обязательное поле',
        value: item.price ?? '',
    });

    priceItem.append(priceLabel, priceInput);

    const imageItemWrapper = createElement('div', {
        className: 'form__item form__item_add-image',
    });

    const imageWarning = createElement('p', {
        className: 'form__item_add-image-warning',
        textContent: 'Изображение не должно превышать размер 1Мб',
    });

    const imageItem = createElement('div', {
        className: 'form__item_add-image-group',
        tabIndex: '0',
    });

    const imageLabel = createElement('label', {
        className: 'form__label-add-image',
        htmlFor: 'image',
        textContent: 'добавить изображение',
        title: 'Обязательное поле',
    });

    const imageInput = createElement('input', {
        className: 'form__input-add-image form__input_item',
        type: 'file',
        name: 'image',
        id: 'image',
        accept: 'image/*',
        required: true,
    });

    imageItem.append(imageLabel, imageInput);
    imageItemWrapper.append(imageWarning, imageItem);

    const imagePreview = createElement('div', {
        className: !item.image ?
            'form__item form__item_img-preview img-preview' :
            (item.image !== 'image/notimage.jpg' ?
                `form__item form__item_img-preview img-preview is-image` :
                'form__item form__item_img-preview img-preview'),
    });

    const imageWrapper = createElement('div', {
        className: 'img-preview__wrapper',
    });

    const image = createElement('img', {
        className: 'form__item form__item_image',
        src: !item.image ? '' : (item.image !== 'image/notimage.jpg' ?
            `https://leaf-serious-chef.glitch.me/${item.image}` : ''),
        // alt: 'фото товара',
    });

    imageWrapper.append(image);
    imagePreview.append(imageWrapper);
    modalFieldset.append(
            nameItem,
            categoryItem,
            unitsItem,
            discountItem,
            descriptionItem,
            countItem,
            priceItem,
            imageItemWrapper,
            imagePreview,
    );

    const formFooter = createElement('div', {
        className: 'form__footer',
    });

    const formTotal = createElement('div', {
        className: 'form__total total',
    });

    const formTotalText = createElement('p', {
        className: 'total__text',
        textContent: 'Итоговая стоимость:',
    });

    const formTotalData = createElement('p', {
        className: 'total__data',
    });

    const formTotalCurrency = createElement('span', {
        className: 'total__currency',
        textContent: '$',
    });

    const formTotalCount = createElement('span', {
        className: 'total__count',
        textContent: isItem ?
            (item.price * item.count * (1 - item.discount / 100))
                    .toFixed(2) : '0',
    });

    formTotalData.append(formTotalCurrency, formTotalCount);
    formTotal.append(formTotalText, formTotalData);

    const formButton = createElement('button', {
        className: isItem ? 'form__add-button add-button is-blocked' :
            'form__add-button add-button',
        type: 'submit',
        textContent: 'Добавить товар',
        disabled: isItem,
    });

    formFooter.append(formTotal, formButton);
    modalForm.append(modalFieldset, formFooter);
    modalContainer.append(modalHeader, modalCloseBtn, modalForm);
    modal.append(modalContainer);
    modalOverlay.append(modal);
    document.body.append(modalOverlay);

    modalOverlay.addEventListener('click', ({target}) => {
        if (modalOverlay.classList.contains('is-error')) {
            return;
        }
        if (target === modalOverlay ||
            target.closest('.modal__close-btn')) {
            modalOverlay.remove();
            document.body.style.overflow = '';
        }
    });

    discountCheckbox.addEventListener('change', () => {
        discountInput.disabled = !discountCheckbox.checked;
        discountInput.value = '';
    });

    modalForm.addEventListener('input', ({target}) => {
        if (target.closest('INPUT') || target.closest('TEXTAREA')) {
            formButton.disabled = false;
            formButton.classList.remove('is-blocked');
        }
    });

    imageInput.addEventListener('change', () => {
        if (imageInput.files.length > 0) {
            const src = URL.createObjectURL(imageInput.files[0]);
            console.log('src: ', src);
            image.src = src;
            imagePreview.classList.add('is-image');

            if (imageInput.files[0].size > 1000000) {
                imageWarning.style.display = 'block';
                formButton.disabled = true;
                formButton.classList.add('is-blocked');
            } else {
                imageWarning.style.display = 'none';
                formButton.disabled = false;
                formButton.classList.remove('is-blocked');
            }
        }
    });

    imageWrapper.addEventListener('click', () => {
        imagePreview.classList.remove('is-image');
        URL.revokeObjectURL(image.src);

        if (imageInput.files.length > 0) {
            imageInput.value = null;
        } else if (item.image) {
            item.image = null;
            formButton.disabled = false;
            formButton.classList.remove('is-blocked');
        }
    });

    modalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const itemData = Object.fromEntries(formData);
        itemData.image = imageInput.files.length > 0 ?
            await toBase64(imageInput.files[0]) : item.image;
        let success;
        const inputs = [...modalForm.querySelectorAll('.form__input_item')];
        const errorMsg = document.querySelector('.input-error');

        for (const input of inputs) {
            if (!input.disabled && !input.validity.valid) {
                input.focus();
                if (errorMsg) errorMsg.remove();
                createErrorMsg(input);
                return;
            }
        }

        if (item.id) {
            success = await sendEditItem(
                    item.id,
                    data,
                    itemData,
                    editItemPage,
                    editItemData,
                    controlSuccessMsg,
                    controlErrorMessage,
            );
        } else {
            success = await sendNewItem(
                    data,
                    itemData,
                    addItemPage,
                    addItemData,
                    controlSuccessMsg,
                    controlErrorMessage,
            );
        }

        if (success) {
            modalForm.reset();
            blockCheckbox();
            countTableTotal(data);
            modalOverlay.remove();
            document.body.style.overflow = '';
        }
    });

    modalForm.addEventListener('input', ({target}) => {
        const errorMsg = document.querySelector('.input-error');

        if (target.closest('.form__item_name') ||
            target.closest('.form__item_category') ||
            target.closest('.form__item_description')) {
            target.value = target.value.replace(/[^А-Я\s]/gi, '');
        } else if (target.closest('.form__item_units')) {
            target.value = target.value.replace(/[^А-Я]/gi, '');
        }

        if (target.validity.valid) {
            if (errorMsg) errorMsg.remove();
        }
    });

    countModalTotal(modalForm);
    document.body.style.overflow = 'hidden';
};
