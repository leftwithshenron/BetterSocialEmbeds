{
  onLoad() {
    // Safely pull the intercept function from shelter's global runtime object
    const intercept = shelter?.http?.intercept;
    if (!intercept) return;

    // Use the exact request interception logic from your GitHub example
    window.socialEmbedUnintercept = intercept(
      "post",
      /\/channels\/\d+\/messages/,
      (req, send) => {
        try {
          if (req?.body?.content && typeof req.body.content === "string") {
            let newContent = req.body.content;

            // Clean regex for Twitter/X URLs
            const twitterRegex = /https?:\/\/(?:www\.)?(?:twitter|x)\.com([^\s]+)/gi;
            newContent = newContent.replace(twitterRegex, (match, path) => `https://fixupx.com${path}`);

            // Clean regex for Instagram URLs
            const instagramRegex = /https?:\/\/(?:www\.)?instagram\.com([^\s]+)/gi;
            newContent = newContent.replace(instagramRegex, (match, path) => `https://www.vxinstagram.com${path}`);

            // Clean regex for TikTok URLs (handles www., vt., vm., etc.)
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
    );
  },

  onUnload() {
    // Safely remove the network hook when toggled off
    if (window.socialEmbedUnintercept) {
      window.socialEmbedUnintercept();
      delete window.socialEmbedUnintercept;
    }
  }
}
