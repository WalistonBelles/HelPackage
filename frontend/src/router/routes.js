import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";

// Dashboard
const Dashboard = () => import("@/pages/Dashboard.vue");

// Material
const NewProduct = () => import("@/pages/Material/NewProduct.vue");
const Classification = () => import("@/pages/Material/Classification.vue");
const Manage = () => import("@/pages/Material/Manage.vue");

// Analise
const Analyze = () => import("@/pages/Analyze/Analyze.vue");

// Estoque
const Stock = () => import("@/pages/Stock/Stock.vue");

// Free Pages
const Login = () => import("@/pages/Login.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "material/newProduct",
        name: "newProduct",
        component: NewProduct
      },
      {
        path: "material/classification",
        name: "classification",
        component: Classification
      },
      {
        path: "material/manage",
        name: "manage",
        component: Manage
      },
      {
        path: "analyze/analyze",
        name: "analyze",
        component: Analyze
      },
      {
        path: "material/manage",
        name: "manage",
        component: Manage
      },
      {
        path: "stock/stock",
        name: "stock",
        component: Stock
      },
    ]
  },
  {
    path: "/login",
    component: Login
  },
  { 
    path: "*", 
    component: NotFound 
  },
];

export default routes;
