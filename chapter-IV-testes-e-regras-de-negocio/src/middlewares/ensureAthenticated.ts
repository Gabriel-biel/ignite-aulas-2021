import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '../errors/AppError'
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token Missing!', 401)
  }

  const [, token] = authHeader.split(' ')
  try {
    const { sub: user_id } = verify(token, 'tokenmd5') as IPayload
    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)
    if (!user) {
      throw new AppError('User does not Exists!', 401)
    }

    // Para que o User fosse capturado da request,
    // foi sobscrito o @types/express e adicionado o user na request
    // DISPONÍVEL PARA VERIFICAÇÃO EM " src/@types/express/index.d.ts "
    request.user = {
      id: user_id,
    }

    next()
  } catch {
    throw new AppError('Invalid Token!', 401)
  }
}
