import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { useAppDispatch } from "@/common/hooks"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"
import { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums"
import { changeTaskStatusTC, changeTaskTitleTC, deleteTaskTC } from "@/model/task-slice"
import { Todolist } from "@/features/todolists/model/todolists-reducer"

type Props = {
  task: DomainTask
  todolistId: string
  todolist: Todolist
}

export const TaskItem = ({ task, todolistId, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }))
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(changeTaskStatusTC({ todolistId, taskId: task.id, status: newStatusValue ? TaskStatus.Completed : TaskStatus.New }))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleTC({ todolistId, taskId: task.id, title }))
  }

  const isTaskCompleted = task.status === TaskStatus.Completed

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} disabled={todolist.entityStatus === 'loading'}/>
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={todolist.entityStatus === 'loading'}/>
      </div>
      <IconButton onClick={deleteTask} disabled={todolist.entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
