import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    // mode: 'history',
    base: __dirname,
    routes: [{
            path: "*",
            redirect: "/",
            hidden: true
        },
        {
            path: "/",
            redirect: "/home"
        },
        {
          path: "/home",
          name: "home",
          component: () =>
              import ( /* webpackChunkName: "Home" */ "../views/home.vue")
      },
      {
          path: "/rank",
          name: "rank",
          component: () =>
              import ( /* webpackChunkName: "Home" */ "../views/rank.vue")
      },
      {
          path: "/record",
          name: "record",
          component: () =>
              import ( /* webpackChunkName: "Home" */ "../views/record.vue")
      },
      {
          path: "/myrecord",
          name: "myrecord",
          component: () =>
              import ( /* webpackChunkName: "Home" */ "../views/myrecord.vue")
      },
      {
          path: "/end",
          name: "end",
          component: () =>
              import ( /* webpackChunkName: "Home" */ "../views/end.vue")
      },
      {
          path: "/question",
          name: "question",
          component: () =>
              import ( /* webpackChunkName: "Home" */ "../views/question.vue")
      },
      {
          path: "/match",
          name: "match",
          component: () =>
              import ( /* webpackChunkName: "Home" */ "../views/match.vue")
      }
    ]
});

// router.beforeEach((route, redirect, next) => {
//     if (route.name === "login") {
//         next();
//     } else {
//         if (localStorage.accessToken) {
//             next()
//         } else {
//             next("login")
//         }
//     }
// })

export default router;