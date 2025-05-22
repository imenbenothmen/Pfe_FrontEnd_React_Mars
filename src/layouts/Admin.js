import React from "react";
import { Switch, Redirect } from "react-router-dom";


// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import ProductCategoryManager from "views/admin/ProductCategoryManager.js";
import OrderAndComplaintManagement from "views/admin/OrderAndComplaintManagement.js";

// routes 
// 🔐 Import de la route protégée admin
import PrivateRouteAdmin from "routes/PrivateRouteAdmin";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
        <AdminNavbar />
        <HeaderStats />

        {/* Main content area that grows */}
        <div className="flex-grow px-4 md:px-10 mx-auto w-full py-4">
          <Switch>
            <PrivateRouteAdmin path="/admin/dashboard" exact component={Dashboard} />
            <PrivateRouteAdmin path="/admin/maps" exact component={Maps} />
            <PrivateRouteAdmin path="/admin/settings" exact component={Settings} />
            <PrivateRouteAdmin path="/admin/tables" exact component={Tables} />
            <PrivateRouteAdmin path="/admin/produits-categories" exact component={ProductCategoryManager} />
            <PrivateRouteAdmin path="/admin/commandes-reclamations" exact component={OrderAndComplaintManagement} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </div>

        {/* Footer always at the bottom */}
        <FooterAdmin />
      </div>
    </>
  );
}
