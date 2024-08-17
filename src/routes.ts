import { Router } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middleware/isAuthenticated'
import { CreateBookmarkController } from './controllers/bookmark/CreateBookmarkController'

const router = Router()

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)
router.post('/bookmarks', isAuthenticated, new CreateBookmarkController().handle)

export { router }