# Telegram OTP Request

This Node.js script utilizes the Telegram Bot API to prompt users for OTP (One-Time Passwords). 

E.g., you can use it inside a playwright/Selenium automated script.
When an OTP challenge occurs in your automated workflow, this script prompts the user via Telegram to input the OTP and retrieves it for seamless integration into your automation.
Typically, this is a blocking wait to progress further into your workflow.

## Prerequisites

Before running the script, ensure you have the following:

- Node.js installed on your machine
- Telegram Bot token obtained from [@BotFather](https://t.me/BotFather)
- Telegram chat ID where the bot will send notifications

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/soraxas/telegram-request-code
   cd telegram-request-code
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```
   TELEGRAM_NOTIFIER_BOT_TOKEN=your_telegram_bot_token
   TELEGRAM_NOTIFIER_BOT_CHAT_ID=your_telegram_chat_id
   ```

   Replace `your_telegram_bot_token` with your actual Telegram bot token obtained from BotFather, and `your_telegram_chat_id` with the chat ID where request should be sent.

4. Run the script:

   ```bash
   node request_otp.js
   ```

## Usage

To request an OTP, you can call the `request_otp` function in your own scripts. Here's an example:

```javascript
const { request_otp } = require('./request_otp');

(async () => {
    try {
        const otp = await request_otp("[Custom OTP Prompt] Please enter the OTP here:");
        console.log(`Received OTP: ${otp}`);
    } catch (error) {
        console.error('Error requesting OTP:', error);
    }
})();
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
