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
    messages:  z.array(z.string()),
    fieldsErrors: z.array(fieldErrorSchema),
  }) 

export const defaultResponseSchema = baseResponseSchema(z.object({}))
export type DefaultResponse = z.infer<typeof defaultResponseSchema>

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"