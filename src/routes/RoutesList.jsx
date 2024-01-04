import React, { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { pathName } from "constants/index";

import { AuthGuard } from "guards";
import Loading from "container/Layouts/Loading";
const routes = [
  {
    path: pathName.HOME,
    component: React.lazy(() => import("container/PublicPage/PublicPage")),
  },
  {
    path: pathName.WRITING,
    component: React.lazy(() => import("container/Writing/Writing")),
    guard: AuthGuard,
  },

  {
    path: pathName.LOUNGE_Test_ID,

    component: React.lazy(() =>
      import("container/LoungeTestId/LoungeTestId")
    ),
    guard: AuthGuard,
  },

  {
    path: pathName.PERSONAL_PROFILE,
    component: React.lazy(() =>
      import("container/PersonalProfile/PersonalProfile")
    ),
    guard: AuthGuard,
  },
  {
    path: pathName.CREATE_Test,
    component: React.lazy(() =>
      import("container/CreateTest/CreateTest")
    ),
    guard: AuthGuard,
  },
  {
    path: pathName.SET_MEMBERSHIP,
    component: React.lazy(() =>
      import("container/SetMemberShip/SetMemberShip")
    ),
  },
  {
    path: pathName.TERMS,
    component: React.lazy(() =>
      import("container/PublicPage/StaticPage/TermsServices")
    ),
  },
  {
    path: pathName.PRIVACY,
    component: React.lazy(() =>
      import("container/PublicPage/StaticPage/Privacy")
    ),
  },
  {
    path: pathName.PROGRAM_POLICIES,
    component: React.lazy(() =>
      import("container/PublicPage/StaticPage/ProgramPolicies")
    ),
  },
  {
    path: pathName.USER_AGREEMENT,
    component: React.lazy(() =>
      import("container/PublicPage/StaticPage/UserAgreement")
    ),
  },
  {
    path: pathName.ABOUT_US,
    component: React.lazy(() =>
      import("container/PublicPage/StaticPage/AboutUs")
    ),
  },
  {
    path: pathName.FORBIDDEN,
    component: React.lazy(() => import("container/Error/Forbidden403")),
  },
  {
    path: "*",
    component: React.lazy(() => import("container/Error/ErrorPage404")),
  },
];
const renderRoutes = (routes) => {
  return routes?.map((route, idx) => {
    const Component = route.component;
    const Guard = route.guard || Fragment;
    return (
      <Route
        key={`routes-${idx}`}
        path={route.path}
        exact={true}
        strict={true}
        element={
          <Guard>
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          </Guard>
        }
      ></Route>
    );
  });
};

const RoutesList = () => {
  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default RoutesList;
