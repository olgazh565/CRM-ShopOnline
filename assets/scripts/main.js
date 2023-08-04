import {renderGoods} from './modules/render.js';
import {countModalTotal, countTableTotal} from './modules/services.js';
import {domElements} from './modules/domElements.js';
import {getGoods} from './modules/serviceAPI.js';
import {
    controlModal,
    controlCheckbox,
    formControl,
    deleteRow,
    showImg,
} from './modules/controls.js';

const init = async () => {
    const data = await getGoods(renderGoods, countTableTotal);
    console.log('data: ', data);

    const {form, tBody} = domElements();
    const {closeModal} = controlModal();

    deleteRow(data, tBody);
    formControl(data, form, closeModal);
    controlCheckbox();
    countModalTotal(form);
    showImg(tBody);
};

init();
