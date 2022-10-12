import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/AppError'
import { ICreateUserDTO } from '../../dtos/IcreateUserDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email)

    if (userAlreadyExist) {
      throw new AppError('User Already Exists!')
    }

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    })
  }
}

export { CreateUserUseCase }
