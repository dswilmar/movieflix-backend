import prismaClient from "../../prisma"

type UserRequest = {
    name: string
    email: string
    password: string
}

class CreateUserService {
    async execute(params: UserRequest) {
        
        if (!params.email) {
            throw new Error('Email inválido')
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: params.email
            }
        })

        if (userAlreadyExists) {
            throw new Error(`E-mail ${params.email} já cadastrado no sistema`)
        }

        const user = await prismaClient.user.create({
            data: {
                name: params.name,
                email: params.email,
                password: params.password
            },
            select: {
                id: true,
                name: true,
                created_at: true,
                updated_at: true
            }
        })

        return user
    }
}

export { CreateUserService }