import { createSelector } from 'reselect';

const initialState = {
    isModalOpen: false,
    modalData: {}
};

const modal = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return ({
                ...state,
                isModalOpen: true,
                modalData: action.payload
            });
        case 'CLOSE_MODAL':
            return ({
                ...state,
                isModalOpen: false,
                modalData: {}
            });
        default:
            return state;
    }
};

const modalSelector = state => state.modal;

export const isModalOpen = createSelector(
    modalSelector,
    modal => modal.isModalOpen
);

export const modalData = createSelector(
    modalSelector,
    modal => modal.modalData
);

export default modal;