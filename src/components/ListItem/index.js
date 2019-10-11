import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './__styles__/listItem.module.scss';
import classnames from 'classnames';
import { todosRef } from "../../firebase";
import { getToDoList } from "../../redux/reducers/toDoListReducer";
const cloneDeep = require('clone-deep');

const ListItem = ({value, timestamp, isComplete, itemKey, toDoList, updateToDoList, toggleModalOpen}) => {
  const timeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  const onComplete = () => {
      const newObj = {
          itemKey,
          value,
          timestamp,
          isComplete: !isComplete
      };
      todosRef.child(`${timestamp}`).set(newObj, (error) => {
          if (error) {
              console.error("Error Completing ToDo Item");
          } else {
              console.log('Successfully Completed Task');
              let copy = cloneDeep(toDoList);
              copy[itemKey].isComplete = !isComplete;
              updateToDoList(copy);
          }
      });
  };

    const onDelete = () => {
        todosRef.child(`${timestamp}`).remove((error) => {
            if (error) {
                console.error("Error Deleting ToDo Item");
            } else {
                console.log('Successfully Deleted Task');
                let copy = cloneDeep(toDoList);
                copy = copy.filter(item => {
                   return item.timestamp !== timestamp;
                });
                updateToDoList(copy);
            }
        });
    };

    const onTaskClick = () => {
        const itemInfo = {
            itemKey,
            value,
            timestamp,
            isComplete
        };
        toggleModalOpen(itemInfo);
    };

  return(
      <div onClick={() => onTaskClick()} className={classnames(styles.listItem, { [styles.complete] : isComplete})}>
          <div className={styles.textWrapper}>
              <h3 className={styles.task}>{value}</h3>
              <p className={styles.timestamp}>Added on {new Date(timestamp).toLocaleDateString("en-US", timeOptions)}</p>
          </div>
      </div>
  )
};

const mapDispatchToProps = dispatch => {
    return({
        updateToDoList: (updatedVal) => dispatch({ type: 'UPDATE_TODOS', payload: updatedVal}),
        toggleModalOpen: (payload) => dispatch({ type: 'OPEN_MODAL', payload})
    })
};

const mapStateToProps = state => {
    return({
        toDoList: getToDoList(state)
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ListItem));