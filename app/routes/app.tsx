import React from "react";
import { type LoaderArgs, json, type HeadersArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import polarisStyles from "@shopify/polaris/build/esm/styles.css"

import { boundary } from "@shopify/shopify-app-remix";
import { authenticate } from "~/shared/shopify.server.ts";
import { type LinkLikeComponent } from "@shopify/polaris/build/ts/src/utilities/link/types.js";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export async function loader({ request }: LoaderArgs) {
  await authenticate.admin(request);
  return json({
    polarisTranslations: import("~/shared/locales/en.json"),
    apiKey: process.env.SHOPIFY_API_KEY,
  });
}

export default function App() {
  const { apiKey, polarisTranslations } = useLoaderData();

  return (
    <>
      <script
        src="https://cdn.shopify.com/shopifycloud/app-bridge.js"
        data-api-key={apiKey}
      />
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/additional">Additional page</Link>
      </ui-nav-menu>
      <PolarisAppProvider
        i18n={polarisTranslations}
        linkComponent={RemixPolarisLink as LinkLikeComponent}
      >
        <Outlet />
      </PolarisAppProvider>
    </>
  );
}

const RemixPolarisLink = React.forwardRef((props: any, ref) => (

  <Link {...props} to={props.url ?? props.to} ref={ref}>
    {props.children}
  </Link>

));

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs: HeadersArgs) => {
  return boundary.headers(headersArgs);
};
