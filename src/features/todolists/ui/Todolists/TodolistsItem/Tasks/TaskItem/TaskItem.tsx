import { ChangeEvent } from "react"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { getListItemSx } from "./TaskItem.styles"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { changeTaskStatusAC, deleteTaskAC, changeTaskTitleAC, Task } from "@/features/todolists/model/tasks-reducer"


type Props = {
    task: Task
    todolistId: string
}

export const TaskItem = ({ task, todolistId }: Props) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC({ todolistId: todolistId, taskId: task.id }))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({ todolistId: todolistId, taskId: task.id, isDone: newStatusValue }))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({ todolistId: todolistId, taskId: task.id, title }))
    }

    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
                <EditableSpan value={task.title} onChange={changeTaskTitle} />
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteIcon />
            </IconButton>
            <span>{new Date(task.addedDate).toLocaleDateString()}</span>
        </ListItem>
    )
}