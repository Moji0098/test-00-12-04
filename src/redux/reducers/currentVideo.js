import * as actionType from "../actionTypes";

const initialState = {
  list: [],
  active: null,
};

export const currentVideo = (state = initialState, { type, payload }) => {
  let id = payload?.id;
  switch (type) {
    case actionType.ADD_ELEMENT_TO_VIEWPORT:
      try {
        const list = [...state.list];
        if (!list.find((item) => +item?.id === +id)) list.push(payload);

        const end =
          list.length > 0
            ? list.sort((a, b) => b?.bottom - a?.bottom)[0]?.bottom
            : 0;
        const start =
          list.length > 0 ? list.sort((a, b) => a?.top - b?.top)[0]?.top : 0;
        let FIRST_ELEM_TO_LAST = (end - start) / 2;

        const calMiddleOfElem = list.map((item) => {
          return {
            ...item,
            middle: Math.abs(
              (item?.bottom + item?.top - 2 * start) / 2 - FIRST_ELEM_TO_LAST
            ),
          };
        });

        const listFromCenter = calMiddleOfElem?.sort(function(a, b) {
          return a?.middle - b?.middle;
        });

        return {
          list,
          active: +listFromCenter[0]?.id,
        };
      } catch (e) {
        alert("error");
        return {
          list: [],
          active: null,
        };
      }

    case actionType.REMOVE_ELEMENT_TO_VIEWPORT:
      try {
        const filteredList = [...state?.list]?.filter((item) => {
          return +item?.id !== +id;
        });

        let newEnd =
          filteredList.length > 0
            ? filteredList.sort((a, b) => b?.bottom - a?.bottom)[0]?.bottom
            : 0;
        const newStart =
          filteredList.length > 0
            ? filteredList.sort((a, b) => a?.top - b?.top)[0]?.top
            : 0;
        let NEW_FIRST_ELEM_TO_LAST = (newEnd - newStart) / 2;

        const newCalMiddleOfElem = filteredList.map((item) => {
          return {
            ...item,
            middle: Math.abs(
              (item?.bottom + item?.top - 2 * newStart) / 2 -
                NEW_FIRST_ELEM_TO_LAST
            ),
          };
        });

        const newListFromCenter = newCalMiddleOfElem.sort(function(a, b) {
          return a?.middle - b?.middle;
        });

        return {
          list: filteredList,
          active: +newListFromCenter[0]?.id,
        };
      } catch (e) {
        alert("error");
        return {
          list: [],
          active: null,
        };
      }

    default:
      return state;
  }
};
