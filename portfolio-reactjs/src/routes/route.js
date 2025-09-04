// src/routes.js

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Portfolio from "../pages/Portfolio";
import Services from "../pages/Services";
import Skills from "../pages/Skills";

import AdminLayout from "../Layout/admin/Layout";
import Siteadmin from "../pages/Admin/Siteadmin";
import UsersList from "../pages/Admin/users/List";
import UsersCreate from "../pages/Admin/users/Form";

import SkillsList from "../pages/Admin/skills/List";
import SkillsCreate from "../pages/Admin/skills/Form";


import Login from "../pages/Admin/Login";

const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    exact: true,
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    exact: true,
    name: "Contact",
    component: Contact,
  },
  {
    path: "/portfolio",
    exact: true,
    name: "Portfolio",
    component: Portfolio,
  },
  {
    path: "/services",
    exact: true,
    name: "Services",
    component: Services,
  },
  {
    path: "/skills",
    exact: true,
    name: "Skills",
    component: Skills,
  },
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminLayout,
    routes: [
      {
        path: "/admin/dashboard",
        exact: true,
        name: "Dashboard",
        component: Siteadmin,
      },
      {
        path: "/admin/users",
        exact: true,
        name: "Users",
        component: UsersList,
      },
      {
        path: "/admin/users/create",
        exact: true,
        name: "Create User",
        component: UsersCreate,
      },

      {
        path: "/admin/skills",
        exact: true,
        name: "Create User",
        component: SkillsList,
      },

      {
        path: "/admin/skills/create",
        exact: true,
        name: "Create User",
        component: SkillsCreate,
      },
    ],
  },
];

export default routes;
