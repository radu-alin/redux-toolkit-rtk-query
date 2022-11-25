import { Todo } from './../../types/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:3500';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos',
      transformResponse: (res: Todo[]) => res.sort((a: any, b: any) => b.id - a.id),
      providesTags: ['Todos'],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

// use + GetTodos/"getTodos" + Query
// use + AddTodo/"addTodo" + Mutation
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
