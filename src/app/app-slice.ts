import type { RequestStatus } from "@/common/types"
import { createSlice, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { tasksApi } from "../features/todolists/api/tasksApi"

export const appSlice = createSlice({
  extraReducers: builder => {
    builder.addMatcher(isPending, (state, action) => {
      if (
        todolistsApi.endpoints.getTodolists.matchPending(action) ||
        tasksApi.endpoints.getTasks.matchPending(action)
      ) {
        return
      }
      debugger
      state.status = "loading"
    }
    )
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed"
      })
  },
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
})

export const { selectThemeMode, selectAppStatus, selectAppError, selectIsLoggedIn } = appSlice.selectors
export const { changeThemeModeAC, setAppStatusAC, setAppErrorAC, setIsLoggedInAC } = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
