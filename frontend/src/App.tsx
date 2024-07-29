import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryPage from "./app/admin/pages/categoryPage";
import UserPage from "./app/admin/pages/userPage";
import MenuPage from "./app/admin/pages/menuPage";
import AdminPage from "./app/admin/pages/adminPage";
import RegisterPage from "./app/login/pages/registerPage";
import LoginPage from "./app/login/pages/loginPage";
import ForgotPasswordPage from "./app/login/pages/forgotPasswordPage";
import HomePage from "./app/home/pages/homePage";
import OrderPage from "./app/home/pages/orderPage";
import CartPage from "./app/home/pages/cartPage";
import HistoryPage from "./app/home/pages/historyPage";
import StatsPage from "./app/admin/pages/statsPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/cadastro",
    Component: RegisterPage,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordPage, 
  },
  {
    path:"/pedido/:id",
    Component:OrderPage,
  },
  {
    path:"/carrinho",
    Component: CartPage
  },
  {
    path:"/historico",
    Component: HistoryPage
  },
  {
    path: '/adm',
    children: [
      {
        path: '',
        Component: AdminPage,
      },
      {
        path: 'cardapio',
        Component: MenuPage,
      },
      {
        path: 'usuarios',
        Component: UserPage,
      },
      {
        path: 'categorias',
        Component: CategoryPage,
      },
      {
        path: 'estatisticas',
        Component: StatsPage
      }
    ]
  }, 
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
