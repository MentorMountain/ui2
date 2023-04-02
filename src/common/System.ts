import { blogHealthEndpoint } from "../blog/service/BlogService";
import { loginHealthEndpoint } from "../login/auth/LoginService";
import { questionsHealthEndpoint } from "../questions/service/QuestionsService";

let lastPreheat = 0;
const MIN_PREHEAT_WINDOW = 2000;

export async function systemPreheat() {
  if (Date.now() - lastPreheat >= MIN_PREHEAT_WINDOW) {
    blogHealthEndpoint();
    questionsHealthEndpoint();
    loginHealthEndpoint();
    lastPreheat = Date.now();
    console.log("Preheating")
  } else {
    console.log("Skipping preheat", Date.now() - lastPreheat)
  }
}
