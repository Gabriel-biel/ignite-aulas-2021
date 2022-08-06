import { AppError } from '../../../../shared/errors/AppError'
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })
  it('Should be able to create a new car', async () => {
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

  it('Should not be able to create a car with exists license_plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car 1',
        description: 'Um Carro Civic',
        daily_rate: 100,
        license_plate: '1234',
        fine_amount: 60,
        brand: 'brand',
        category_id: 'category',
      })
      await createCarUseCase.execute({
        name: 'Car 2',
        description: 'Um Carro Civic',
        daily_rate: 100,
        license_plate: '1234',
        fine_amount: 60,
        brand: 'brand',
        category_id: 'category',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    })

    expect(car.available).toBe(true)
  })
})
