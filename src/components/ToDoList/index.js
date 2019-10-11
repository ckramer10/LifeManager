import React,{ useEffect } from 'react';
import styles from './__styles__/toDoList.module.scss';
import { connect } from "react-redux";
import { todosRef } from "../../firebase";
import { getToDoList, didToDoListLoad } from "../../redux/reducers/toDoListReducer";
import { Spinner } from 'reactstrap';
import ListItem from '../ListItem';
import { fetchToDoList } from "../../utils/dataFetcher";

const ToDoList = ({ addToDoItem, setToDoItems, toDoList, didToDoListLoad }) => {

    useEffect( () => {
        fetchToDoList(setToDoItems);
    },[]);

    let mockData = [{
        value: 'Task 1',
        isComplete: false,
        itemkey: 0,
        timestamp: Date.now()
    }];

    const addTodo = (event) => {
        event.preventDefault();
        const addTime = Date.now();
        let toDoObj = {
            value: event.target.toDo.value,
            isComplete: false,
            timestamp: Date.now(),
            itemKey: toDoList.length
        };
        todosRef.child(`${addTime}`).set(toDoObj, (error) => {
            if (error) {
                console.error("Error Adding ToDo Item");
            } else {
                addToDoItem(toDoObj);
                console.log('Successfully Added Task')
            }
        });
        event.target.toDo.value = "";
    };

    const buildList = (isComplete) => {
        let filteredList = toDoList.filter(item => {
           return item.isComplete === isComplete
        });

        let listItems = filteredList.map(item => {
            return(
                <ListItem
                    itemKey={item.itemKey}
                    key={item.itemKey}
                    timestamp={item.timestamp}
                    value={item.value}
                    isComplete={item.isComplete}
                />
            );
        });

        if (listItems.length === 0) {
            const message = !isComplete ? 'All Good!' : 'No Recently Completed Tasks';
            return <h3>{message}</h3>
        }

        return(
            <div className={styles.listItems}>
                {listItems}
            </div>
        )
    };

    if (!didToDoListLoad) {
        return(
            <div className={styles.spinnerWrapper}>
                <Spinner className={styles.spinner} color="light" />
            </div>
        );
    }

    return(
        <div className={styles.listWrapper}>
            <div className={styles.addTodoFormWrapper}>
                <form className={styles.addTodoForm} onSubmit={addTodo}>
                    <input type="text" name="toDo" placeholder="Add New Task..."/>
                    <button type="submit" >Add Todo</button>
                </form>
            </div>
           <div className={styles.incompleteListWrapper}>
               <h3 className={styles.incompleteHeader}>Incomplete:</h3>
               {buildList(false)}
           </div>
           <div className={styles.incompleteListWrapper}>
               <h3>Complete:</h3>
               {buildList(true)}
           </div>
        </div>
    );
};
const mapStateToProps = state => {
    return({
        toDoList: getToDoList(state),
        didToDoListLoad: didToDoListLoad(state)
    });
};

const mapDispatchToProps = dispatch => {
    return({
        addToDoItem: (value) => dispatch({ type: 'ADD_TODO', payload: value}),
        setToDoItems: (items) => dispatch({ type: 'SET_TODOS', payload: items})
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ToDoList));