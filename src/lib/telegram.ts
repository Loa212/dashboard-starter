type ParseMode = "HTML" | "MarkdownV2";

export interface TelegramMessageOptions {
	botToken: string | undefined;
	chatId: string | undefined;
	text: string;
	parseMode?: ParseMode;
	link?: {
		text: string;
		url: string;
	};
	disableNotification?: boolean;
}

/**
 * Sends a Telegram message using the Bot API.
 * Supports optional inline link buttons and parse modes.
 */
export async function sendTelegramMessage({
	botToken,
	chatId,
	text,
	parseMode,
	link,
	disableNotification,
}: TelegramMessageOptions) {
	if (!botToken || !chatId) {
		throw new Error("Telegram bot token or chat ID is not defined");
	}

	const res = await fetch(
		`https://api.telegram.org/bot${botToken}/sendMessage`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text,
				parse_mode: parseMode,
				disable_notification: disableNotification,
				reply_markup: link
					? {
							inline_keyboard: [[{ text: link.text, url: link.url }]],
						}
					: undefined,
			}),
		},
	);

	if (!res.ok) {
		const body = await res.text();
		throw new Error(`Telegram send failed: ${res.status} ${body}`);
	}
}
