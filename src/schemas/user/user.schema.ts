import { UpdateUserDTO } from '../../dtos/user/updateUser.dto';
import { CreateUserDTO } from './../../dtos/user/createUser.dto';
import Joi, { Schema } from 'joi';

export const CreateUserSchema: Schema<CreateUserDTO> = Joi.object<CreateUserDTO>({
  name: Joi.string().required().messages({
    'string.empty': '[name] O campo nome não pode estar vazio',
    'any.required': '[name] O campo nome é obrigatório',
    'string.base': '[name] O campo nome deve ser uma string',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '[email] O campo email deve ser um endereço de email válido',
    'string.empty': '[email] O campo email não pode estar vazio',
    'any.required': '[email] O campo email é obrigatório',
    'string.base': '[email] O campo email deve ser uma string',
  }),
});

export const UpdateUserSchema: Schema<UpdateUserDTO> = Joi.object<UpdateUserDTO>({
  name: Joi.string().optional().messages({
    'string.empty': '[name] O campo nome não pode estar vazio',
    'string.base': '[name] O campo nome deve ser uma string',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': '[email] O campo email deve ser um endereço de email válido',
    'string.empty': '[email] O campo email não pode estar vazio',
    'string.base': '[email] O campo email deve ser uma string',
  }),
});
