import React, { ReactElement } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { ScreenRoute } from "@src/types/Screen.routes.enum";
import { ExchangePageContainer } from "./ExchangePageContainer";
import { ProtectedRoute } from "@components/ProtectedRoute";
import { MainPage } from "@src/pages/MainPage";
import { WellsPage } from "@src/pages/WellsPage";
import { UsersPage } from "@src/pages/UsersPage";
import { LoginPage } from "@src/pages/LoginPage";
import { Layout } from "@components/Layout";
import { MapPage } from "@src/pages/MapPage";
import { OrgsPage } from "@src/pages/OrgsPage";

interface Props {}
// type Children = {
//   index?: boolean;
//   path?: string;
//   element: JSX.Element;
//   children?: Children[];
// };

type RouteData = {
  link: string;
  element?: ReactElement;
  children?: RouteObject[];
  isHidden?: boolean;
};

export const ExchangeRoutes: React.FC<Props> = () => {
  const getPages = (): RouteData[] => {
    return [
      {
        link: `${ScreenRoute.LOGIN}`,
        element: <LoginPage />,
      },
      // {
      //   link: `${ScreenRoute.MAP}`,
      //   element: <MapPage />,
      // },
      {
        link: `${ScreenRoute.MAIN}`,
        element: <Layout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <MainPage></MainPage>
              </ProtectedRoute>
            ),
          },
          {
            path: "users",
            element: (
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "wells",
            element: (
              <ProtectedRoute>
                <WellsPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "organizations",
            element: (
              <ProtectedRoute>
                <OrgsPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "map",
            element: (
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ];
  };

  const getRouteList = () => {
    const pages = getPages();
    const routeObjects: RouteObject[] = [];

    const mainRoute = `${ScreenRoute.MAIN}`;

    pages
      .filter((item) => !item.isHidden)
      .forEach((route) => {
        routeObjects.push({
          path: route.link,
          element: route.element,
          children: route.children,
        });
      });

    routeObjects.push({
      path: "*",
      element: <Navigate to={mainRoute} />,
    });

    return routeObjects;
  };

  const routes = useRoutes(getRouteList());

  return (
    <>
      <ExchangePageContainer>{routes}</ExchangePageContainer>
    </>
  );
};
