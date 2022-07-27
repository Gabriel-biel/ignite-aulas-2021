import { AppError } from '../../../../shared/errors/AppError'
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create a category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    )
  })
  it('Should be able a create Category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Decription Test',
    }
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    )
    expect(categoryCreated).toHaveProperty('id')
  })

  it('Should not be able to create a new Category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Category Decription Test',
      }
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
