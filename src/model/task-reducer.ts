import type { TasksState } from '../App'
import { createTodolistAction, deleteTodolistAction } from './todolists-reducer'
import {v1} from 'uuid'

//type
type Actions = createTodolistAction | deleteTodolistAction | deleteTaskAction | createTaskAction | changeTaskStatusAction | changeTaskTitleAction

export type deleteTaskAction = ReturnType<typeof deleteTaskAC>
export type createTaskAction = ReturnType<typeof createTaskAC>
export type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>


//AC for tasks
export const deleteTaskAC = ({ listId, taskId }: { listId: string, taskId: string }) => {
    return ({
        type: 'delete_task',
        payload: { listId, taskId }
    } as const)
}
export const createTaskAC = ({ listId, title }: { listId: string, title: string }) => {
    return ({
        type: 'create_task',
        payload: { listId, title }
    } as const)
}
export const changeTaskStatusAC = ({ listId, taskId, isDone }: { listId: string, taskId: string, isDone: boolean }) => {
    return ({
        type: 'change_task_status',
        payload: { listId, taskId, isDone }
    } as const)
}
export const changeTaskTitleAC = ({ listId, taskId, title }: { listId: string, taskId: string, title: string }) => {
    return ({
        type: 'change_task_title',
        payload: { listId, taskId, title }
    } as const)
}


//initial state
const initialState: TasksState = {}


//reducer for tasks
export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            const { id } = action.payload
            return { ...state, [id]: [] }
        }
        case 'delete_todolist': {
            const newState = { ...state }
            const { id } = action.payload
            delete newState[id]
            return newState
        }
        case 'delete_task': {
            const { listId, taskId } = action.payload
            return ({ ...state, [listId]: state[listId].filter(task => task.id !== taskId) })
        }
        case 'create_task': {
            const { listId, title } = action.payload
            const newTask = { id: v1(), title, isDone: false }
            return { ...state, [listId]: [newTask, ...state[listId]] }
        }
        case 'change_task_status': {
            const { listId, taskId, isDone } = action.payload
            return ({...state, [listId]: state[listId].map(task => task.id == taskId ? {...task, isDone} : task)})
        }
        case 'change_task_title': {
            const { listId, taskId, title } = action.payload
            return ({...state, [listId]: state[listId].map(task => task.id == taskId ? {...task, title} : task)})       
        }
        default:
            return state
    }
}

