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
                bookmarks: {
                    select: {
                        movie_id: true
                    }
                },
                created_at: true,
                updated_at: true
            }
        })
        if (!user) {
            throw new Error('Usuário inválido')
        }
        return user
    }
}

export { DetailUserService }