import {renderGoods} from './modules/render.js';
import {countTableTotal} from './modules/services.js';
import {domElements} from './modules/domElements.js';
import {getGoods} from './modules/serviceAPI.js';
import {
    deleteRow,
    showImg,
    editItem,
    openModal,
} from './modules/controls.js';

const init = async () => {
    const data = await getGoods(renderGoods, countTableTotal);
    console.log('data: ', data);

    const {tBody} = domElements();
    openModal(data);
    deleteRow(data, tBody);
    editItem(tBody, data);
    showImg(tBody);
};

init();
