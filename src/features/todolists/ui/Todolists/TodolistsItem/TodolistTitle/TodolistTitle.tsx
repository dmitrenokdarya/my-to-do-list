import { Todolist } from "@/app/App"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { changeTodolistTitleAC, deleteTodolistAC } from "@/model/todolists-reducer"
import styles from './TodolistTitle.module.css'
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from '@mui/icons-material/Delete'

type Props = {
    todolist: Todolist
}

export const TodolistTitle = ({todolist}: Props) => {

    const {id, title} = todolist

    const dispatch = useAppDispatch()

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({ id: id }))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({ id: id, title: title }))
    }

    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle} />
            </h3>
            <IconButton onClick={deleteTodolist}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}