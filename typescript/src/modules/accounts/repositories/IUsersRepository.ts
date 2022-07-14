import { ICreateUserDTO } from '../dtos/IcreateUserDTO'
import { User } from '../entities/user'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(user_id: string): Promise<User>
}

export { IUsersRepository }
