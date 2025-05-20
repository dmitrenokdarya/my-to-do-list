import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { selectTodolists } from "@/features/todolists/model/todolists-selectors"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { Grid } from "@mui/material"
import Paper from "@mui/material/Paper"
import { useEffect } from "react"
import { fetchTodolistsTC } from "@/model/todolists-slice"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  console.log(todolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
