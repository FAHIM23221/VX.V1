/* Lexora AI Tutor add-on. Requires existing Firebase Auth and window.LEXORA_TUTOR_API. */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const base = () => String(window.LEXORA_TUTOR_API || "").replace(/\/+$/, "");

  function init() {
    const tabs = document.querySelector(".tabs");
    if (!tabs || $("tutorView")) return;
    const tab = document.createElement("button");
    tab.className = "tab"; tab.type = "button"; tab.dataset.view = "tutor"; tab.textContent = "AI Tutor";
    tabs.appendChild(tab);

    const panel = document.createElement("section");
    panel.id = "tutorView"; panel.className = "panel lexora-tutor"; panel.style.display = "none";
    panel.innerHTML = `
      <p class="kicker">LEXORA · AI ENGLISH TUTOR</p>
      <h2>চলো English practice করি</h2>
      <p class="muted">বাংলা বা English-এ প্রশ্ন করো, অথবা নিজের sentence ঠিক করো।</p>
      <label for="tutorLanguage">ব্যাখ্যার ভাষা</label>
      <select id="tutorLanguage" class="input"><option value="bn">বাংলা</option><option value="en">English</option></select>
      <div id="tutorMessages" class="lexora-tutor-messages" aria-live="polite"><div class="lexora-tutor-bubble tutor">হ্যালো! কী শিখতে চাও?</div></div>
      <form id="tutorChatForm"><label for="tutorMessage">তোমার প্রশ্ন বা sentence</label>
      <textarea id="tutorMessage" class="input" rows="3" maxlength="500" required placeholder="যেমন: Present tense কী?"></textarea>
      <div class="lexora-tutor-actions"><button class="btn primary" id="tutorSend" type="submit">Send</button>
      <button class="btn secondary" id="tutorCorrect" type="button">Sentence ঠিক করো</button></div></form>
      <p id="tutorStatus" class="lexora-tutor-status" role="status"></p>`;
    const anchor = $("coachView") || $("profileView");
    if (anchor) anchor.insertAdjacentElement("afterend", panel); else tabs.insertAdjacentElement("afterend", panel);

    function showMessage(text, who) {
      const el = document.createElement("div"); el.className = "lexora-tutor-bubble " + who;
      el.textContent = String(text || "উত্তর পাওয়া যায়নি।"); $("tutorMessages").appendChild(el);
      $("tutorMessages").scrollTop = $("tutorMessages").scrollHeight;
    }
    function setStatus(text, error=false) { $("tutorStatus").textContent=text||""; $("tutorStatus").dataset.error=String(error); }
    async function request(path, body) {
      if (!base()) throw new Error("Backend URL সেট করা হয়নি।");
      const auth = window.lexoraAuth || (window.firebase && firebase.auth ? firebase.auth() : null);
      if (!auth || !auth.currentUser) throw new Error("প্রথমে Lexora-তে Login করো।");
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(base()+path, {method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify(body)});
      const data = await res.json().catch(()=>({}));
      if (!res.ok) throw new Error(data.error || `Backend error (${res.status})`);
      return data;
    }
    $("tutorChatForm").addEventListener("submit", async e => {
      e.preventDefault(); const field=$("tutorMessage"), message=field.value.trim(); if(!message)return;
      showMessage(message,"user"); field.value=""; $("tutorSend").disabled=true; setStatus("উত্তর তৈরি হচ্ছে…");
      try { const d=await request("/api/tutor/chat",{message,language:$("tutorLanguage").value,context:{page:"lexora-ai-tutor"}});
        showMessage(d.response || "উত্তর পাওয়া যায়নি।","tutor"); setStatus(d.warning||"");
      } catch(err) { showMessage(err.message,"tutor"); setStatus(err.message,true); }
      finally { $("tutorSend").disabled=false; field.focus(); }
    });
    $("tutorCorrect").addEventListener("click", async () => {
      const sentence=$("tutorMessage").value.trim(); if(!sentence){setStatus("আগে sentence লিখো।",true);return;}
      $("tutorCorrect").disabled=true; setStatus("Sentence পরীক্ষা হচ্ছে…");
      try { const d=await request("/api/tutor/correct",{sentence,language:$("tutorLanguage").value});
        showMessage(`Original: ${d.original || sentence}\n\nFeedback:\n${d.correction || "Correction পাওয়া যায়নি।"}`,"tutor"); setStatus("");
      } catch(err) { setStatus(err.message,true); }
      finally { $("tutorCorrect").disabled=false; }
    });
    tabs.addEventListener("click", e => {
      const t=e.target.closest(".tab[data-view]"); if(!t)return;
      if(t.dataset.view==="tutor") {
        document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x===t));
        ["learn","build","match","search","quiz","progress","review","coach","profile","admin","tutor"].forEach(v=>{const p=$(v+"View");if(p)p.style.display=v==="tutor"?"block":"none";});
      }
    });
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init,{once:true}); else init();
})();
