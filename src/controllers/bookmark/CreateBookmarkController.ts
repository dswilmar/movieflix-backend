import { Request, Response } from "express";
import { CreateBookmarkService } from "../../services/bookmark/CreateBookmarkService";

class CreateBookmarkController {
    async handle(req: Request, res: Response) {
        const { movieId, movieTitle, moviePosterPath } =  req.body
        const userId = req.userId
        const createBookmarkService = new CreateBookmarkService()
        const bookmark = await createBookmarkService.execute({userId, movieId, movieTitle, moviePosterPath})
        return res.json(bookmark)
    }
}

export { CreateBookmarkController }