/* eslint-disable no-case-declarations */
const initialState = {
  questions: [
    {
      category: "sports",
      question: "Which club won the 2017 UEFA Super Cup?",
      answer: "Real Madrid",
      level: 1,
    },
    {
      category: "sports",
      question: "Which year was the Premier League founded?",
      answer: "1992",
      level: 2,
    },
    {
      category: "sports",
      question: "Who won the European Championships in 1992?",
      answer: "Denmark",
      level: 3,
    },
    {
      category: "tv",
      question: "Name the creators of Stranger Things",
      answer: "The Duffer Brothers",
      level: 2,
    },
    {
      category: "videogames",
      question: "Who is the creator of the Super Mario Bros series?",
      answer: "Shigeru Miyamoto",
      level: 3,
    },
  ],
  categoriesOptions: [
    { key: "tv", value: "tv", text: "TV Shows", selected: true },
    { key: "sports", value: "sports", text: "Sports", selected: true },
    {
      key: "videogames",
      value: "videogames",
      text: "Videogames",
      selected: true,
    },
  ],
  difficultOptions: [
    { key: "1", value: "1", text: "Easy" },
    { key: "2", value: "2", text: "Medium" },
    { key: "3", value: "3", text: "Hard" },
  ],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_QUIZ":
      return { ...state, questions: [...state.questions, action.newQuiz] };
    case "SET_SELECT_CATEGORY":
      const newCategoriesOptions = [...state.categoriesOptions];
      newCategoriesOptions[action.index].selected = action.value;
      return { ...state, categoriesOptions: newCategoriesOptions };
    default:
      return state;
  }
};

export default Reducer;
