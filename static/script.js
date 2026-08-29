const $ = (id) => document.getElementById(id);
const html         = document.documentElement;
const sidebar      = $("sidebar");
const overlay      = $("sidebarOverlay");
const menuBtn      = $("menuBtn");
const sidebarClose = $("sidebarClose");
const themeToggle  = $("themeToggle");
const clearChatBtn = $("clearChatBtn");
const newChatBtn   = $("newChatBtn");
const welcome      = $("welcome");
const chat         = $("chat");
const messagesEl   = $("messages");
const composer     = $("composer");
const input        = $("input");
const sendBtn      = $("sendBtn");
const counter      = $("counter");

let isSending = false;

/* ---------- Theme (persisted) ---------- */
(function initTheme() {
  const saved = localStorage.getItem("medibot-theme");
  if (saved === "dark" || saved === "light") {
    html.setAttribute("data-theme", saved);
  }
})();
themeToggle.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("medibot-theme", next);
});

/* ---------- Sidebar (mobile) ---------- */
const openSidebar  = () => { sidebar.classList.add("open"); overlay.classList.add("show"); };
const closeSidebar = () => { sidebar.classList.remove("open"); overlay.classList.remove("show"); };
menuBtn.addEventListener("click", openSidebar);
sidebarClose.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

/* ---------- Suggestions ---------- */
document.querySelectorAll(".suggestion").forEach((btn) => {
  btn.addEventListener("click", () => sendMessage(btn.dataset.prompt));
});

/* ---------- Composer: auto-resize + counter ---------- */
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 160) + "px";
  counter.textContent = input.value.length;
});

/* ---------- Submit ---------- */
composer.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage(input.value);
});

/* Enter to send, Shift+Enter for newline */
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage(input.value);
  }
});

/* Keyboard shortcuts */
document.addEventListener("keydown", (e) => {
  const mod = e.ctrlKey || e.metaKey;
  if (mod && e.key.toLowerCase() === "k") { e.preventDefault(); startNewChat(); }
  if (mod && e.key.toLowerCase() === "l") { e.preventDefault(); clearChat(); }
});

/* ---------- New chat / Clear ---------- */
newChatBtn.addEventListener("click", () => { startNewChat(); closeSidebar(); });
clearChatBtn.addEventListener("click", clearChat);

function startNewChat() {
  messagesEl.innerHTML = "";
  welcome.style.display = "";
  input.value = ""; counter.textContent = "0";
  input.focus();
}
function clearChat() {
  messagesEl.innerHTML = "";
  welcome.style.display = "";
}

/* ---------- Time helper ---------- */
function timestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* ---------- Render a message ---------- */
function addMessage({ role, text, isError = false }) {
  welcome.style.display = "none";

  const wrap = document.createElement("div");
  wrap.className = `msg ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "msg-avatar";
  avatar.textContent = role === "user" ? "🧑" : "✚";

  const body = document.createElement("div");
  body.className = "msg-body";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  const meta = document.createElement("div");
  meta.className = "msg-meta";
  meta.innerHTML = `<span>${timestamp()}</span>`;

  if (role === "ai" && !isError) {
    const actions = document.createElement("div");
    actions.className = "msg-actions";

    const copyBtn    = actionBtn("📋", "Copy");
    const likeBtn    = actionBtn("👍", "Like");
    const dislikeBtn = actionBtn("👎", "Dislike");

    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "✓";
        setTimeout(() => (copyBtn.textContent = "📋"), 1200);
      } catch (_) {}
    });
    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("active");
      dislikeBtn.classList.remove("active");
    });
    dislikeBtn.addEventListener("click", () => {
      dislikeBtn.classList.toggle("active");
      likeBtn.classList.remove("active");
    });

    actions.append(copyBtn, likeBtn, dislikeBtn);
    meta.appendChild(actions);
  }

  body.append(bubble, meta);
  wrap.append(avatar, body);
  messagesEl.appendChild(wrap);
  scrollToBottom();
  return wrap;
}

function actionBtn(label, title) {
  const b = document.createElement("button");
  b.className = "icon-btn";
  b.type = "button";
  b.title = title;
  b.setAttribute("aria-label", title);
  b.textContent = label;
  return b;
}

/* ---------- Typing indicator ---------- */
function showTyping() {
  const wrap = document.createElement("div");
  wrap.className = "msg ai typing";
  wrap.id = "typing";
  wrap.innerHTML = `
    <div class="msg-avatar">✚</div>
    <div class="msg-body">
      <div class="bubble">
        MediBot is thinking
        <span class="dots"><span></span><span></span><span></span></span>
      </div>
    </div>
  `;
  messagesEl.appendChild(wrap);
  scrollToBottom();
}
function hideTyping() {
  const t = $("typing");
  if (t) t.remove();
}

/* ---------- Scroll ---------- */
function scrollToBottom() {
  chat.scrollTop = chat.scrollHeight;
}

/* ---------- Loading state ---------- */
function setLoading(loading) {
  isSending = loading;
  input.disabled = loading;
  sendBtn.disabled = loading;
}

/* ---------- Send to backend ---------- */
async function sendMessage(raw) {
  const message = (raw || "").trim();
  if (!message || isSending) return;

  addMessage({ role: "user", text: message });
  input.value = ""; input.style.height = "auto"; counter.textContent = "0";

  setLoading(true);
  showTyping();

  try {
    const formData = new FormData();
    formData.append("msg", message);

    const res = await fetch("/get", {
       method: "POST",
       body: formData
});

if (!res.ok) {
    throw new Error("Server Error");
}

const answer = await res.text();

hideTyping();

addMessage({
    role: "ai",
    text: answer
});
  } catch (err) {
    hideTyping();
    addMessage({
      role: "ai",
      text: "Unable to connect to the server. Please try again.",
      isError: true
    });
  } finally {
    setLoading(false);
    input.focus();
  }
}


