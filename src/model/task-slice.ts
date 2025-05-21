import { createTodolistTC, deleteTodolistTC } from './todolists-slice'
import { TasksState } from '@/features/todolists/model/tasks-reducer'
import { createAppSlice, handleServerAppError, handleServerNetworkError } from '@/common/utils'
import { tasksApi } from '@/features/todolists/api/tasksApi'
import { UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import { TaskStatus, ResultCode } from '@/common/enums'
import { RootState } from '@/app/store'
import { setAppErrorAC, setAppStatusAC } from '@/app/app-slice'


export const tasksSlice = createAppSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    selectors: {
        selectTodolists: (state) => state,
    },
    reducers: create => ({
        fetchTasksTC: create.asyncThunk(
            async (todolistId: string, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.getTasks(todolistId)
                    dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return { todolistId, tasks: res.data.items }
                } catch (error) {
                    dispatch(setAppStatusAC({ status: 'failed' }))
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state[action.payload.todolistId] = action.payload.tasks
                }
            }
        ),
        createTaskTC: create.asyncThunk(
            async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.createTask(payload)
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({ status: "succeeded" }))
                        return { task: res.data.data.item }
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError( dispatch, error )
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state[action.payload.task.todoListId].unshift(action.payload.task)
                },
            }
        ),
        deleteTaskTC: create.asyncThunk(
            async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
                try {
                    await tasksApi.deleteTask(payload)
                    return payload
                } catch (error) {
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const list = state[action.payload.todolistId]
                    const taskIndex = list.findIndex(task => task.id === action.payload.taskId)
                    if (taskIndex !== -1) {
                        list.splice(taskIndex, 1)
                    }
                }
            }
        ),
        changeTaskStatusTC: create.asyncThunk(
            async (payload: { todolistId: string; taskId: string; status: TaskStatus }, { dispatch, rejectWithValue, getState }) => {
                const { todolistId, taskId, status } = payload

                const allTodolistTasks = (getState() as RootState).tasks[todolistId]
                const task = allTodolistTasks.find(task => task.id === taskId)

                if (!task) {
                    return rejectWithValue(null)
                }

                const model: UpdateTaskModel = {
                    description: task.description,
                    title: task.title,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline,
                    status,
                }
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.updateTask({ todolistId, taskId, model })
                    dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return { task: res.data.data.item }
                } catch (error) {
                    dispatch(setAppStatusAC({ status: 'failed' }))
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
                    if (task) {
                        task.status = action.payload.task.status
                    }
                },
            }
        ),
        changeTaskTitleTC: create.asyncThunk(
            async (payload: { todolistId: string; taskId: string; title: string }, { dispatch, rejectWithValue, getState }) => {
                const { todolistId, taskId, title } = payload

                const allTodolistTasks = (getState() as RootState).tasks[todolistId]
                const task = allTodolistTasks.find(task => task.id === taskId)

                if (!task) {
                    return rejectWithValue(null)
                }

                const model: UpdateTaskModel = {
                    description: task.description,
                    title,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline,
                    status: task.status,
                }
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.updateTask({ todolistId, taskId, model })
                    if (res.data.resultCode === ResultCode.Success) {
                        return { task: res.data.data.item }
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError( dispatch, error )
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
                    if (task) {
                        task.title = action.payload.task.title
                    }
                }
            }
        ),
    }),
    extraReducers: builder => {
        builder
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
    },
})

export const { fetchTasksTC, deleteTaskTC, createTaskTC, changeTaskStatusTC, changeTaskTitleTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

