import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistsItem/TodolistItem"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { selectTodolists } from "@/model/todolists-selectors"
import { Grid, Paper } from "@mui/material"



export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map(todolist => (
                <Grid key={todolist.id}>
                    <Paper sx={{ p: '0 20px 20px 20px' }}>
                        <TodolistItem todolist={todolist} />
                    </Paper>
                </Grid>
            ))}
        </>
    )
}