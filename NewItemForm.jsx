// NewItemForm.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import AppDispatcher from './AppDispatcher';

class NewItemForm extends React.Component {

  createItem(e){
    
    // so we don't reload the page
    e.preventDefault();
    
    // create ID
    let id = guid();
    
    // this gets the value from the input
    let item_title = ReactDOM.findDOMNode(this.refs.item_title).value.trim();
    
    // this removes the value from the input
    ReactDOM.findDOMNode(this.refs.item_title).value = '';
    
    // This is where the magic happens, 
    // no need to shoot this action all the way to the root of your application to edit state.
    // AppDispatcher does this for you.
    AppDispatcher.dispatch({
      action: 'add-item',
      new_item: {
        id: id,
        name: item_title
      }
    });

  }

  render(){

    return <form onSubmit={ this.createItem.bind(this) }>
        <input type="text" ref="item_title"/>
        <button>Add new item</button>
      </form>;
  }
}

function guid() {
    return new Date().getTime();
}

export default NewItemForm;