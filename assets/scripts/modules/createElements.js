// Создание строк с товарами, верстка

export const createRow = (obj) => {
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
        <td class="products__total">${totalCount > 0 ? totalCount : 0}</td>
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
