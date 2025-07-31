import { DefaultResponse, defaultResponseSchema } from "@/common/types";
import { getTasksSchema, TaskOperationResponse, taskOperationResponseSchema, type DomainTask, type GetTasksResponse, type UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "@/app/baseApi"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
      extraOptions: { dataSchema: getTasksSchema},
      providesTags: ['Task'],
    }),
    createTask: build.mutation<TaskOperationResponse, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      extraOptions: { dataSchema: taskOperationResponseSchema},
      invalidatesTags: ['Task'],
    }),
    updateTask: build.mutation<TaskOperationResponse, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model,
      }),
      extraOptions: { dataSchema: taskOperationResponseSchema},
      invalidatesTags: ['Task'],
    }),
    removeTask: build.mutation<DefaultResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      extraOptions: { dataSchema: defaultResponseSchema},
      invalidatesTags: ['Task'],
    }),
  }),
})


export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useRemoveTaskMutation,
} = tasksApi