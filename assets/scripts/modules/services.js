import {domElements} from './domElements.js';

// Подсчет общей стоимости в таблице

export const countTableTotal = (array) => {
    const {totalCountPage} = domElements();

    const totalCount = array.reduce((acc, item) =>
        acc + +item.price * +item.count * (1 - +item.discount / 100), 0);

    totalCountPage.textContent = totalCount.toFixed(2);
};

//  Подсчет общей стоимости в модалке

export const countModalTotal = (form) => {
    const {
        totalCount,
        price,
        count,
        discount,
    } = domElements();

    let calc = 0;

    form.addEventListener('focusout', () => {
        calc = (
            price.value * count.value * (1 - discount.value / 100)
        ).toFixed(2);
        totalCount.textContent = calc > 0 ? calc : 0;
    });
};

// Универсальное создание элементов

export const createElement = (tagName, attribute) => {
    const elem = document.createElement(tagName);
    Object.assign(elem, attribute);
    return elem;
};

// Конвертация изображений в base64

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    console.log('reader: ', reader);

    reader.addEventListener('loadend', () => {
        resolve(reader.result);
        console.log('reader.result: ', reader.result);
    });

    reader.addEventListener('error', err => {
        reject(err);
    });

    reader.readAsDataURL(file);
});


