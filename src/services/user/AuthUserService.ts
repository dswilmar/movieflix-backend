import { compare } from "bcryptjs"
import prismaClient from "../../prisma"
import { sign } from "jsonwebtoken"

type AuthRequest = {
    email: string
    password: string
}

class AuthUserService {
    
    async execute(params: AuthRequest) {
        const user = await prismaClient.user.findFirst({
            where: {
                email: params.email
            }
        })

        if (!user) {
            throw new Error('Usuário e/ou senha inválidos')
        }

        const passwordMatch = await compare(params.password, user.password)
        if (!passwordMatch) {
            throw new Error('Usuário e/ou senha inválidos')
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            }, 
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token
        }
    }
}

export { AuthUserService }