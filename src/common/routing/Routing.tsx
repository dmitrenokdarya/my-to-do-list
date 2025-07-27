import { selectIsLoggedIn } from "@/app/app-slice"
import { Main } from "@/app/Main"
import { PageNotFound } from "@/common/components"
import { ProtectedRoutes } from "@/common/components/ProtectedRoutes/ProtectedRoutes.tsx"
import { useAppSelector } from "@/common/hooks"
import { Login } from "@/features/auth/ui/Login/Login"
import { Faq } from "@/features/faq/ui/Faq.tsx"
import { Route, Routes } from "react-router"

export const Path = {
  Main: "/",
  Login: "/login",
  Faq: "/faq",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoutes isAllowed={isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.Faq} element={<Faq />} />
      </Route>

      {/*<Route element={<ProtectedRoutes isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>*/}
      {/*  <Route path={Path.Login} element={<Login />} />*/}
      {/*</Route>*/}

      <Route
        path={Path.Login}
        element={
          <ProtectedRoutes isAllowed={!isLoggedIn} redirectPath={Path.Main}>
            <Login />
          </ProtectedRoutes>
        }
      />

      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}

//

// <Route
//   path={Path.Faq}
//   element={
//     <ProtectedRoutes isAllowed={isLoggedIn}>
//       <Faq />
//     </ProtectedRoutes>
//   }
// />
