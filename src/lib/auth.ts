import {
  checkout,
  polar,
  portal,
  usage,
  // webhooks,
} from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, organization } from "better-auth/plugins";

import { db } from "@/db";

const polarClient = new Polar({
  accessToken: process.env.POLAR_DEV_TOKEN,
  // Use 'sandbox' if you're using the Polar Sandbox environment
  // Remember that access tokens, products, etc. are completely separated between environments.
  // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
  server: "sandbox",
});

export const auth = betterAuth({
  baseUrl: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin(),
    nextCookies(),
    organization(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: false,
      use: [
        checkout({
          products: [
            {
              productId: process.env.POLAR_FREE_PRODUCT_ID || "",
              slug: "free",
            },
            {
              productId: process.env.POLAR_PRO_PRODUCT_ID || "",
              slug: "pro",
            },
            {
              productId: process.env.POLAR_ENTERPRISE_PRODUCT_ID || "",
              slug: "enterprise",
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: false, // Allow checkout before auth for org creation
        }),
        portal(),
        usage(),
        // webhooks({
        //     secret: process.env.POLAR_WEBHOOK_SECRET,
        //     onCustomerStateChanged: (payload) => // Triggered when anything regarding a customer changes
        //     onOrderPaid: (payload) => // Triggered when an order was paid (purchase, subscription renewal, etc.)
        //     ...  // Over 25 granular webhook handlers
        //     onPayload: (payload) => // Catch-all for all events
        // })
      ],
    }),
  ],
});
