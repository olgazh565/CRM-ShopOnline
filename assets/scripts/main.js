'use strict';

const goodsArray = [
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

const createRow = (obj) => {
    const row = document.createElement('tr');
    row.className = 'table__row';
    row.innerHTML = `
        <td class="products__id">${obj.id}</td>
        <td class="products__name">${obj.title}</td>
        <td class="products__category">${obj.category}</td>
        <td class="products__units">${obj.units}</td>
        <td class="products__count">${obj.count}</td>
        <td class="products__price">${obj.price}</td>
        <td class="products__total">${obj.price * obj.count}</td>
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

const renderGoods = (objArray) => {
    const tBody = document.querySelector('.table__products');
    objArray.map(item => tBody.append(createRow(item)));

    return tBody;
};

// Работа с модалкой

const controlModal = () => {
    const modalOpenBtn = document.querySelector('.tool-bar__add-button');
    const modalOverlay = document.querySelector('.overlay');

    modalOpenBtn.addEventListener('click', () => {
        modalOverlay.classList.add('modal-visible');
    });

    modalOverlay.addEventListener('click', (e) => {
        const target = e.target;
        if (target === modalOverlay ||
            target.closest('.modal__close-btn')) {
            modalOverlay.classList.remove('modal-visible');
        }
    });
};

controlModal();

// Удаление строк

const deleteRow = (array) => {
    const tBody = renderGoods(array);

    tBody.addEventListener('click', e => {
        const target = e.target;
        const deleteBtn = target.closest('.products__delete-btn');
        const tableRow = target.closest('.table__row');
        const id = +tableRow.children[0].textContent;

        if (deleteBtn) {
            tableRow.remove();
        }

        array = array.filter(item => item.id !== id);

        console.log('БД после удаления поля:', array);
    });
};

deleteRow(goodsArray);

