import { AppError } from '../../../../shared/errors/AppError'
import { ICreateUserDTO } from '../../dtos/IcreateUserDTO'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })
  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '0000',
      name: 'Gabriel',
      password: '1234',
      email: 'gabriel_gla98@hotmail.com',
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able authenticate an non existent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1111',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able authenticate with password incorrect', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '090909',
        name: 'Gabriel',
        email: 'user@user.com',
        password: '0000',
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: '1111',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
