import express from 'express';
import { getIdeasList } from '../controllers/getIdeasList';
import { postUserVote } from '../controllers/postUserVote';
import { validateIdeaIdSchema } from '../middlewares/validateIdeaId';
import { zodValidate } from '../utils/zodValidate';

const router = express.Router();

router.get('/api', getIdeasList);
router.post('/api/vote', zodValidate(validateIdeaIdSchema), postUserVote);

export default router;
