import React, {Component, Fragment} from 'react';

class ToDoItem extends Component {

    onChangeCheckBox = (id) => (e) => {
        const {onChecked} = this.props;
        onChecked(e.target.checked, id);
    };


    onEditableChange = (id) => (e) => {
        const {editableChange} = this.props;
        editableChange(id, e)
    };

    saveEdited = (id) => (e) => {
        const {onSaveEdited} = this.props;
        onSaveEdited(e, id)
    };

    moveCaretAtEnd = (e) => {
        let temp_value = e.target.value;
        e.target.value = "";
        e.target.value = temp_value;
    };


    onClickRemoveButton = (id) => () => {
        const {onRemove} = this.props;
        onRemove(id);
    };

    render() {
        const {editableId, inputChangeBlur, toDoList, setEditableId} = this.props;
        return (
            toDoList.map((item) => (
                    <li className={'to-do-paragraph'} key={item.id}>

                        <input type="checkbox" checked={item.check} className={'checkbox'}
                               onChange={this.onChangeCheckBox(item.id)}
                        />
                        {
                            editableId === item.id ? <input type='text'
                                                            className={'editable-input'}
                                                            value={item.value}
                                                            onChange={this.onEditableChange(item.id)}
                                                            onBlur={inputChangeBlur(item.id)}
                                                            onKeyPress={this.saveEdited(item.id)}
                                                            autoFocus
                                                            onFocus={this.moveCaretAtEnd}
                                                            maxLength={'450px'}
                                /> :
                                <lable onDoubleClick={setEditableId(item.id, item.value)}
                                >{item.value}</lable>
                        }
                        <input type="button" className={'removeButton'} value={'X'}
                               onClick={this.onClickRemoveButton(item.id)}
                        />
                    </li>
                )
            )
        )
    }
}

export default ToDoItem;