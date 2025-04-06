import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'
import type { TasksState } from '@/app/App'
import { createTodolistAC, deleteTodolistAC } from './todolists-reducer'


//AC for tasks
export const deleteTaskAC = createAction<{ listId: string, taskId: string }>('tasks/deleteTask')

export const createTaskAC = createAction<{ listId: string, title: string }>('tasks/createTask')

export const changeTaskStatusAC = createAction<{ listId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')

export const changeTaskTitleAC = createAction<{ listId: string, taskId: string, title: string }>('tasks/changeTaskTitle')


//initial state
const initialState: TasksState = {}


//reducer for tasks
export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(deleteTaskAC, (state, action) => {
            const list = state[action.payload.listId]
            const taskIndex = list.findIndex(task => task.id === action.payload.taskId)
            if (taskIndex !== -1) {
                list.splice(taskIndex, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            const list = state[action.payload.listId]
            const title = action.payload.title
            const newTask = { id: nanoid(), title, isDone: false }
            list.unshift(newTask)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const list = state[action.payload.listId]
            const newIsDone = action.payload.isDone
            const task = list.find(task => task.id === action.payload.taskId)
            if (task) {
                task.isDone = newIsDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const list = state[action.payload.listId]
            const newTitle = action.payload.title
            const task = list.find(task => task.id === action.payload.taskId)
            if (task) {
                task.title = newTitle
            }
        })
})

