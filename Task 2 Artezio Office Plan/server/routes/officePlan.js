import { Router } from "express"
import { freeWorkspaces, allWorkspaces} from '../controllers/officePlan.js'

const router = new Router()

// Unoccupied workspaces
router.get('/free', freeWorkspaces)

// All workspaces
router.get('/all', allWorkspaces)

export default router