'use strict';

let data = [
    {
        'id': 253842678,
        'title': 'Смартфон Xiaomi 11T 8/128GB',
        'price': 27000,
        'description': 'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
        'category': 'mobile-phone',
        'discont': false,
        'count': 3,
        'units': 'шт',
        'images': {
            'small': 'img/smrtxiaomi11t-m.jpg',
            'big': 'img/smrtxiaomi11t-b.jpg',
        },
    },
    {
        'id': 296378448,
        'title': 'Радиоуправляемый автомобиль Cheetan',
        'price': 4000,
        'description': 'Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет',
        'category': 'toys',
        'discont': 5,
        'count': 1,
        'units': 'шт',
        'images': {
            'small': 'img/cheetancar-m.jpg',
            'big': 'img/cheetancar-b.jpg',
        },
    },
    {
        'id': 215796548,
        'title': 'ТВ приставка MECOOL KI',
        'price': 12400,
        'description': 'Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D',
        'category': 'tv-box',
        'discont': 15,
        'count': 4,
        'units': 'шт',
        'images': {
            'small': 'img/tvboxmecool-m.jpg',
            'big': 'img/tvboxmecool-b.jpg',
        },
    },
    {
        'id': 246258248,
        'title': 'Витая пара PROConnect 01-0043-3-25',
        'price': 22,
        'description': 'Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.',
        'category': 'cables',
        'discont': false,
        'count': 420,
        'units': 'v',
        'images': {
            'small': 'img/lan_proconnect43-3-25.jpg',
            'big': 'img/lan_proconnect43-3-25-b.jpg',
        },
    },
];

// Добавление товара в БД

const addItemData = item => {
    data.push(item);
    console.log(data);

    return data;
};

// Создание строк с товарами, верстка

const createRow = (obj) => {
    const row = document.createElement('tr');
    const totalCount = obj.price * obj.count * (1 - obj.discont / 100);
    row.className = 'table__row';
    row.innerHTML = `
        <td class="products__id">${obj.id}</td>
        <td class="products__name">${obj.title}</td>
        <td class="products__category">${obj.category}</td>
        <td class="products__units">${obj.units}</td>
        <td class="products__count">${obj.count}</td>
        <td class="products__price">${obj.price}</td>
        <td class="products__total">${totalCount}</td>
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

// Отрисовка товаров на странице

const renderGoods = (data) => {
    const tBody = document.querySelector('.table__products');
    tBody.innerHTML = '';
    data.map(item => tBody.append(createRow(item)));

    return tBody;
};

// Добавление товара в таблицу из формы

const addItemPage = (item, tBody) => {
    tBody.append(createRow(item));
};

// Подсчет общей стоимости в таблице

const countTableTotal = (array) => {
    const totalCountPage = document.querySelector('.header__total-count');

    const totalCount = array.reduce((acc, item) =>
        acc + +item.price * +item.count * (1 - +item.discont / 100), 0);

    totalCountPage.textContent = totalCount;
};

// Удаление строки из таблицы и товара из БД

const deleteRow = (tBody) => {
    tBody.addEventListener('click', e => {
        const target = e.target;
        const deleteBtn = target.closest('.products__delete-btn');
        const tableRow = target.closest('.table__row');
        const id = tableRow.children[0].textContent;
        console.log('id: ', id);

        if (deleteBtn) {
            tableRow.remove();
        }

        data = data.filter(item => +item.id !== +id);

        console.log('БД после удаления поля:', data);
    });
};

// Работа с модалкой

const controlModal = () => {
    const modalOpenBtn = document.querySelector('.tool-bar__add-button');
    const modalOverlay = document.querySelector('.overlay');

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

const blockCheckbox = () => {
    const discountCheckbox = document.querySelector('.form__checkbox');
    const discountInput = document.querySelector('.form__input_checkbox');
    discountCheckbox.checked = false;
    discountInput.disabled = true;

    return {
        discountCheckbox,
        discountInput,
    };
};

const controlCheckbox = () => {
    const {discountCheckbox, discountInput} = blockCheckbox();

    discountCheckbox.addEventListener('change', () => {
        discountInput.value = '';
        discountInput.disabled = !discountCheckbox.checked;
    });
};

// Добавление товара в модалке + добавление товара в БД,
// пересчет стоимости всей таблицы

const formControl = (form, tBody, closeModal) => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (!formData.has('discont')) {
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

//  Подсчет общей стоимости в модалке

const countModalTotal = (form) => {
    const totalCount = document.querySelector('.total__count');
    const price = document.querySelector('#price');
    const count = document.querySelector('#count');
    const discount = document.querySelector('#discont');

    let calc = 0;

    form.addEventListener('focusout', () => {
        calc = (
            price.value * count.value * (1 - discount.value / 100)
        ).toFixed(2);
        totalCount.textContent = calc > 0 ? calc : 0;
    });
};

const init = (data) => {
    const form = document.querySelector('.modal__form');
    const tBody = renderGoods(data);
    const {closeModal} = controlModal();

    formControl(form, tBody, closeModal);
    countTableTotal(data);
    deleteRow(tBody);
    controlCheckbox();
    blockCheckbox();
    countModalTotal(form);
};

init(data);
