import { type LoaderArgs } from "@remix-run/node";
import { authenticate } from "~/shared/shopify.server.ts";

export async function loader({ request }: LoaderArgs) {
  await authenticate.admin(request);

  return null;
}
