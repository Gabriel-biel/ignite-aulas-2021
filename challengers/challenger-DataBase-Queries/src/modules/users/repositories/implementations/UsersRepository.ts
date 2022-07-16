import { getRepository, Repository } from 'typeorm'

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos'
import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    // Complete usando ORM
    const user = await this.repository.findOne({
      where: { id: user_id },
      relations: ['games'],
    })
    return user
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    const findAllFirstName = this.repository.query(
      'select * from users order by first_name ASC',
    )
    return findAllFirstName
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    return this.repository.query(
      `select * from users where lower(first_name)='${first_name.toLowerCase()}' and lower(last_name)='${last_name.toLowerCase()}'`,
    )
  }
}
