// Native Shelter Module Format for Remote Installation
const intercept = shelter?.http?.intercept;

function handleMessage(req, send) {
    try {
        if (req?.body?.content && typeof req.body.content === "string") {
            let newContent = req.body.content;

            // Clean regex for Twitter/X URLs
            const twitterRegex = /https?:\/\/(?:www\.)?(?:twitter|x)\.com([^\s]+)/gi;
            newContent = newContent.replace(twitterRegex, (match, path) => `https://fixupx.com${path}`);

            // Clean regex for Instagram URLs
            const instagramRegex = /https?:\/\/(?:www\.)?instagram\.com([^\s]+)/gi;
            newContent = newContent.replace(instagramRegex, (match, path) => `https://www.vxinstagram.com${path}`);

            // Clean regex for TikTok URLs
            const tiktokRegex = /https?:\/\/(?:[a-z0-9]+\.)?tiktok\.com([^\s]+)/gi;
            newContent = newContent.replace(tiktokRegex, (match, path) => `https://tnktok.com${path}`);

            // Apply modifications to the message content before it sends
            req.body.content = newContent;
        }
    } catch (e) {
        console.error("[BetterSocialEmbeds] Error intercepting message contents:", e);
    }

    return send(req);
}

// Global variable tracker to safely clean up the memory hook on unload
let unintercept;

export function onLoad() {
    if (intercept) {
        unintercept = intercept("post", /\/channels\/\d+\/messages/, handleMessage);
    }
}

export function onUnload() {
    if (unintercept) {
        unintercept();
    }
}
