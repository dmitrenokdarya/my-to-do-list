import { useAppDispatch } from "@/common/hooks"
import { containerSx } from "@/common/styles"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import { DomainTodolist, FilterValues} from "@/features/todolists/lib/types"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

//есть ошибка в том, что при нажатии на кнопку фильтрация спустя пару секнуд отменяется

type Props = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData(
        'getTodolists',
        undefined,
        (state) => {
          const todolist = state.find((todo) => todo.id === id)
          if (todolist) {
            todolist.filter = filter
          }
        }),
    )
  }

  return (
    <Box sx={containerSx}>
      <Button variant={filter === "all" ? "outlined" : "text"} color={"inherit"} onClick={() => changeFilter("all")}>
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
