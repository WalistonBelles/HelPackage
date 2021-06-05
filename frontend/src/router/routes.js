import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";

// Dashboard
const Dashboard = () => import("@/pages/Dashboard.vue");

// Material
const NewProduct = () => import("@/pages/Material/NewProduct.vue");

// Free Pages
const Login = () => import("@/pages/Login.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "login",
        name: "login",
        component: Login
      },
      {
        path: "material/newProduct",
        name: "newProduct",
        component: NewProduct
      },
    ]
  },
  { path: "*", component: NotFound },
];

export default routes;
