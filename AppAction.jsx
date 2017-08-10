import ListStore from './ListStore.js';
import AppDispatcher from './AppDispatcher.js';
import React from 'react';

class AppActionClass extends React.Component  {  

  constructor(props){
    super(props);
  }

  removeItem(id) {    
    AppDispatcher.dispatch({
      action: 'remove-item',
      id: id
    });

  }

  updateItem(dataset) { 
    AppDispatcher.dispatch({
      action: 'update-item',
      edit_item: {
        id: dataset.id,
        name: dataset.title,
        phone: dataset.phone

      }
    });
  }


}



const AppAction = new AppActionClass();
export default AppAction;

