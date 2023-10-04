import Router from "../utils/router";
import greetingController from "../controllers/greeting.controller";
import tokenController from "../controllers/token.controller";

export default (router: Router) => {
  router.get('/greetings', greetingController);

  router.post('/token', tokenController);
};
