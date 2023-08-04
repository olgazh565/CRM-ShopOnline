import {API_URL} from './const.js';

// Получение данных о товарах с сервера

export const getGoods = async (renderGoods, countTableTotal) => {
    try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();

        renderGoods(data);
        countTableTotal(data);

        return data;
    } catch (err) {
        console.error(err);
    }
};

// Добавление нового товара

export const sendNewItem = async (
        data,
        item,
        addItemPage,
        addItemData,
        closeModal,
        controlSuccessMsg,
        controlErrorMessage,
) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(item),
        });

        if (response.ok) {
            const itemData = await response.json();
            console.log('itemData: ', itemData);

            addItemPage(itemData);
            addItemData(data, itemData);
            closeModal();
            controlSuccessMsg();
        } else {
            throw new Error(response.status);
        }
        return response.ok;
    } catch (err) {
        controlErrorMessage(err.message);
    }
};

// Удаление товара

export const deleteGoods = async (id) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers,
        });

        return response.ok;
    } catch (err) {
        console.log(err);
    }
};
