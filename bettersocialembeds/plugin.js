export default {
  onLoad() {
    console.log("[BetterSocialEmbeds] Loaded");

    const origSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function(body) {
      try {
        if (typeof body === "string") {
          body = body.replace(
            /https?:\/\/(?:www\.)?(?:twitter|x)\.com([^\s]+)/gi,
            "https://fixupx.com$1"
          );

          body = body.replace(
            /https?:\/\/(?:www\.)?instagram\.com([^\s]+)/gi,
            "https://www.vxinstagram.com$1"
          );

          body = body.replace(
            /https?:\/\/(?:[a-z0-9]+\.)?tiktok\.com([^\s]+)/gi,
            "https://tnktok.com$1"
          );
        }
      } catch (e) {
        console.error("[BetterSocialEmbeds]", e);
      }

      return origSend.call(this, body);
    };

    this.unpatch = () => {
      XMLHttpRequest.prototype.send = origSend;
    };
  },

  onUnload() {
    this.unpatch?.();
    console.log("[BetterSocialEmbeds] Unloaded");
  }
};
