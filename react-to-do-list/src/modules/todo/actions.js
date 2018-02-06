import Dispatcher from '../Dispatcher';
import * as actionTypes from './actionTypes';

export const addTodo = value => {
    return Dispatcher.dispatch({
        type: actionTypes.ADD_TODO,
        value,
    });
};


export const onChecked = (checked, id) =>{
    return Dispatcher.dispatch({
        type: actionTypes.ON_CHECKED,
        checked,
        id,
    })
};

export  const  onRemove = id => {
    return Dispatcher.dispatch({
        type: actionTypes.ON_REMOVE,
        id,
    })
};

export const onClickToggle = () =>{
    return Dispatcher.dispatch({
        type: actionTypes.ON_CLICK_TOGGLE,
    })
};

export const  setFilter = filter =>{
    return Dispatcher.dispatch({
        type: actionTypes.SET_FILTER,
        filter
    })
};

export const clearCompleted = () =>{
    return Dispatcher.dispatch({
        type: actionTypes.CLEAR_COMPLETED,
    })
};

export const setEditableId = (id, originText) =>{
    return Dispatcher.dispatch({
        type: actionTypes.SET_EDITABLE_ID,
        id,
        originText,
    })
};

export const editableChange = (id, e) =>{
    return Dispatcher.dispatch({
        type: actionTypes.EDITABLE_CHANGE,
        id,
        e,
    })
};

export  const inputChangeBlur  = (id) => {
    return Dispatcher.dispatch({
        type: actionTypes.INPUT_CHANGE_BLUR,
        id,
    })
};

export const saveEdited = (e,id) =>{
    return Dispatcher.dispatch({
        type: actionTypes.SAVE_EDITED,
        e,
        id,
    })
};