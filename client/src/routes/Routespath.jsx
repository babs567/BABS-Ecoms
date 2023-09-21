import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Collections,
  Home,
  ProductDetails,
  Bag,
  Checkout,
  Account,
  SavedItem,
  Profile,
  ManageProduct,
  CreateProduct,
  Search,
  Shoporders,
  Orderdetail,
  Order,
} from "../pages";
import ProtectedRoutes from "./ProtectedRoutes";
import Categories from "../pages/Categories";
import { Root, Error } from "../components";

export default function Routespath() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/collections",
          element: <Collections />,
          children: [
            {
              path: ":collectionName",
              element: <Categories />,
            },
            {
              path: ":collectionName/:slug",
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "bag",
          element: <Bag />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "search",
          element: <Search />,
        },

        {
          path: "account",
          element: (
            <ProtectedRoutes>
              <Account />
            </ProtectedRoutes>
          ),

          children: [
            {
              path: ":username/orders",
              element: <Order />,
              children: [
                {
                  path: ":orderId",
                  element: <Orderdetail />,
                },
              ],
            },
            {
              path: ":username/saveditems",
              element: <SavedItem />,
            },
            {
              path: "user-profile/:username",
              element: <Profile />,
            },
            {
              path: "allorders",
              element: <Shoporders />,
            },
            {
              path: "manage-product",
              element: <ManageProduct />,
            },
            {
              path: "add-new-product",
              element: <CreateProduct />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
