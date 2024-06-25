const TelegramBot = require("node-telegram-bot-api");

async function request_otp(prompt) {
    prompt = prompt || "[OTP Needed] Please enter the OTP here.";

    for (const env of [
        "TELEGRAM_NOTIFIER_BOT_CHAT_ID",
        "TELEGRAM_NOTIFIER_BOT_TOKEN",
    ]) {
        if (process.env[env] === undefined) {
            console.log(`Missing environment variable ${env}`);
            process.exit(1);
            throw new Error();
        }
    }

    // // replace the value below with the Telegram token you receive from @BotFather
    const token = process.env.TELEGRAM_NOTIFIER_BOT_TOKEN;
    const target_chat_id = process.env.TELEGRAM_NOTIFIER_BOT_CHAT_ID;

    // Create a bot that uses 'polling' to fetch new updates
    const bot = new TelegramBot(token, {
        polling: true,
        request: {
            agentOptions: {
                keepAlive: true,
                family: 4,
            },
        },
    });

    var opts = {
        reply_markup: JSON.stringify({
            force_reply: true,
        }),
    };

    return new Promise((resolve) => {
        bot.sendMessage(target_chat_id, prompt, opts).then((res) => {
            // console.log(res);
            bot.onReplyToMessage(res.chat.id, res.message_id, (reply) => {
                // console.log(reply);
                const code = reply.text.trim();
                console.log(code);
                bot.stopPolling().then(() => {
                    bot.sendMessage(res.chat.id, "Got it, thanks!");
                    return code;
                });
            });
        });
    });
}

// (async () => {
//     const text = await request_otp();
//     console.log(`Got code ${text}`);
// })();
