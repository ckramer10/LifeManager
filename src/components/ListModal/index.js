import React from 'react';
import styles from'./__styles__/modal.module.scss';
import { connect } from 'react-redux';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import { isModalOpen, modalData } from "../../redux/reducers/modalReducer";
import {todosRef} from "../../firebase";
import { getToDoList } from "../../redux/reducers/toDoListReducer";
const cloneDeep = require('clone-deep');

const ListModal = ({ isModalOpen, modalData, toDoList, toggleModalClosed, updateToDoList }) => {

    const timeOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const onComplete = () => {
        const newObj = {
            itemKey: modalData.itemKey,
            value: modalData.value,
            timestamp: modalData.timestamp,
            isComplete: !modalData.isComplete
        };
        todosRef.child(`${modalData.timestamp}`).set(newObj, (error) => {
            if (error) {
                console.error("Error Completing ToDo Item");
            } else {
                console.log('Successfully Completed Task');
                let copy = cloneDeep(toDoList);
                copy[modalData.itemKey].isComplete = !modalData.isComplete;
                updateToDoList(copy);
                toggleModalClosed();
            }
        });
    };

    const onDelete = () => {
        todosRef.child(`${modalData.timestamp}`).remove((error) => {
            if (error) {
                console.error("Error Deleting ToDo Item");
            } else {
                console.log('Successfully Deleted Task');
                let copy = cloneDeep(toDoList);
                copy = copy.filter(item => {
                    return item.timestamp !== modalData.timestamp;
                });
                updateToDoList(copy);
                toggleModalClosed();
            }
        });
    };

    const closeModal = () => {
        toggleModalClosed();
    };

    return(
        <div>
            <Modal className={styles.modalWrapper} isOpen={isModalOpen}>
                <ModalHeader>{new Date(modalData.timestamp).toLocaleDateString("en-US", timeOptions)}</ModalHeader>
                <ModalBody>
                    {modalData.value}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => onComplete()}>{ modalData.isComplete ? 'Re-Open' : 'Complete'}</Button>
                    <Button color="danger" onClick={() => onDelete()} >Delete</Button>
                    <Button onClick={() => closeModal()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return({
        isModalOpen: isModalOpen(state),
        modalData: modalData(state),
        toDoList: getToDoList(state)
    });
};

const mapDispatchToProps = dispatch => {
    return({
        toggleModalClosed: () => dispatch({ type: 'CLOSE_MODAL'}),
        updateToDoList: (updatedVal) => dispatch({ type: 'UPDATE_TODOS', payload: updatedVal})
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ListModal));