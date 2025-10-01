import express from 'express';
import { getIdeasList } from '../controllers/getIdeasList';

const router = express.Router();

router.get('/', getIdeasList);
// router.post("/vote", postUsersVote);

export default router;
