

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Draft from "layouts/draft"
import Delivery from "layouts/onDelivery"
import Delivered from "layouts/delivered"
import Installed from "layouts/installed"
import Detail from "layouts/detail"

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Draft",
    key: "draft",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/draft",
    component: <Draft />,
  },
  {
    type: "collapse",
    name: "On Delivery",
    key: "onDelivery",
    icon: <Icon fontSize="small">local_shipping</Icon>,
    route: "/onDelivery",
    component: <Delivery />,
  },
  {
    type: "collapse",
    name: "Delivered",
    key: "delivered",
    icon: <Icon fontSize="small">inventory2</Icon>,
    route: "/delivered",
    component: <Delivered />,
  },
  {
    type: "collapse",
    name: "Installed",
    key: "installed",
    icon: <Icon fontSize="small">check_circle</Icon>,
    route: "/installed",
    component: <Installed />,
  },
  {
    // type: "collapse",
    // name: "Detail",
    // key: "detail",
    // icon: <Icon fontSize="small">inventory2</Icon>,
    route: "/detail*",
    component: <Detail />,
    hidden: true,
    display: "none"
  },
];

export default routes;
