// AppRoot.jsx
import React from 'react';
import ListStore from './ListStore.js';
import AppDispatcher from './AppDispatcher.js';
import NewItemForm from './NewItemForm.jsx';


class AppRoot extends React.Component {

  constructor() {
    super();
    this.state = {
      editMode: false,
      editId: null
    }
    this.editItem = this.editItem.bind(this);
    this.renderForm = this.renderForm.bind(this);    
    this.renderItem = this.renderItem.bind(this);
    this.renderEditItem = this.renderEditItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.updateTextValue = this.updateTextValue.bind(this);
  }

  // Method to setState based upon Store changes
  _onChange() {
    this.setState(getListState());
  }
  // Add change listeners to stores
  componentDidMount() {
    ListStore.addChangeListener(this._onChange.bind(this));
  }
  // Remove change listeners from stores
  componentWillUnmount() {
    ListStore.removeChangeListener(this._onChange.bind(this));
  }
  removeItem(e) {
    let id = e.target.dataset.id;

    AppDispatcher.dispatch({
      action: 'remove-item',
      id: id
    });

  }
  updateItem(event) {
    event.preventDefault();
    let item_id = event.target.dataset.id;
    let item_title = event.target.dataset.title;
    this.setState({ editMode: false, editId:null });

    AppDispatcher.dispatch({
      action: 'update-item',
      edit_item: {
        id: item_id,
        name: item_title
      }
    });
  }
  updateTextValue(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log('updateTextValue:name:' + name + ':value' + value);
  }
  editItem(e) {
    
    let item_id = e.target.dataset.id;
    let item_title = e.target.dataset.title;
    console.log('editItem:item_id:' + item_id + ':item_title' + item_title);
    this.setState({ editMode: true, editId: item_id });


  }
  renderEditItem(listItem) {
    let _this = this;
    return <li key={listItem.id}>
      <input type="text" name={listItem.name} value={listItem.name} onChange={this.updateTextValue} />
      <button onClick={_this.removeItem} data-id={listItem.id}>Delete</button>
      <button onClick={_this.updateItem} data-id={listItem.id} data-title={listItem.name} >Update</button>
    </li>;
  }
  renderItem(listItem) {
    let _this = this;
    return <li key={listItem.id}>
      {listItem.name} <button onClick={_this.removeItem} data-id={listItem.id}>Delete</button>
      <button onClick={_this.editItem} data-id={listItem.id} data-title={listItem.name} >Edit</button>
    </li>;
  }
  renderForm() {

    let items = ListStore.getItems();
    let itemHtml = items.map((listItem) => {
      if (listItem.id == this.state.editId) {
        return this.renderEditItem(listItem);
      } else {
        return this.renderItem(listItem);
      }

    });

    return itemHtml;
  }

  render() {
let itemHtml = this.renderForm();

    return <div>
      <ul>
        {itemHtml}
      </ul>
      <NewItemForm />

    </div>;
  }

}

// Method to retrieve state from Stores
let getListState = () => {
  return {
    items: ListStore.getItems()
  };
}

export default AppRoot;