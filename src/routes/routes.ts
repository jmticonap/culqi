import Router from "../utils/router";
import greetingController from "../controllers/greeting.controller";
import TokenController from "../controllers/token.controller";

export default (router: Router) => {
  router.get('/greetings', greetingController);

  const tokenController = new TokenController();
  router.post('/token', tokenController.signing);
  router.get('/get_card', tokenController.getCard)
};
