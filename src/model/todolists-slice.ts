import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import { Todolist } from "@/features/todolists/api/todolistsApi.types"
import { FilterValues } from "@/features/todolists/model/todolists-reducer"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    selectors: {
        selectTasks: (state) => state,
    },
    reducers: create => ({
        changeTodolistFilterAC: create.reducer<{ id: string, filter: FilterValues }>((state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
    }),
    extraReducers: builder => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => {
                    return { ...tl, filter: 'all', entityStatus: 'idle' }
                })
            })
            .addCase(fetchTodolistsTC.rejected, (state, action) => {
                // обработка ошибки при запросе за тудулистами
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(todolist => todolist.id === action.payload.id)
                if (index !== -1) {
                    state[index].title = action.payload.title
                }
            })
    },
})

export const fetchTodolistsTC = createAsyncThunk(
    `${todolistsSlice.name}/fetchTodolistsTC`,
    async (_, thunkAPI) => {
        try {
            const res = await todolistsApi.getTodolists()
            return { todolists: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const changeTodolistTitleTC = createAsyncThunk(
    `${todolistsSlice.name}/changeTodolistTitleTC`,
    async (payload: { id: string; title: string }, thunkAPI) => {
        try {
            await todolistsApi.changeTodolistTitle(payload)
            return payload
        } catch (error) {
            return thunkAPI.rejectWithValue(null)
        }
    }
)

export const createTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/createTodolistTC`,
    async ( title: string , thunkAPI) => {
        try {
            const res = await todolistsApi.createTodolist(title)
            return {todolist: res.data.data.item}
        } catch (error) {
            return thunkAPI.rejectWithValue(null)
        }
    }
) 

export const deleteTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/deleteTodolistTC`,
    async ( id: string , thunkAPI) => {
        try {
            await todolistsApi.deleteTodolist(id)
            return {id}
        } catch (error) {
            return thunkAPI.rejectWithValue(null)
        }
    }
)



export const { changeTodolistFilterAC } = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
export type DomainTodolist = Todolist & {
    filter: FilterValues
}




