// AppRoot.jsx
import React from 'react';
import ListStore from './ListStore.js';
import AppDispatcher from './AppDispatcher.js';
import NewItemForm from './NewItemForm.jsx';
import AppAction from './AppAction.jsx';


class AppRoot extends React.Component {

  constructor() {
    super();
    this.state = {
      editMode: false,
      editId: null,
      items : ListStore.getItems()
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
    AppAction.removeItem(id);
  }
  updateItem(event) {
    event.preventDefault();    
    this.setState({ editMode: false, editId:null });
    AppAction.updateItem(event.target.dataset);
    
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
  renderEditItem(item) {
    let _this = this;
    return <li key={item.id}>
      <input type="text" name={item.name} value={item.name} onChange={this.updateTextValue} />
      <button onClick={_this.removeItem} data-id={item.id}>Delete</button>
      <button onClick={_this.updateItem} data-id={item.id} data-title={item.name} >Update</button>
    </li>;
  }
  renderItem(item) {
    let _this = this;
    return <li key={item.id}>
      {item.name} <button onClick={_this.removeItem} data-id={item.id}>Delete</button>
      <button onClick={_this.editItem} data-id={item.id} data-title={item.name} >Edit</button>
    </li>;
  }
  renderForm() {

    //let items = ListStore.getItems();
    let itemHtml = this.state.items.map((item) => {
      if (item.id == this.state.editId) {
        return this.renderEditItem(item);
      } else {
        return this.renderItem(item);
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