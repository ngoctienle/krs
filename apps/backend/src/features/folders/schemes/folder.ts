import Joi, { ObjectSchema } from 'joi'

const createFolderSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'any.required': 'name is a required property'
  }),
  parentID: Joi.string().optional().allow(null, ''),
  createdAt: Joi.date().optional().allow(null, ''),
  updatedAt: Joi.date().optional().allow(null, '')
})

export { createFolderSchema }
