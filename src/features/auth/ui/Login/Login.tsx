import { selectThemeMode, setCaptchaAC, setIsLoggedInAC, selectCaptchaUrl } from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { type LoginInputs } from "@/features/auth/lib/schemas"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import styles from "./Login.module.css"
import { useLoginMutation } from "../../api/authApi"
import { AUTH_TOKEN } from "@/common/constants"
import { ResultCode } from "@/common/enums"
import { useEffect, useState } from "react"

export const Login = () => {

  const captchaUrl = useAppSelector(selectCaptchaUrl);
  const [captchaValue, setCaptchaValue] = useState('');


  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  const [login, { reset: resetLogin }] = useLoginMutation();

  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    //resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  })


  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const requestData = {
        ...data,
        captcha: captchaUrl ? captchaValue : undefined
      };

      const result = await login(requestData).unwrap();

      if (result.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true }));
        dispatch(setCaptchaAC({ captcha: null }));
        localStorage.setItem(AUTH_TOKEN, result.data.token);
        setCaptchaValue('');
        reset();
        resetLogin();
      }
    } catch (error) {
      if (error?.data?.resultCode === ResultCode.CaptchaError) {
        setCaptchaValue('');
      }
      console.error('Login error:', error);
    }
  };


  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              error={!!errors.email}
              {...register("password")}
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            <FormControlLabel
              label={"Remember me"}
              control={
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
                />
              }
            />
            {captchaUrl && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src={captchaUrl} alt="CAPTCHA" style={{ marginBottom: 10, height: '60px' }} />
                <TextField
                  label="Enter CAPTCHA"
                  value={captchaValue}
                  onChange={(e) => setCaptchaValue(e.target.value)}
                  required
                  sx={{
                    width: '170px',
                  }}
                />
              </div>
            )}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}
