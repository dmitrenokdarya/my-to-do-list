import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { selectThemeMode } from './app-selectors'
import { getTheme } from '../common/theme/theme'
import { Header } from '@/common/components/Header/Header'
import { Main } from './Main'
import CssBaseline from '@mui/material/CssBaseline'


export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type TasksState = Record<string, Task[]>

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className={'app'}>
        <CssBaseline />
        <Header/>
        <Main/>
      </div>
    </ThemeProvider>
  )
}
