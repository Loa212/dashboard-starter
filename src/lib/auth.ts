import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { Pool } from "pg";
import { sendTelegramMessage } from "./telegram";

export const auth = betterAuth({
	database: new Pool({
		connectionString: process.env.DATABASE_URL,
	}),

	emailAndPassword: {
		enabled: true,
	},

	plugins: [
		tanstackStartCookies(),
		magicLink({
			sendMagicLink: async ({ email, url }) => {
				if (process.env.NODE_ENV === "development") {
					console.log(`[LOCALNET] Magic link for ${email}: ${url}`);
				}
				// send email to user
				sendTelegramMessage({
					botToken: process.env.TELEGRAM_BOT_TOKEN,
					chatId: process.env.TELEGRAM_CHAT_ID,
					text: `Hello! Click the link to sign in: ${url}`,
				}).catch((err) => {
					console.error("Failed to send Telegram message:", err);
				});
			},
		}),
	],
});
