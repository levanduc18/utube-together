import AboutView from "@/views/AboutView.vue";
import ContactView from "@/views/ContactView.vue";
import RoomView from "@/views/RoomView.vue";
import TrendingView from "@/views/TrendingView.vue";
import LoginView from "@/views/LoginView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "@/views/SignupView.vue";
import store from "@/store";
import authApi from "@/api/authApi";
import RoomDetailView from "@/views/RoomDetailView.vue";
import NotFoundVue from "@/components/commons/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requireAuth: false },
  },
  {
    path: "/room",
    name: "room",
    component: RoomView,
  },
  {
    path: "/room/:id",
    name: "roomDetail",
    component: RoomDetailView,
  },
  {
    path: "/trending",
    name: "trending",
    component: TrendingView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requireAuth: false },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
    meta: { requireAuth: false },
  },
  { path: "/:pathMatch(.*)*", component: NotFoundVue },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // this will scroll to the top of the page each time you navigate through the roads
    return { x: 0, y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  //by default all views are not accessible & only accessible views are defined requireAuth: false;
  if (to.matched.some((route) => route.meta.requireAuth !== false)) {
    try {
      await authApi.getAuthenticated();
      store.dispatch("authentication/loginWithGoogle", {
        isAuthenticated: true,
      });
    } catch (error) {
      store.dispatch("authentication/loginWithGoogle", {
        isAuthenticated: false,
      });
    }
    let isLogger = store.getters["authentication/getAuthenticated"];
    if (isLogger !== true) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
