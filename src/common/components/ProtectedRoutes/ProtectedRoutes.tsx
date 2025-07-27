import { Path } from "@/common/routing"
import type { PropsWithChildren } from "react"
import { Navigate, Outlet } from "react-router"

type Props = {
  isAllowed: boolean
  redirectPath?: string
}

export const ProtectedRoutes = ({ children, isAllowed, redirectPath = Path.Login }: PropsWithChildren<Props>) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />
  }

  return children ? children : <Outlet />
}
