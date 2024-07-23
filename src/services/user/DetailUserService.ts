import prismaClient from "../../prisma"

type DetailUserRequest = {
    userId: string
}

class DetailUserService {
    async execute(params: DetailUserRequest) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: params.userId
            },
            select: {
                name: true,
                email: true,
                created_at: true,
                updated_at: true
            }
        })
        return user
    }
}

export { DetailUserService }