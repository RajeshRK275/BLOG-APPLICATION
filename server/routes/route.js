import Express  from "express";

import { signupUser } from "../controller/user-controller.js";

const router = Express.Router();


router.post('/signup', signupUser);



export default router;





