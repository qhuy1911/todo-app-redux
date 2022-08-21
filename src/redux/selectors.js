import {createSelector} from "@reduxjs/toolkit";

export const searchTextSelector = (state) => state.filters.search;
export const statusFilterSelector = (state) => state.filters.status;
export const prioritiesFilterSelector = (state) => state.filters.priorities;
export const todoListSelector = (state) => state.todoList;

// export const todoListSelector = (state) => {
//   const searchText = searchTextSelector();

//   const todosRemaining = state.todoList.filter((todo) => {
//     return todo.name.includes(searchText);
//   });
//   return todosRemaining;
// };

export const todosRemainingSelector = createSelector(
  todoListSelector,
  searchTextSelector,
  statusFilterSelector,
  prioritiesFilterSelector,
  (todoList, searchText, statusFilter, prioritiesFilter) => {
    return todoList.filter((todo) => {
      if (statusFilter === "All") {
        return prioritiesFilter.length
          ? todo.name.includes(searchText) &&
              prioritiesFilter.includes(todo.priority)
          : todo.name.includes(searchText);
      }
      return (
        todo.name.includes(searchText) &&
        (statusFilter === "Completed" ? todo.completed : !todo.completed) &&
        (prioritiesFilter.length
          ? prioritiesFilter.includes(todo.priority)
          : true)
      );
    });
  }
);
