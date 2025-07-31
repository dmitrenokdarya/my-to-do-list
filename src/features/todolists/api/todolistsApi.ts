import { CreateTodolistResponse, createTodolistResponseSchema, Todolist, todolistSchema } from './todolistsApi.types'
import { baseApi } from '@/app/baseApi'
import { DomainTodolist } from '../lib/types'
import { DefaultResponse, defaultResponseSchema } from '@/common/types'

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => `todo-lists`,
      extraOptions: { dataSchema: todolistSchema.array() },
      transformResponse: (todolists: Todolist[]): DomainTodolist[] => 
        todolists.map((todolist) => ({...todolist, filter: 'all', entityStatus: 'idle'})),
      providesTags: ['Todolist'],
    }),
    addTodolist: build.mutation<CreateTodolistResponse, string>({
      query: (title) => ({
        url: 'todo-lists',
        method: 'POST',
        body: {title},
      }),
      extraOptions: { dataSchema: createTodolistResponseSchema },
      invalidatesTags: ['Todolist'],
    }),
    removeTodolist: build.mutation<DefaultResponse, string>({
      query: (id) => ({
        url: `todo-lists/${id}`,
        method: 'DELETE',
      }),
      extraOptions: { dataSchema: defaultResponseSchema },
      invalidatesTags: ['Todolist'],
    }),
    updateTodolistTitle: build.mutation<DefaultResponse, {id: string, title: string}>({
      query: ({id, title}) => ({
        url: `todo-lists/${id}`,
        method: 'PUT',
        body: {title},
      }),
      extraOptions: { dataSchema: defaultResponseSchema },
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