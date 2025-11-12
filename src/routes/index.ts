import { Router } from 'express';

import Paths from '@src/common/constants/Paths';
import UserRoutes from './UserRoutes';
import { getDb } from '@src/db/mongo';


/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();
apiRouter.post('/submit', async (req, res) => {
    try {
        const db = getDb();
        const result = await db.collection(process.env.DB ?? 'monkeytype').insertOne(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding typing test');
    }
})


// ** Add UserRouter ** //

// Init router
const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);


/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
