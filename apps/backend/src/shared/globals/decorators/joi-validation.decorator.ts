import { ObjectSchema } from 'joi'
import { Request } from 'express'
import { JoiRequestValidationError } from '@global/helpers/response'

type IJoiDecorator = (
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) => void

export function joiValidation(schema: ObjectSchema): IJoiDecorator {
  return (_target: unknown, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      const req: Request = args[0]
      if (!req || typeof req !== 'object' || !('body' in req)) {
        throw new Error(
          `Expected the first argument to be a Request object with a body, but got ${typeof req}`
        )
      }

      const { error } = schema.validate(req.body)
      if (error?.details) {
        const errorMessage = error.details.map((err) => err.message).join('; ')
        throw new JoiRequestValidationError(errorMessage)
      }

      return originalMethod.apply(this, args)
    }

    return descriptor
  }
}
