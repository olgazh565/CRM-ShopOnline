export const domElements = () => {
    const form = document.querySelector('.modal__form');
    const totalCountPage = document.querySelector('.header__total-count');
    const totalCount = document.querySelector('.total__count');
    const price = document.querySelector('#price');
    const count = document.querySelector('#count');
    const discount = document.querySelector('#discont');
    const modalOpenBtn = document.querySelector('.tool-bar__add-button');
    const modalOverlay = document.querySelector('.overlay');
    const discountCheckbox = document.querySelector('.form__checkbox');
    const discountInput = document.querySelector('.form__input_checkbox');
    const tBody = document.querySelector('.table__products');

    return {
        form,
        totalCountPage,
        totalCount,
        price,
        count,
        discount,
        modalOpenBtn,
        modalOverlay,
        discountCheckbox,
        discountInput,
        tBody,
    };
};
