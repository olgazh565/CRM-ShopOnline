export const domElements = () => {
    const form = document.querySelector('.modal__form');
    const formFieldset = document.querySelector('.form__fieldset');
    const totalCountPage = document.querySelector('.header__total-count');
    const totalCount = document.querySelector('.total__count');
    const price = document.querySelector('#price');
    const count = document.querySelector('#count');
    const discount = document.querySelector('#discount');
    const modalOpenBtn = document.querySelector('.tool-bar__add-button');
    const formSubmitBtn = document.querySelector('.form__add-button');
    const modalOverlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal');
    const discountCheckbox = document.querySelector('.form__checkbox');
    const discountInput = document.querySelector('.form__input_checkbox');
    const tBody = document.querySelector('.table__products');
    const errorPopup = document.querySelector('.modal__error');
    const errorText = document.querySelector('.error__text');
    const errorMessage = document.querySelector('.error__message');

    return {
        form,
        formFieldset,
        totalCountPage,
        totalCount,
        price,
        count,
        discount,
        modalOpenBtn,
        formSubmitBtn,
        modalOverlay,
        modal,
        discountCheckbox,
        discountInput,
        tBody,
        errorPopup,
        errorText,
        errorMessage,
    };
};
