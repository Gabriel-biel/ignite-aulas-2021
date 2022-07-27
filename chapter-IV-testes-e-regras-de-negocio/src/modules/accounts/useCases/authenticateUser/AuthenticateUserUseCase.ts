import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../shared/errors/AppError'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    // Se o usuário existe
    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    // Usa o método compare do bcryptjs para comparar as senhas
    const passwordMatch = await compare(password, user.password)

    // Se a senha Está Correta
    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    // Gerar jsonwebtoken
    const token = sign({}, 'tokenmd5', {
      subject: user.id,
      expiresIn: '1d',
    })

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }
