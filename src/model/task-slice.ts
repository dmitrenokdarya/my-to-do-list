import { createSlice, nanoid } from '@reduxjs/toolkit'
import { createTodolistTC, deleteTodolistTC } from './todolists-slice'
import { TasksState } from '@/features/todolists/model/tasks-reducer'


export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    selectors: {
        selectTodolists: (state) => state,
    },
    reducers: create => ({
        deleteTaskAC: create.reducer<{ listId: string, taskId: string }>((state, action) => {
            const list = state[action.payload.listId]
            const taskIndex = list.findIndex(task => task.id === action.payload.taskId)
            if (taskIndex !== -1) {
                list.splice(taskIndex, 1)
            }
        }),
        createTaskAC: create.reducer<{ listId: string, title: string }>((state, action) => {
            const list = state[action.payload.listId]
            const title = action.payload.title
            const newTask = { id: nanoid(), title, isDone: false }
            list.unshift(newTask)
        }),
        changeTaskStatusAC: create.reducer<{ listId: string, taskId: string, isDone: boolean }>((state, action) => {
            const list = state[action.payload.listId]
            const newIsDone = action.payload.isDone
            const task = list.find(task => task.id === action.payload.taskId)
            if (task) {
                task.isDone = newIsDone
            }
        }),
        changeTaskTitleAC: create.reducer<{ listId: string, taskId: string, title: string }>((state, action) => {
            const list = state[action.payload.listId]
            const newTitle = action.payload.title
            const task = list.find(task => task.id === action.payload.taskId)
            if (task) {
                task.title = newTitle
            }
        })
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

export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

