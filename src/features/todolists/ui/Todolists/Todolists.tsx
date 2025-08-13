import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { containerSx } from "@/common/styles"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { useGetTodolistsQuery } from "../../api/todolistsApi"
import { TodolistSkeleton } from "./TodolistSkeleton/TodolistSkeleton"

export const Todolists = () => {

  const { data: todolists, isLoading } = useGetTodolistsQuery(undefined)

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  } else {
    return (
      <>
        {todolists?.map((todolist) => (
          <Grid key={todolist.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem todolist={todolist} />
            </Paper>
          </Grid>
        ))}
      </>
    )
  }
}

