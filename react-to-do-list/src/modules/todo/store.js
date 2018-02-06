import Dispatcher from '../Dispatcher';
import StoreEventBus from '../StoreEventBus';
import * as actionTypes from './actionTypes';

let store = {
    toDoList: [],
    filter: 'all',
    editableId: null,
    editableText: '',
};

const getState = () => {
    return store;
};

Dispatcher.register(payload => {
    switch (payload.type) {
        case actionTypes.ADD_TODO:
            const prevList = store.toDoList;
            store.toDoList = [
                ...prevList,
                {
                    value: payload.value,
                    check: false,
                    id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
                }
            ];
            break;

        case actionTypes.ON_CHECKED:
            store.toDoList = store.toDoList.map((item, i) => (item.id === payload.id) ?
                ({value: item.value, check: payload.checked, id: payload.id}) : item);
            break;

        case actionTypes.ON_REMOVE:
            store.toDoList = store.toDoList.filter((item) => item.id !== payload.id);
            break;

        case actionTypes.ON_CLICK_TOGGLE:
            const isUnchecked = store.toDoList.some((item) => item.check === false);
            store.toDoList = store.toDoList.map((item) => ({value: item.value, check: isUnchecked, id: item.id}));
            break;

        case actionTypes.SET_FILTER:
            store.filter = payload.filter;
            break;

        case actionTypes.CLEAR_COMPLETED:
            store.toDoList = store.toDoList.filter((item) => !item.check);
            store.filter = 'all';
            break;

        case actionTypes.SET_EDITABLE_ID:
            store.editableId = payload.id;
            store.editableText = payload.originText;
            break;

        case actionTypes.EDITABLE_CHANGE:
            store.toDoList = store.toDoList.map((item) => (item.id === payload.id) ?
                {value: payload.e.target.value, check: item.check, id: payload.id} : item);
            break;

        case actionTypes.INPUT_CHANGE_BLUR:
            store.editableText = store.toDoList.map((item) => item.id === payload.id ? item.value = store.editableText : item);
            store.editableId = null;
            break;

        case actionTypes.SAVE_EDITED:
            if (payload.e.key === 'Enter' && payload.e.target.value.length !== 0) {
                store.editableId = null;
            } else if (payload.e.key === 'Enter' && payload.e.target.value.length === 0) {
                store.toDoList = store.toDoList.filter((item) => item.id !== payload.id);
                store.editableId = null
            }
            break;

        default:
            return false;
    }
    StoreEventBus.dispatch({
        event: 'change'
    });

});

export default getState;
