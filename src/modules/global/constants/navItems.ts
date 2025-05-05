import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CorporateFareRoundedIcon from "@mui/icons-material/CorporateFareRounded";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CustomerOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MaterialOutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import VendorOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

const navItems = [
  { icon: DashboardOutlinedIcon, text: "MIS", path: "/mis" },
   {
    
    icon: CustomerOutlinedIcon,
    text: "Customer Management",
    path: "/customer",
    subLinks: [
      { text: "Dashboard", path: "/customer/dashboard" },
      { text: "Customer List", path: "/customer" },
      { text: "Orders", path: "/customer/orders" },      
      { text: "Loyalty & Rewards", path: "/customer/loyalty" },      
    ],
  },
  {
   
   icon: VendorOutlinedIcon,
   text: "Vendor Management",
   path: "/vendor",
   subLinks: [
     { text: "Dashboard", path: "/vendor/dashboard" },
     { text: "Vendor List", path: "/vendor" },
     { text: "Payments", path: "/vendor/payments" },    
    
   ],
 },
  {    
    icon: MaterialOutlinedIcon,
    text: "Master",
    path: "/master",
    subLinks: [
      { text: "Material", path: "/master/material" },
      { text: "Warehouse", path: "/master/warehouse" },
      { text: "Tax", path: "/master/tax" },       
    ],
  },  
  { icon: GroupsOutlinedIcon, text: "Staff", path: "/staff" },
  {
    icon: MailIcon,
    text: "Notifications",
    path: "/notifications",
  },
  { icon: InboxIcon, text: "Logins", path: "/user-login" },
];

export default navItems;
