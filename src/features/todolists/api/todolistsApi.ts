import { DomainTodolist } from '../model/todolists-slice'
import { Todolist } from './todolistsApi.types'
import { BaseResponse } from '@/common/types'
import { baseApi } from '@/app/baseApi'

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => `todo-lists`,
      transformResponse: (todolists: Todolist[]): DomainTodolist[] => 
        todolists.map((todolist) => ({...todolist, filter: 'all', entityStatus: 'idle'})),
      providesTags: ['Todolist'],
    }),
    addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: 'todo-lists',
        method: 'POST',
        body: {title},
      }),
      invalidatesTags: ['Todolist'],
    }),
    removeTodolist: build.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `todo-lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todolist'],
    }),
    updateTodolistTitle: build.mutation<BaseResponse, {id: string, title: string}>({
      query: ({id, title}) => ({
        url: `todo-lists/${id}`,
        method: 'PUT',
        body: {title},
      }),
      invalidatesTags: ['Todolist'],
    }),
  }),
})

export const { 
  useGetTodolistsQuery, 
  useAddTodolistMutation, 
  useRemoveTodolistMutation, 
  useUpdateTodolistTitleMutation
} = todolistsApi