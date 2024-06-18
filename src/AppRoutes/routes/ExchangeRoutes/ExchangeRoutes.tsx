import React, { ReactElement } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { ScreenRoute } from "@src/types/Screen.routes.enum";
import { ExchangePageContainer } from "./ExchangePageContainer";
import { ProtectedRoute } from "@components/ProtectedRoute";
import { MainPage } from "@src/pages/MainPage";
import { UsersPage } from "@src/pages/UsersPage";
import { LoginPage } from "@src/pages/LoginPage";
import { Layout } from "@components/Layout";

type Children =
  | {
      index: boolean;
      element: JSX.Element;
    }
  | {
      path: string;
      element: JSX.Element;
    };

type RouteData = {
  link: string;
  element?: ReactElement;
  children?: Children[];
  isHidden?: boolean;
};

export const ExchangeRoutes: React.FC = () => {
  const getPages = (): RouteData[] => {
    return [
      {
        link: `${ScreenRoute.LOGIN}`,
        element: <LoginPage />,
      },
      {
        link: `${ScreenRoute.MAIN}`,
        element: <Layout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <MainPage />
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
        ],
      },
    ];
    // return [
    //   {
    //     link: `${ScreenRoute.LOGIN}`,
    //     element: <LoginPage />,
    //   },
    //   {
    //     link: `${ScreenRoute.MAIN}`,
    //     element: (
    //       <ProtectedRoute>
    //         <MainPage />
    //       </ProtectedRoute>
    //     ),
    //   },
    //   {
    //     link: `${ScreenRoute.USERS}`,
    //     element: <UsersPage />,
    //   },
    // ];
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
