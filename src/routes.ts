import {Router, Request, Response} from 'express'

const router = Router()
router.get('/users', (req: Request, res: Response) => {
    throw new Error('Erro de testes')
    res.json({
        ok: true
    })
})

export { router }