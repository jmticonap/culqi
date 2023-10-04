import Router from "../utils/router";
import greetingController from "../controllers/greeting.controller";

export default (router: Router) => {
  router.get('/greetings', greetingController);
};
