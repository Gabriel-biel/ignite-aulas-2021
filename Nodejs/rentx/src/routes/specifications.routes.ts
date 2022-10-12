import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAthenticated'
import { CreateSpecificationController } from '../modules/cars/usecases/createSpecification/CreateSpecificationController'
import { ListSpecificationsController } from '../modules/cars/usecases/listSpecifications/ListSpecificationsController'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()
const listSpecifications = new ListSpecificationsController()

specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post('/', createSpecificationController.handle)

specificationsRoutes.get('/', listSpecifications.handle)

export { specificationsRoutes }
