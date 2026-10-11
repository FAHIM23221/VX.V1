(() => {
  "use strict";

  const API_URL = "https://lexora-ai-tutor.onrender.com";

  function init() {
    const config = document.querySelector(".tutor-config");
    const urlInput = document.getElementById("tutorApiUrl");
    const status = document.getElementById("tutorStatus");
    const intro = document.querySelector("#tutorView > p.muted");

    // Keep the existing tutor JavaScript working.
    if (urlInput) {
      urlInput.value = API_URL;
      urlInput.readOnly = true;
      try {
        localStorage.setItem("lexora_tutor_api_url", API_URL);
      } catch (_) {}
    }

    // Hide backend setup from ordinary users.
    if (config) config.style.display = "none";

    if (intro) {
      intro.textContent =
        "বাংলায় প্রশ্ন করো, English sentence বুঝে নাও, অথবা নিজের লেখা sentence ঠিক করো।";
    }

    if (status) {
      status.textContent =
        "Lexora AI Tutor প্রস্তুত। এখন সরাসরি প্রশ্ন করতে পারো।";
    }

    // Render Markdown safely in tutor messages.
    function formatMessage(node) {
      if (!node || node.dataset.formatted === "yes") return;

      let source = node.textContent;
      const code = [];

      source = source
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      source = source.replace(/`([^`\n]+)`/g, (_, text) => {
        code.push("<code>" + text + "</code>");
        return "\u0000" + (code.length - 1) + "\u0000";
      });

      source = source
        .replace(/^### (.+)$/gm, "<h4>$1</h4>")
        .replace(/^## (.+)$/gm, "<h3>$1</h3>")
        .replace(/^# (.+)$/gm, "<h3>$1</h3>")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*\n]+)\*/g, "<em>$1</em>");

      const lines = source.split("\n");
      const output = [];
      let listOpen = false;

      for (const line of lines) {
        const item = /^\s*[-*]\s+(.+)$/.exec(line);

        if (item) {
          if (!listOpen) {
            output.push("<ul>");
            listOpen = true;
          }
          output.push("<li>" + item[1] + "</li>");
        } else {
          if (listOpen) {
            output.push("</ul>");
            listOpen = false;
          }

          if (line.trim()) {
            if (/^<(h3|h4)>/.test(line)) {
              output.push(line);
            } else {
              output.push("<p>" + line + "</p>");
            }
          }
        }
      }

      if (listOpen) output.push("</ul>");

      node.innerHTML = output.join("").replace(
        /\u0000(\d+)\u0000/g,
        (_, index) => code[Number(index)] || ""
      );

      node.dataset.formatted = "yes";
    }

    const chat = document.getElementById("tutorChat");

    if (chat) {
      chat.querySelectorAll(".tutor-msg.assistant").forEach(formatMessage);

      new MutationObserver(records => {
        records.forEach(record => {
          record.addedNodes.forEach(node => {
            if (node.nodeType !== 1) return;

            if (node.matches(".tutor-msg.assistant")) {
              formatMessage(node);
            }

            node.querySelectorAll?.(".tutor-msg.assistant")
              .forEach(formatMessage);
          });
        });
      }).observe(chat, { childList: true, subtree: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
