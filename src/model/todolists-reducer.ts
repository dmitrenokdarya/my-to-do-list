import { FilterValues, Todolist } from "../App"

//type
type Actions = deleteTodolistAction | changeTodolistTitleAction | changeTodolistFilterAction | createTodolistAction

export type deleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type changeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>
export type createTodolistAction = ReturnType<typeof createTodolistAC>


//initial state
const initialState: Todolist[] = []


//AC for todolists
export const deleteTodolistAC = (id: string) => {
    return ({
        type: 'delete_todolist',
        payload: { id }
    } as const)
}
export const changeTodolistTitleAC = ({ id, title }: { id: string, title: string }) => {
    return ({
        type: 'change_todolist_title', 
        payload: { id, title }
    } as const)
}
export const changeTodolistFilterAC = ({ id, filter }: { id: string, filter: FilterValues }) => {
    return ({
        type: 'change_todolist_filter', 
        payload: { id, filter }
    } as const)
}
export const createTodolistAC = ({ id, title }: { id: string, title: string }) => {
    return ({
        type: 'create_todolist', 
        payload: { id, title }
    } as const)
}




//reducer for todolists
export const todolistsReducer = (todolists: Array<Todolist> = initialState, action: Actions): Array<Todolist> => {
    switch (action.type) {
        case 'delete_todolist': {
            const { id } = action.payload
            return todolists.filter(tl => tl.id !== id)
        }
        case 'change_todolist_title': {
            const { id, title } = action.payload
            return todolists.map(tl => tl.id === id ? { ...tl, title } : tl)
        }
        case 'change_todolist_filter': {
            const { id, filter } = action.payload
            return todolists.map(tl => tl.id === id ? { ...tl, filter } : tl)
        }
        case 'create_todolist': {
            const { id, title } = action.payload
            return [...todolists, { id: id, title: title, filter: 'all' }]
        }
        default:
            return todolists
    }
}





