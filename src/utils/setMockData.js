import { todosRef } from "../firebase";

const setMockData = () => {
    let toDoObj = {
        value: 'Test 1',
        isComplete: false,
        timestamp: Date.now(),
        itemKey: 0
    };

    todosRef.child(`${toDoObj.timestamp}`).set(toDoObj, (error) => {
        if (error) {
            console.error("Error Adding ToDo Item");
        } else {
            console.log('Successfully Added Task');
        }
    });
};

setMockData();