import {addItemPage} from './render.js';
import {countTableTotal} from './services.js';
import {data} from '../main.js';
import {domElements} from './domElements.js';
import {createImg} from './createElements.js';

// Работа с модалкой

export const controlModal = () => {
    const {modalOpenBtn, modalOverlay} = domElements();

    const openModal = () => {
        modalOverlay.classList.add('modal-visible');
    };

    const closeModal = () => {
        modalOverlay.classList.remove('modal-visible');
    };

    modalOpenBtn.addEventListener('click', () => {
        openModal();
    });

    modalOverlay.addEventListener('click', (e) => {
        const target = e.target;
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

const addItemData = item => {
    data.push(item);
    console.log(data);

    return data;
};

// Добавление товара в модалке + добавление товара в БД,
// пересчет стоимости всей таблицы

export const formControl = (form, tBody, closeModal) => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (!formData.has('discont') || formData.get('discont') > 100) {
            formData.set('discont', 0);
        }
        if (!formData.has('id')) {
            formData.set('id', Math.round(Math.random() * 1e9));
        }

        const newItem = Object.fromEntries(formData);

        const newData = addItemData(newItem);
        console.log('newData: ', newData);
        addItemPage(newItem, tBody);
        countTableTotal(newData);
        form.reset();
        closeModal();
        blockCheckbox();
    });
};

// Удаление строки из таблицы и товара из БД

export const deleteRow = (data, tBody) => {
    tBody.addEventListener('click', e => {
        const target = e.target;
        const deleteBtn = target.closest('.products__delete-btn');
        const tableRow = target.closest('.table__row');
        const id = tableRow.children[0].textContent;
        console.log('id: ', id);

        if (deleteBtn) {
            tableRow.remove();
            data = data.filter(item => +item.id !== +id);

            console.log('БД после удаления поля:', data);

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
