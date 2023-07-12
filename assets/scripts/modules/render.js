import {createRow} from './createElements.js';
import {domElements} from './domElements.js';

// Отрисовка товаров на странице

export const renderGoods = (data) => {
    const {tBody} = domElements();
    tBody.innerHTML = '';
    data.map(item => tBody.append(createRow(item)));

    return tBody;
};

// Добавление товара в таблицу из формы

export const addItemPage = (item, tBody) => {
    tBody.append(createRow(item));
};
