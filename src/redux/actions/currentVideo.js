import * as actionType from "../actionTypes";

export const AddVideoIsInViewAction = (payload) => {
  return {
    type: actionType.ADD_ELEMENT_TO_VIEWPORT,
    payload,
  };
};

export const RemoveVideoIsNotInViewAction = (payload) => {
  return {
    type: actionType.REMOVE_ELEMENT_TO_VIEWPORT,
    payload,
  };
};
