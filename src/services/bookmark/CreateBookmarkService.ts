import prismaClient from "../../prisma"

type BookmarkRequest = {
    userId: string
    movieId: number
    movieTitle: string
    moviePosterPath: string
}

class CreateBookmarkService {
    async execute(params: BookmarkRequest) {

        const bookmarkAlreadyExists = await prismaClient.bookmark.findFirst({
            where: {
                user_id: params.userId,
                movie_id: Number(params.movieId)
            }
        })
        
        if (bookmarkAlreadyExists) {
            throw new Error('Favorito já está na coleção deste usuário')
        }

        const bookmark = await prismaClient.bookmark.create({
            data: {
                user_id: params.userId,
                movie_id: Number(params.movieId),
                movie_title: params.movieTitle,
                movie_poster_path: params.moviePosterPath

            }
        })
        return bookmark
    }
}

export { CreateBookmarkService }