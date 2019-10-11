import {todosRef} from "../firebase";

export const fetchToDoList = async (setToDoItems) => {
    await todosRef.once('value').then(snapshot => {
        let list = [];
        let listObj;
        listObj = snapshot.val();
        if (listObj) {
            let keys = Object.keys(listObj);
            for (let i = 0; i < keys.length; i++) {
                list.push(listObj[keys[i]]);
            }
            setToDoItems(list);
        }
    });
};