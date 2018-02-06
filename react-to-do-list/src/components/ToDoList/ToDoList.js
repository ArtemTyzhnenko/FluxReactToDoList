import React, {Component, Fragment} from 'react';
import ToDoItem from './components/ToDoItem/ToDoItem'

const ToDoList = ({
                      toDoList,
                      onClickToggle,
                      hasToDo,
                      onSaveEdited,
                      onChecked,
                      editableChange,
                      setEditableId,
                      onRemove,
                      active,
                      editableId,
                      inputChangeBlur,
                  }) =>
    (hasToDo) ? (
        <ul className={'list-of-todo'}>
            <button className="toggle-all" type="button" onClick={onClickToggle}/>
            <ToDoItem
                active={active}
                onSaveEdited={onSaveEdited}
                onChecked={onChecked}
                editableChange={editableChange}
                setEditableId={setEditableId}
                onRemove={onRemove}
                toDoList={toDoList}
                onClickRemoveButton={onRemove}
                editableId={editableId}
                inputChangeBlur={inputChangeBlur}
            />
        </ul>
    ) : null;


export default ToDoList;