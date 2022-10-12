import { getRepository, ILike, Repository } from 'typeorm'

import { User } from '../../../users/entities/User'
import { Game } from '../../entities/Game'
import { IGamesRepository } from '../IGamesRepository'

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>

  constructor() {
    this.repository = getRepository(Game)
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    // return this.repository.createQueryBuilder()

    //
    const returnTitleContaining = await this.repository.find({
      title: ILike(`%${param}%`),
    })
    return returnTitleContaining
    //
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query
    const countGames = await this.repository.query('select count(*) from games')
    return countGames
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    const returnUsersGameId = await this.repository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.users', 'user')
      .where('game.id = :id', { id })
      .getOneOrFail()

    return returnUsersGameId.users
    //
  }
}
