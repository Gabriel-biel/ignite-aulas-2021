import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })
  it('Should be able a create a new car', async () => {
    await createCarUseCase.execute({
      name: 'Carro cHEVROLLET',
      description: 'Um Carro Chevrollet',
      daily_rate: 100,
      license_plate: '1234',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    })
  })
})
