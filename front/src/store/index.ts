import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Todo = {
    id:number,
    task:string,
    completed:boolean;
    created_at:Date;
  }

export const todoApi = createApi({
    reducerPath: 'todo',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1212/api/' }),
    tagTypes:['Todos'],
    endpoints: (builder) => ({
      getAll: builder.query<Todo[], void>({
        query: () => 'todos',
        providesTags:[{type:'Todos'}],
        transformResponse: (response:Todo[]) => response.sort((a,b)=> new Date(b.created_at).getTime() - new Date(a .created_at).getTime())        
      }),
      addTodo: builder.mutation<string,string>({
        query(task) {
            return {
                url: 'todos',
                method: 'POST',
                body: {task}
            };
        },
        invalidatesTags: ['Todos']
      }),
      updateTodo: builder.mutation<Todo,Todo>({
        query(todo) {
            return {
                url: `todos/${todo.id}`,
                method: 'PUT',
                body: todo
            };
        },
        invalidatesTags: ['Todos']
      }),
      deleteTodo: builder.mutation<number,number>({
        query(id) {
            return {
                url: `todos/${id}`,
                method: 'DELETE'
            };
        },
        invalidatesTags: ['Todos']
      })
    }),
  });