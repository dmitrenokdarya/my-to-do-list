
import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { Tasks } from './Tasks/Tasks'
import { FilterButtons } from './FilterButtons/FilterButtons'
import { Todolist } from '@/app/App'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { createTaskAC } from '@/model/task-reducer'
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm'


type Props = {
  todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {

  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskAC({listId: todolist.id, title}))
  }


  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist}/>
      <FilterButtons todolist={todolist}/>
    </div>
  )
}
