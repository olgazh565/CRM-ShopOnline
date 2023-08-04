import {addItemPage} from './render.js';
import {countTableTotal} from './services.js';
import {domElements} from './domElements.js';
import {deleteGoods, sendNewItem} from './serviceAPI.js';
import {
    createErrorPopup,
    createImg,
    createSuccessMsg,
} from './createElements.js';

// Показать сообщение об успешной отправке

export const controlSuccessMsg = () => {
    const msg = createSuccessMsg();
    msg.classList.add('show');

    setTimeout(() => {
        msg.classList.remove('show');
        msg.remove();
    }, 3000);
};

// Управление сообщением от ошибке

export const controlErrorMessage = (error, message) => {
    const {formFieldset, formSubmitBtn, modalOverlay} = domElements();
    const errorPopup = createErrorPopup(error, message);

    const showErrorMessage = () => {
        modalOverlay.classList.add('is-error');
        formFieldset.disabled = true;
        formSubmitBtn.disabled = true;
    };

    showErrorMessage();

    const closeErrorPopup = () => {
        modalOverlay.classList.remove('is-error');
        formFieldset.disabled = false;
        formSubmitBtn.disabled = false;
    };

    errorPopup.addEventListener('click', ({target}) => {
        if (target.closest('.error__close-btn')) {
            closeErrorPopup();
            errorPopup.remove();
        }
    });
};

// Работа с модалкой

export const controlModal = () => {
    const {modalOpenBtn, modalOverlay} = domElements();

    const openModal = () => {
        modalOverlay.classList.add('modal-visible');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modalOverlay.classList.remove('modal-visible');
        document.body.style.overflow = '';
    };

    modalOpenBtn.addEventListener('click', () => {
        openModal();
    });

    modalOverlay.addEventListener('click', ({target}) => {
        if (modalOverlay.classList.contains('is-error')) {
            return;
        }

        if (target === modalOverlay ||
            target.closest('.modal__close-btn')) {
            closeModal();
        }
    });

    return {
        closeModal,
    };
};

// Управление чекбоксом

export const blockCheckbox = () => {
    const {discountCheckbox, discountInput} = domElements();

    discountCheckbox.checked = false;
    discountInput.disabled = true;

    return {
        discountCheckbox,
        discountInput,
    };
};

export const controlCheckbox = () => {
    const {discountCheckbox, discountInput} = blockCheckbox();

    discountCheckbox.addEventListener('change', () => {
        discountInput.value = '';
        discountInput.disabled = !discountCheckbox.checked;
    });
};

// Добавление товара в БД

export const addItemData = (data, item) => {
    data.push(item);

    return data;
};

// Добавление товара в модалке

export const formControl = (data, form, closeModal) => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newItem = Object.fromEntries(formData);

        const success = await sendNewItem(
                data,
                newItem,
                addItemPage,
                addItemData,
                closeModal,
                controlSuccessMsg,
                controlErrorMessage,
        );

        form.reset();

        if (success) countTableTotal(data);
    });
};

// Удаление строки из таблицы и товара из БД

export const deleteRow = (data, tBody) => {
    tBody.addEventListener('click', async (e) => {
        const target = e.target;
        const deleteBtn = target.closest('.products__delete-btn');
        const tableRow = target.closest('.table__row');
        const id = tableRow.cells[0].textContent;
        console.log('id: ', id);

        if (deleteBtn) {
            const success = await deleteGoods(id);

            if (!success) return;

            tableRow.remove();
            const index = data.findIndex(item => item.id === id);
            data.splice(index, 1);
            countTableTotal(data);
        }
    });
};

// Показать картинку в новом окне

const openNewWindow = (src, width, height) => {
    const top = screen.height / 2 - height / 2;
    const left = screen.width / 2 - width / 2;

    const newWindow = window.open(
            src, '', `width=600,height=600,top=${top},left=${left}`);

    const img = createImg(src);

    newWindow.document.body.append(img);
};

export const showImg = (tBody) => {
    tBody.addEventListener('click', (e) => {
        const target = e.target;
        const imgShowBtn = target.closest('.products__image-btn');
        const tableRow = target.closest('.table__row');

        if (imgShowBtn) {
            openNewWindow(tableRow.dataset.pic, 600, 600);
        }
    });
};
