import { DefaultResponse, defaultResponseSchema } from "@/common/types";
import { getTasksSchema, TaskOperationResponse, taskOperationResponseSchema, type GetTasksResponse, type UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "@/app/baseApi"
import { PAGE_SIZE } from "@/common/constants/constants"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<
      GetTasksResponse, 
      { todolistId: string; params: { page: number }}
    >({
      query: ({todolistId, params}) => ({ 
        url: `/todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      extraOptions: { dataSchema: getTasksSchema},
      providesTags: (res, err, {todolistId}) => [{type: 'Task', id: todolistId}],
    }),
    createTask: build.mutation<TaskOperationResponse, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      extraOptions: { dataSchema: taskOperationResponseSchema},
      invalidatesTags: (res, err, {todolistId}) => [{type: 'Task', id: todolistId}],
    }),
    updateTask: build.mutation<TaskOperationResponse, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model,
      }),
      async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks')

        let patchResults: any[] = []
        cachedArgsForQuery.forEach(({ params }) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData(
                'getTasks',
                { todolistId, params: { page: params.page } },
                state => {
                  const index = state.items.findIndex(task => task.id === taskId)
                  if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...model }
                  }
                }
              )
            )
          )
        })
        try {
          await queryFulfilled
        } catch {
          patchResults.forEach(patchResult => {
            patchResult.undo()
          })
        }
      },
      extraOptions: { dataSchema: taskOperationResponseSchema},
      invalidatesTags: (res, err, {todolistId}) => [{type: 'Task', id: todolistId}],
    }),
    removeTask: build.mutation<DefaultResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      extraOptions: { dataSchema: defaultResponseSchema},
      invalidatesTags: (res, err, {todolistId}) => [{type: 'Task', id: todolistId}],
    }),
  }),
})


export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useRemoveTaskMutation,
} = tasksApi