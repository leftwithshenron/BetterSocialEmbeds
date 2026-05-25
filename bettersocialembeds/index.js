export default {
  onLoad() {
    console.log("[BetterSocialEmbeds] Attempting to load...");
    
    if (!window.shelter || !window.shelter.http || !window.shelter.http.intercept) {
      console.error("[BetterSocialEmbeds] Shelter interceptor missing");
      return;
    }

    this.unintercept = window.shelter.http.intercept(
      "post",
      /\/channels\/\d+\/messages/,
      (req, send) => {
        if (req.body && typeof req.body.content === "string") {
          // Simplified replacement logic
          req.body.content = req.body.content
            .replace(/twitter\.com/gi, "fixupx.com")
            .replace(/x\.com/gi, "fixupx.com")
            .replace(/instagram\.com/gi, "vxinstagram.com")
            .replace(/tiktok\.com/gi, "tnktok.com");
        }
        return send(req);
      }
    );
  },

  onUnload() {
    if (this.unintercept) this.unintercept();
  }
};
