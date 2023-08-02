# Shopify App Template - Remix (Typescript)

This is a Typescript fork of the [Remix](https://remix.run) template used by the Shopify CLI to create new apps. There are some opinions integrated into this template outlined below. The [official template is here](https://github.com/Shopify/shopify-app-template-remix). Please submit bugs or pull requests!

## Opinions & Decisions

Remix is very much a typescript-first framework. However, the official Shopify template for the Remix framework is Javascript-based, and an alternative should
exist for those who want to use Typescript out of the gate. This template utilizes Typescript as much as possible.

In previous iterations of the Shopify CLI app template, Express was used as the backend HTTP server. This template maintains that paradigm to
increase flexibility and customization on the server side. `server/index.js` implements a vanilla Express server with hooks to Remix -> Shopify.
If you prefer to use the default, edit the `[commands]` section of the `shopify.web.toml` file to call `npm exec remix dev`.

The default client and server build directories have been moved into `/.remix/build`. Similarly, the Remix cache has been moved to `/.remix/cache`. Of course, you can change these locations in `/remix.config.js` as needed.

Other directory structure decisions moved the Prisma database client (`db.server.ts`) and Shopify context (`shopify.server.js`) into `/app/shared`. And so Babel/eslint, as configured by Remix, plays nice when building JSON imports, the i18n files for the PolarisAppProvider have been added to `/app/shared/locales`.
