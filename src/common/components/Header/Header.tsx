import { changeThemeModeAC, selectAppStatus, selectThemeMode, setIsLoggedInAC } from "@/app/app-slice.ts"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { Path } from "@/common/routing"
import { containerSx } from "@/common/styles"
import { getTheme } from "@/common/theme"
import { NavButton } from "@/common/components/NavButton/NavButton"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import LinearProgress from "@mui/material/LinearProgress"
import { NavLink } from "react-router"
import { useLogoutMutation } from "@/features/auth/api/authApi"
import { AUTH_TOKEN } from "@/common/constants"
import { ResultCode } from "@/common/enums"
import { baseApi } from "@/app/baseApi"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)

  const dispatch = useAppDispatch()

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const [logout] = useLogoutMutation()

  const logoutHandler = () => {
    logout().then(res => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: false }))
        localStorage.removeItem(AUTH_TOKEN)
      }
    })
    .then (() => {
      dispatch(baseApi.util.invalidateTags(['Todolist', 'Task']))
    })
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center'}}>
            <NavButton onClick={logoutHandler} themeMode={themeMode}>Log out</NavButton>
            <NavLink to={Path.Faq} style={{ color: themeMode === 'light' ? '#6B8E23' : 'white'}}>
              Faq
            </NavLink>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
