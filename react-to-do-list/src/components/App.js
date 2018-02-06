import React, {Component, Fragment} from 'react';

import './App.css';

import ToDoList from './ToDoList/ToDoList';
import ToDoFooter from './ToDoFooter/ToDoFooter';
import {
    addTodo,
    onChecked,
    onRemove,
    onClickToggle,
    setFilter,
    clearCompleted,
    editableChange,
    setEditableId,
    inputChangeBlur,
    saveEdited,
} from '../modules/todo/actions';

import StoreEventBus from '../modules/StoreEventBus';

import getState from '../modules/todo/store';

class App extends Component {

    state = {
        ...getState(),
        value: ''
    };

    componentDidMount() {
        StoreEventBus.register(payload => {
            if (payload.event) {
                this.setState(getState());
            }
        })
    }

    filters = {
        all: (list) => list,
        completed: (list) => list.filter((item) => item.check),
        active: (list) => list.filter((item) => !item.check),
    };

    filterTodos = (optionalFilter) => {
        const {toDoList} = this.state;
        return this.filters[optionalFilter](toDoList);
    };

    onSetFilter = (filter) => () => {
        setFilter(filter)
    };

    onSetEditableId = (id, originText) => () => {
        setEditableId(id, originText);
    };

    onInputChangeBlur = (id) => () => {
        inputChangeBlur(id);
    };

    onInputChange = (e) => this.setState({value: e.target.value});

    onSaveTodo = (e) => {
        const {value} = this.state;
        if (!!value.trim() && e.keyCode === 13) {
            addTodo(value);
            this.clearInput();
        }
    };

    clearInput = () => this.setState({value: ''});

    render() {
        const {value, toDoList, editableId, filter, active, id} = this.state;
        const list = this.filterTodos(filter);
        const hasToDo = !!toDoList.length;
        const counter = this.filterTodos('active').length;

        return (
            <Fragment>
                <h1>todos</h1>
                <input type="text"
                       placeholder={'What needs to be done?'}
                       className={'add-input'}
                       onChange={this.onInputChange}
                       onKeyDown={this.onSaveTodo}
                       value={value}
                       maxLength={'450px'}
                />
                <ToDoList toDoList={list}
                          onChecked={onChecked}
                          onRemove={onRemove}
                          onClickToggle={onClickToggle}
                          hasToDo={hasToDo}
                          setEditableId={this.onSetEditableId}
                          editableId={editableId}
                          inputChangeBlur={this.onInputChangeBlur}
                          editableChange={editableChange}
                          onSaveEdited={saveEdited}
                          active={active}
                          id={id}
                />
                <ToDoFooter hasToDo={hasToDo}
                            clearCompleted={clearCompleted}
                            onSetFilter={this.onSetFilter}
                            counter={counter}
                            filter={filter}
                />
            </Fragment>
        );
    }
}

export default App;