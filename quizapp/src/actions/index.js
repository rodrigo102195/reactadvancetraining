/* eslint-disable import/prefer-default-export */
export const addQuiz = (newQuiz) => ({
  type: "ADD_QUIZ",
  newQuiz,
});

export const setSelectCategory = (value, index) => ({
  type: "SET_SELECT_CATEGORY",
  value,
  index,
});
