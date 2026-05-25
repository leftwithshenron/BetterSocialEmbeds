export default (() => {
  let unintercept;

  return {
    onLoad() {
      const intercept = window.shelter?.http?.intercept;
      if (!intercept) {
        console.warn("[BetterSocialEmbeds] Shelter interceptor not found.");
        return;
      }

      unintercept = intercept(
        "post",
        /\/channels\/\d+\/messages/,
        (req, send) => {
          if (req?.body?.content && typeof req.body.content === "string") {
            try {
              let c = req.body.content;
              c = c.replace(/https?:\/\/(?:www\.)?(?:twitter|x)\.com([^\s]+)/gi, "https://fixupx.com$1");
              c = c.replace(/https?:\/\/(?:www\.)?instagram\.com([^\s]+)/gi, "https://www.vxinstagram.com$1");
              c = c.replace(/https?:\/\/(?:[a-z0-9]+\.)?tiktok\.com([^\s]+)/gi, "https://tnktok.com$1");
              req.body.content = c;
            } catch (e) {
              console.error("[BetterSocialEmbeds] Regex error:", e);
            }
          }
          return send(req);
        }
      );
    },
    onUnload() {
      unintercept?.();
    }
  };
})();
