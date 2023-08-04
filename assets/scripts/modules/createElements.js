import {domElements} from './domElements.js';
import {createElement} from './services.js';

// Создание строк таблицы

export const createRow = (obj) => {
    const row = document.createElement('tr');
    const totalCount = obj.price * obj.count * (1 - obj.discount / 100);
    row.className = 'table__row';
    row.dataset.id = obj.id;
    row.dataset.pic = './assets/imgs/test.jpg';
    row.innerHTML = `
        <td class="products__id">${obj.id}</td>
        <td class="products__name">${obj.title}</td>
        <td class="products__category">${obj.category}</td>
        <td class="products__units">${obj.units}</td>
        <td class="products__count">${obj.count}</td>
        <td class="products__price">${obj.price}</td>
        <td class="products__total">${totalCount > 0 ? totalCount : 0}</td>
        <td class="products__image">
            <button class="products__btn products__image-btn products"
                type="button"></button>
        </td>
        <td class="products__edit">
            <button class="products__btn products__edit-btn"
                type="button"></button>
        </td>
        <td class="products__delete">
            <button class="products__btn products__delete-btn"
                type="button"></button>
        </td>    
        `;

    return row;
};

// создание картинки по data-pic

export const createImg = src => {
    const img = document.createElement('img');
    img.alt = 'фото товара';
    img.src = src;

    return img;
};

// сообщение об ошибке

export const createErrorPopup = (error, message) => {
    const {modal} = domElements();

    const errorPopup = document.createElement('div');
    errorPopup.classList.add('modal__error');

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('error__close-btn');
    closeBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L22 22" stroke="#6E6893" stroke-width="3" 
                stroke-linecap="round" />
            <path d="M2 22L22 2" stroke="#6E6893" stroke-width="3" 
                stroke-linecap="round" />
        </svg>
    `;

    const errorTextImg = `
        <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L92 92" stroke="#D80101" stroke-width="3" 
                stroke-linecap="round"/>
            <path d="M2 92L92 2" stroke="#D80101" stroke-width="3" 
                stroke-linecap="round"/>
        </svg>
    `;

    const errorText = document.createElement('div');
    errorText.classList.add('error__text');

    if (error) {
        errorText.textContent = `Ошибка ${error}`;
    } else {
        errorText.innerHTML = errorTextImg;
    }

    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error__message');

    errorMessage.textContent = message ? message : 'Что-то пошло не так';

    errorPopup.append(closeBtn, errorText, errorMessage);
    modal.append(errorPopup);

    return errorPopup;
};

// сообщение об успешной отправке данных

export const createSuccessMsg = () => {
    const msg = document.createElement('div');
    msg.classList.add('msg');

    const msgText = document.createElement('p');
    msgText.classList.add('msg__text');
    msgText.textContent = 'Данные успешно отправлены';

    msg.append(msgText);
    document.body.append(msg);

    return msg;
};

// Модальное окно

export const createModal = (item = {}) => {
    const modalOverlay = createElement('div', {
        className: 'overlay',
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
        textContent: item ? 'Изменить товар' : 'Добавить товар',
    });

    const modalId = createElement('p', {
        className: 'modal__id',
    });

    const modalIdText = createElement('span', {
        className: 'modal__id-text',
    });

    const modalIdNum = createElement('span', {
        className: 'modal__id-num',
        textContent: item ? item.id : '',
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
    });

    const modalFieldset = createElement('fieldset', {
        className: 'form__fieldset',
    });

    const nameItem = createElement('div', {
        className: 'form__item form__item_name',
    });

    const nameLabel = createElement('label', {
        className: 'form__label',
        for: 'title',
        textContent: 'Наименование',
    });

    const nameInput = createElement('input', {
        className: 'form__input',
        type: 'text',
        name: 'title',
        id: 'title',
        required: true,
        value: item ? item.title : '',
    });

    nameItem.append(nameLabel, nameInput);

    const categoryItem = createElement('div', {
        className: 'form__item form__item_category',
    });

    const categoryLabel = createElement('label', {
        className: 'form__label',
        for: 'category',
        textContent: 'Категория',
    });

    const categoryInput = createElement('input', {
        className: 'form__input',
        type: 'text',
        name: 'category',
        id: 'category',
        required: true,
        value: item ? item.category : '',
    });

    categoryItem.append(categoryLabel, categoryInput);

    const unitsItem = createElement('div', {
        className: 'form__item',
    });

    const unitsLabel = createElement('label', {
        className: 'form__label',
        for: 'units',
        textContent: 'Единицы измерения',
    });

    const unitsInput = createElement('input', {
        className: 'form__input',
        type: 'text',
        name: 'units',
        id: 'units',
        required: true,
        value: item ? item.units : '',
    });

    unitsItem.append(unitsLabel, unitsInput);

    const discountItem = createElement('div', {
        className: 'form__item',
    });

    const discountLabel = createElement('label', {
        className: 'form__label form__label_checkbox',
        for: 'discount',
        textContent: 'Дисконт',
    });

    const discountWrapper = createElement('div', {
        className: 'form__checkbox-wrapper',
    });

    const discountCheckbox = createElement('input', {
        className: 'form__checkbox',
        type: 'checkbox',
        ariaLabel: 'Добавить скидку',
    });

    const discountInput = createElement('input', {
        className: 'form__input form__input_checkbox',
        type: 'number',
        name: 'discount',
        id: 'discount',
        required: true,
        value: item ? item.discount : '',
    });

    discountWrapper.append(discountCheckbox, discountInput);
    discountItem.append(discountLabel, discountWrapper);

    const descriptionItem = createElement('div', {
        className: 'form__item form__item_description',
    });

    const descriptionLabel = createElement('label', {
        className: 'form__label',
        for: 'description',
        textContent: 'Описание',
    });

    const descriptionInput = createElement('textarea', {
        className: 'form__input',
        name: 'description',
        id: 'description',
        rows: '5',
        required: true,
        value: item ? item.description : '',
    });

    descriptionItem.append(descriptionLabel, descriptionInput);

    const countItem = createElement('div', {
        className: 'form__item',
    });

    const countLabel = createElement('label', {
        className: 'form__label',
        for: 'count',
        textContent: 'Количество',
    });

    const countInput = createElement('input', {
        className: 'form__input',
        type: 'number',
        name: 'count',
        id: 'count',
        required: true,
        value: item ? item.count : '',
    });

    countItem.append(countLabel, countInput);

    const priceItem = createElement('div', {
        className: 'form__item',
    });

    const priceLabel = createElement('label', {
        className: 'form__label',
        for: 'price',
        textContent: 'Цена',
    });

    const priceInput = createElement('input', {
        className: 'form__input',
        type: 'number',
        name: 'price',
        id: 'price',
        required: true,
        value: item ? item.price : '',
    });

    priceItem.append(priceLabel, priceInput);

    const imageItem = createElement('div', {
        className: 'form__item form__item_add-image',
    });

    const imageLabel = createElement('label', {
        className: 'form__label-add-image',
        for: 'image',
        tabindex: '0',
        textContent: 'добавить изображение',
    });

    const imageInput = createElement('input', {
        className: 'form__input-add-image',
        type: 'file',
        name: 'image',
        id: 'image',
        accept: 'image/*',
        required: false,
        // value: item ? item.image : '',
    });

    imageItem.append(imageLabel, imageInput);
    modalFieldset.append(
            nameItem,
            categoryItem,
            unitsItem,
            discountItem,
            descriptionItem,
            countItem,
            priceItem,
            imageItem,
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
        textContent: item ?
        `${item.price} * ${item.count} * (1 - ${item.discount} / 100)
        ).toFixed(2);` : '',
    });

    formTotalData.append(formTotalCurrency, formTotalCount);
    formTotal.append(formTotalText, formTotalData);

    const formButton = createElement('button', {
        className: 'form__add-button add-button',
        type: 'submit',
        textContent: 'Добавить товар',
    });

    formFooter.append(formTotal, formButton);

    modalForm.append(modalFieldset, formFooter);
    modalContainer.append(modalHeader, modalCloseBtn, modalForm);
    modal.append(modalContainer);
    modalOverlay.append(modal);
    document.body.append(modalOverlay);

    return modalOverlay;
};
