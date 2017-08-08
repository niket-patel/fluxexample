// AppDispatcher.js 
import { Dispatcher } from 'flux';
let AppDispatcher = new Dispatcher();

import ListStore from './ListStore';

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {

  let action = payload.action;
  let new_item = payload.new_item;
  let edit_item = payload.edit_item;
  let id = payload.id;

  switch (action) {

    // Respond to add-item action
    case 'add-item':
      ListStore.addItem(new_item);
      break;

    // Respond to remove-item action
    case 'remove-item':
      ListStore.removeItem(id);
      break;

    // Respond to update-item action
    case 'update-item':
      ListStore.updateItem(edit_item);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  ListStore.emitChange();

  return true;

});

export default AppDispatcher;