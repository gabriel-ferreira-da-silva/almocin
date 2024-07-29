import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const listItemAdmin = [
    { text: "Boas vindas", icon: DashboardIcon, url: "/adm/" },
    { text: "Cardápio", icon: ShoppingCartIcon, url: "/adm/cardapio" },
    { text: "Usuário", icon: PeopleIcon, url: "/adm/usuarios" },
    { text: "Estatísticas", icon: BarChartIcon, url: "/adm/estatisticas" },
    { text: "Categoria", icon: AssignmentIcon, url: "/adm/categorias" },
];

export const listItemUser = [
    { text: "Cardápio", icon: DashboardIcon, url: "/" },
    { text: "Histórico", icon: HistoryIcon, url: "/historico" },
    { text: "Carrinho", icon: ShoppingCartIcon, url: "/carrinho" },
];