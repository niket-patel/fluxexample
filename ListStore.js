// ListStore.js
import {EventEmitter} from 'events';
import _ from 'lodash';

let ListStore = _.extend({}, EventEmitter.prototype, {

  // Mock default data
  items: [  {"id":10,"name":"niket"},
			{"id":11,"name":"patel"}
  ],

  // Get all items
  getItems: function(){
    return this.items;
  },

  // Add item
  addItem: function(new_item){
    this.items.push(new_item);
  },
  // Edit item
  updateItem: function(edit_item){
    //this.items.push(new_item);
    console.log('editItem::store:id:'+edit_item.id);
    console.log('editItem::store:name:'+edit_item.name);
    var index = this.find(edit_item.id);
    console.log('editItem::store:index:'+index);
    this.items[index]=edit_item;
  },

  find: function (id) {
    var id = parseInt(id);
    var found = undefined;
    this.items.some(function (item, i) {
      if (item.id === id) found = i;
    });
    return found;
  },
  // Remove item
  removeItem: function(item_id){
 
    var index = this.find(item_id);
    console.log('editItem::store:index:'+index);
    return this.items.splice(index,1);

  },

  // Emit Change event
  emitChange: function(){
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback){
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback){
    this.removeListener('change', callback);
  }

});

export default ListStore;