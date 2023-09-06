import {domElements} from './domElements.js';
import {createElement} from './services.js';
import {isImage, noImage} from './const.js';

// Создание строк таблицы

export const createRow = (obj) => {
    const totalCount = obj.price * obj.count * (1 - obj.discount / 100);

    const row = document.createElement('tr');
    row.className = 'table__row';
    row.dataset.id = obj.id;
    row.dataset.pic = obj.image === 'image/notimage.jpg' ?
        './assets/imgs/no-foto.jpg' :
        `https://leaf-serious-chef.glitch.me/${obj.image}`;
    row.innerHTML = `
        <td class="products__id">${obj.id}</td>
        <td class="products__name">${obj.title}</td>
        <td class="products__category">${obj.category}</td>
        <td class="products__units">${obj.units}</td>
        <td class="products__count">${obj.count}</td>
        <td class="products__price">${obj.price}</td>
        <td class="products__total">${totalCount > 0 ? totalCount.toFixed(2) : 0}</td>
        <td class="products__image">
            <button class="products__btn products__image-btn products"
                type="button">
                    ${obj.image === 'image/notimage.jpg' ? noImage : isImage}
                </button>
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
    const img = createElement('img', {
        alt: 'фото товара',
        src,
    });

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

// создание ошибки при отправке формы

export const createErrorMsg = input => {
    const errorMsg = document.createElement('span');
    errorMsg.classList.add('input-error');
    input.parentElement.append(errorMsg);

    return errorMsg;
};

