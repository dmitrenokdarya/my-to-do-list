import { beforeEach, expect, test } from 'vitest'
import type { TasksState } from '../app/App'
import { createTodolistAC, deleteTodolistAC } from './todolists-reducer'
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer } from './task-reducer'

let startState: TasksState = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }
})

//test_1 
test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createTodolistAC('New todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


//test_2
test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC({id: 'todolistId2'}))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})


//test_3
test('correct task should be deleted', () => {
    const endState = tasksReducer(
        startState,
        deleteTaskAC({ listId: 'todolistId2', taskId: '2' })
    )

    expect(endState).toEqual({
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '3', title: 'tea', isDone: false },
        ],
    })
})


//test_4
test('correct task should be created at correct array', () => {
    const endState = tasksReducer(
        startState,
        createTaskAC({
            listId: 'todolistId2',
            title: 'juice',
        })
    )

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(4)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].title).toBe('juice')
    expect(endState.todolistId2[0].isDone).toBe(false)
})


//test_5
test('correct task should change its status', () => {
    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({ listId: 'todolistId2', taskId: '2', isDone: false })
    )

    expect(endState.todolistId1[0].isDone).toBe(false)
    expect(endState.todolistId2[1].isDone).toBe(false)
})


//test_6
test('correct task should change its title', () => {
    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({ listId: 'todolistId2', taskId: '2', title: 'New title' })
    )

    expect(endState.todolistId1[0].title).toBe('CSS')
    expect(endState.todolistId2[1].title).toBe('New title')
})