import { ResultCode } from "@/common/enums"
import { z } from "zod"

const fieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
})

export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    resultCode: z.nativeEnum(ResultCode),
    messages: z.array(z.string()),
    fieldsErrors: z.array(fieldErrorSchema),
  })


export const defaultResponseSchema = baseResponseSchema(z.object({}))
export type DefaultResponse = z.infer<typeof defaultResponseSchema>


export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export type FieldError = {
  error: string
  field: string
}

export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

// export const meResponseSchema = baseResponseSchema(
//   z.object({
//     id: z.number().or(z.undefined()),
//     email: z.string().or(z.undefined()),
//     login: z.string().or(z.undefined()),
//   }),
// )
// export type meResponse = z.infer<typeof meResponseSchema>

// export const loginResponseSchema = baseResponseSchema(
//   z.object({
//     userId: z.number(),
//     token: z.string(),
//   }),
// )
// export type loginResponse = z.infer<typeof loginResponseSchema>