import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"


type Props = {
  background?: string
  themeMode?: string
}


export const NavButton = styled(Button)<Props>(({ background, theme, themeMode }) => ({
  minWidth: "110px",
  fontWeight: "bold",
  textTransform: "capitalize",
  margin: "0 10px",
  padding: "8px 24px",
  color: 'white',
  background: themeMode === 'light' ? theme.palette.secondary.main : background,
}))
