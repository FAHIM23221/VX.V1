"use strict";
"use strict";
const WORDS=[{"w": "hello", "bn": "হ্যালো", "t": "greeting"}, {"w": "hi", "bn": "হাই", "t": "greeting"}, {"w": "good", "bn": "ভালো", "t": "adjective"}, {"w": "morning", "bn": "সকাল", "t": "noun"}, {"w": "name", "bn": "নাম", "t": "noun"}, {"w": "I", "bn": "আমি", "t": "pronoun"}, {"w": "you", "bn": "তুমি/আপনি", "t": "pronoun"}, {"w": "he", "bn": "সে", "t": "pronoun"}, {"w": "she", "bn": "সে", "t": "pronoun"}, {"w": "we", "bn": "আমরা", "t": "pronoun"}, {"w": "they", "bn": "তারা", "t": "pronoun"}, {"w": "am", "bn": "হই/আছি", "t": "verb"}, {"w": "is", "bn": "হয়/আছে", "t": "verb"}, {"w": "are", "bn": "হও/আছো/আছে", "t": "verb"}, {"w": "have", "bn": "আছে/রয়েছে", "t": "verb"}, {"w": "want", "bn": "চাই", "t": "verb"}, {"w": "need", "bn": "প্রয়োজন", "t": "verb"}, {"w": "like", "bn": "পছন্দ করা", "t": "verb"}, {"w": "love", "bn": "ভালোবাসা", "t": "verb"}, {"w": "eat", "bn": "খাওয়া", "t": "verb"}, {"w": "drink", "bn": "পান করা", "t": "verb"}, {"w": "go", "bn": "যাওয়া", "t": "verb"}, {"w": "come", "bn": "আসা", "t": "verb"}, {"w": "live", "bn": "বাস করা", "t": "verb"}, {"w": "work", "bn": "কাজ করা", "t": "verb"}, {"w": "study", "bn": "পড়াশোনা করা", "t": "verb"}, {"w": "learn", "bn": "শেখা", "t": "verb"}, {"w": "read", "bn": "পড়া", "t": "verb"}, {"w": "write", "bn": "লেখা", "t": "verb"}, {"w": "speak", "bn": "কথা বলা", "t": "verb"}, {"w": "listen", "bn": "শোনা", "t": "verb"}, {"w": "see", "bn": "দেখা", "t": "verb"}, {"w": "watch", "bn": "দেখা", "t": "verb"}, {"w": "make", "bn": "তৈরি করা", "t": "verb"}, {"w": "use", "bn": "ব্যবহার করা", "t": "verb"}, {"w": "know", "bn": "জানা", "t": "verb"}, {"w": "understand", "bn": "বোঝা", "t": "verb"}, {"w": "help", "bn": "সাহায্য করা", "t": "verb"}, {"w": "try", "bn": "চেষ্টা করা", "t": "verb"}, {"w": "practice", "bn": "অনুশীলন করা", "t": "verb"}, {"w": "buy", "bn": "কেনা", "t": "verb"}, {"w": "give", "bn": "দেওয়া", "t": "verb"}, {"w": "take", "bn": "নেওয়া", "t": "verb"}, {"w": "get", "bn": "পাওয়া", "t": "verb"}, {"w": "water", "bn": "পানি", "t": "noun"}, {"w": "food", "bn": "খাবার", "t": "noun"}, {"w": "tea", "bn": "চা", "t": "noun"}, {"w": "coffee", "bn": "কফি", "t": "noun"}, {"w": "home", "bn": "বাড়ি", "t": "noun"}, {"w": "school", "bn": "স্কুল", "t": "noun"}, {"w": "college", "bn": "কলেজ", "t": "noun"}, {"w": "book", "bn": "বই", "t": "noun"}, {"w": "phone", "bn": "ফোন", "t": "noun"}, {"w": "computer", "bn": "কম্পিউটার", "t": "noun"}, {"w": "friend", "bn": "বন্ধু", "t": "noun"}, {"w": "family", "bn": "পরিবার", "t": "noun"}, {"w": "mother", "bn": "মা", "t": "noun"}, {"w": "father", "bn": "বাবা", "t": "noun"}, {"w": "brother", "bn": "ভাই", "t": "noun"}, {"w": "sister", "bn": "বোন", "t": "noun"}, {"w": "English", "bn": "ইংরেজি", "t": "noun"}, {"w": "Bangladesh", "bn": "বাংলাদেশ", "t": "noun"}, {"w": "city", "bn": "শহর", "t": "noun"}, {"w": "happy", "bn": "খুশি", "t": "adjective"}, {"w": "sad", "bn": "দুঃখিত", "t": "adjective"}, {"w": "tired", "bn": "ক্লান্ত", "t": "adjective"}, {"w": "busy", "bn": "ব্যস্ত", "t": "adjective"}, {"w": "ready", "bn": "প্রস্তুত", "t": "adjective"}, {"w": "hungry", "bn": "ক্ষুধার্ত", "t": "adjective"}, {"w": "thirsty", "bn": "তৃষ্ণার্ত", "t": "adjective"}, {"w": "bad", "bn": "খারাপ", "t": "adjective"}, {"w": "big", "bn": "বড়", "t": "adjective"}, {"w": "small", "bn": "ছোট", "t": "adjective"}, {"w": "new", "bn": "নতুন", "t": "adjective"}, {"w": "old", "bn": "পুরোনো", "t": "adjective"}, {"w": "today", "bn": "আজ", "t": "time"}, {"w": "tomorrow", "bn": "আগামীকাল", "t": "time"}, {"w": "now", "bn": "এখন", "t": "time"}, {"w": "here", "bn": "এখানে", "t": "place"}, {"w": "there", "bn": "সেখানে", "t": "place"}];
const examples={};
for(const x of WORDS){
  const exTemplates={
    greeting:[`Hi! I said "${x.w}" to my friend.`,`আমি আমার বন্ধুকে "${x.w}" বলেছি।`],
    adjective:[`This is ${x.w}.`,`এটি ${x.bn}।`],
    noun:[`This is a ${x.w}.`,`এটি একটি ${x.bn}।`],
    pronoun:[`${x.w} is here.`,`তিনি/সে এখানে আছে।`],
    verb:[`I ${x.w} every day.`,`আমি প্রতিদিন ${x.bn}।`],
    time:[`I will do it ${x.w}.`,`আমি এটি ${x.bn} করব।`],
    place:[`I am ${x.w}.`,`আমি ${x.bn}।`]
  };
  examples[x.w]=exTemplates[x.t]||[`I use "${x.w}" in English.`,`আমি ইংরেজিতে "${x.w}" শব্দটি ব্যবহার করি।`];
}
const $=id=>document.getElementById(id);
let index=Number(localStorage.getItem("lexora_index")||0);
let learned=JSON.parse(localStorage.getItem("lexora_learned")||"[]");
const VX_KEY="lexora_learning_v2";
let vxState=JSON.parse(localStorage.getItem(VX_KEY)||'{"right":0,"wrong":0,"daily":0,"words":{},"days":{}}');
function todayKey(){
  const d=new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function addDailyLearned(word){
  const d=todayKey();
  if(!vxState.days[d]) vxState.days[d]={right:0,wrong:0,practice:0,learnedWords:[]};
  const list=vxState.days[d].learnedWords||[];
  if(!list.includes(word)) list.push(word);
  vxState.days[d].learnedWords=list;
}
function getWordState(word){
  if(!vxState.words[word]) vxState.words[word]={right:0,wrong:0,mastery:0,next:0,seen:0};
  return vxState.words[word];
}
function masteryLabel(m){return ["New","Learning","Familiar","Strong","Mastered"][Math.max(0,Math.min(4,m))]||"New"}
function saveVX(){localStorage.setItem(VX_KEY,JSON.stringify(vxState));renderProgress();renderSmartReview(); if(typeof window.lexoraCloudSave === "function") window.lexoraCloudSave();}
function recordAnswer(word,ok){
  const d=todayKey();
  if(!vxState.days[d]) vxState.days[d]={right:0,wrong:0,practice:0,learnedWords:[]};
  vxState.days[d][ok?"right":"wrong"]++;
  vxState.days[d].practice++;
  vxState[ok?"right":"wrong"]++;
  const st=getWordState(word);
  st[ok?"right":"wrong"]++; if(!ok && vxState.lastConfidence===3) st.overconfidence=(st.overconfidence||0)+1;
  st.seen++;
  if(ok) st.mastery=Math.min(5,st.mastery+1);
  else st.mastery=Math.max(0,st.mastery-2);
  const hours=[0,4,24,72,168,336][st.mastery]||0;
  st.next=Date.now()+hours*3600000;
  saveVX();
}
function streakDays(){
  let n=0, d=new Date();
  while(true){
    const k=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    const x=vxState.days[k];
    if(!x || !x.practice) break;
    n++;
    d.setDate(d.getDate()-1);
  }
  return n;
}
function renderProgress(){
  const d=vxState.days[todayKey()]||{right:0,wrong:0,practice:0};
  const allR=vxState.right||0, allW=vxState.wrong||0;
  const acc=allR+allW?Math.round(allR/(allR+allW)*100):0;
  if($("statRight")) $("statRight").textContent=d.right;
  if($("statWrong")) $("statWrong").textContent=d.wrong;
  if($("statAccuracy")) $("statAccuracy").textContent=(d.right+d.wrong?Math.round(d.right/(d.right+d.wrong)*100):0)+"%";
  if($("statLearned")) $("statLearned").textContent=learned.length;
  const dailyWords=(d.learnedWords||[]).length;
  const goal=Math.min(10,dailyWords);
  if($("dailyGoalText")) $("dailyGoalText").textContent=goal+" / 10";
  if($("dailyFill")) $("dailyFill").style.width=goal*10+"%";
  const due=Object.entries(vxState.words).filter(([w,x])=>x.next<=Date.now()&&x.mastery<5)
    .sort((a,b)=>(b[1].wrong-a[1].wrong)||(a[1].mastery-b[1].mastery)).slice(0,5);
  if($("dueCount")) $("dueCount").textContent=due.length+" due";
  if($("reviewList")) $("reviewList").innerHTML=due.length?
    due.map(([w,x])=>`<div class="review-item"><div><strong>${w}</strong><small style="display:block">${x.wrong} wrong · ${masteryLabel(x.mastery)}</small></div><span class="badge due">Review</span></div>`).join("")
    :'<div class="review-item"><div><strong>দারুণ!</strong><small style="display:block">এখন কোনো urgent review নেই।</small></div><span class="badge strong">Good</span></div>';
  renderSmartReview();
}

function confidenceLabel(v){return v===3?"Sure":v===2?"Probably":v===1?"Guessing":"—"}
function riskWords(){
  return Object.entries(vxState.words).filter(([w,x])=>x.mastery<5 && (x.wrong>x.right || (x.next<=Date.now()&&x.mastery<4)))
    .sort((a,b)=>(b[1].wrong-b[1].right)-(a[1].wrong-a[1].right)).slice(0,8);
}
function renderCoach(){
  const entries=Object.entries(vxState.words);
  const risks=riskWords();
  const mastered=entries.filter(([w,x])=>x.mastery>=5).length;
  if($("coachRisk")) $("coachRisk").textContent=risks.length;
  if($("coachMastered")) $("coachMastered").textContent=mastered;
  if($("coachPlan")) $("coachPlan").textContent=Math.min(8,(vxState.days[todayKey()]||{}).practice||0)+"/8";
  if($("coachConfidence")) $("coachConfidence").textContent=confidenceLabel(vxState.lastConfidence);
  if($("coachWeakWords")) $("coachWeakWords").innerHTML=risks.length?risks.map(([w,x])=>`
    <div class="review-item"><div><strong>${w}</strong><small style="display:block">${x.wrong} wrong · ${x.right} right</small></div><span class="badge due">${masteryLabel(x.mastery)}</span></div>`).join("")
    : '<div class="review-item"><strong>কোনো urgent word নেই। নতুন শব্দ শেখা চালিয়ে যাও।</strong></div>';
  const pick=risks[0]?.[0] || WORDS[Math.floor(Math.random()*WORDS.length)]?.w || "Need";
  if($("teachWord")) $("teachWord").textContent=pick;
  if($("teachExample")){
    const obj=WORDS.find(x=>x.w===pick);
    $("teachExample").innerHTML=obj?`<strong>${obj.w}</strong> — ${obj.bn}<br><span>${obj.ex||""}</span>`:"";
  }
}
function setConfidence(v){
  vxState.lastConfidence=v;
  vxState.confidenceHistory=vxState.confidenceHistory||[];
  vxState.confidenceHistory.push({v,t:Date.now()});
  if(vxState.confidenceHistory.length>50) vxState.confidenceHistory.shift();
  localStorage.setItem(VX_KEY,JSON.stringify(vxState));
  if(typeof window.lexoraCloudSave === "function") window.lexoraCloudSave();
  if($("confidenceFeedback")) $("confidenceFeedback").textContent=
    v===3?"ভালো। তবে Lexora mastery ঠিক করবে actual recall দিয়ে।":v===2?"ভালো—পরেরবার context-এও recall করো।":"ঠিক আছে—এই ধরনের শব্দকে আমরা একটু বেশি review করব।";
  renderCoach();
}
function startQuickWin(){
  const due=Object.entries(vxState.words).filter(([w,x])=>x.mastery<5&&x.next<=Date.now())
    .sort((a,b)=>(b[1].wrong-a[1].wrong)).slice(0,3).map(x=>x[0]);
  if(due.length){
    const idx=WORDS.findIndex(x=>x.w===due[0]);
    if(idx>=0){ index=idx; localStorage.setItem("lexora_index",index); document.querySelector('.tab[data-view="learn"]')?.click(); renderWord(); }
  } else {
    document.querySelector('.tab[data-view="quiz"]')?.click();
  }
}
function renderSmartReview(){
  const entries=Object.entries(vxState.words);
  const due=entries.filter(([w,x])=>x.next<=Date.now()&&x.mastery<5)
    .sort((a,b)=>(b[1].wrong-a[1].wrong)||(a[1].mastery-b[1].mastery));
  const mastered=entries.filter(([w,x])=>x.mastery>=5).length;
  const acc=(vxState.right||0)+(vxState.wrong||0)?Math.round((vxState.right||0)/((vxState.right||0)+(vxState.wrong||0))*100):0;
  if($("reviewDueBig")) $("reviewDueBig").textContent=due.length;
  if($("reviewMastered")) $("reviewMastered").textContent=mastered;
  if($("reviewStreak")) $("reviewStreak").textContent=streakDays();
  if($("reviewAccuracy")) $("reviewAccuracy").textContent=acc+"%";
  if($("reviewPriorityLabel")) $("reviewPriorityLabel").textContent=due.length?`${due.length} due`:"All clear";
  if($("priorityWords")) $("priorityWords").innerHTML=due.slice(0,8).map(([w,x])=>`
    <div class="review-item"><div><strong>${w}</strong><small style="display:block">${x.wrong} wrong · ${x.right} right · ${masteryLabel(x.mastery)}</small></div>
    <span class="badge ${x.mastery>=4?'strong':'due'}">${x.mastery}/5</span></div>`).join("") || '<div class="review-item"><strong>এখন নতুন শব্দ শেখা চালিয়ে যাও।</strong></div>';
  if($("masteryBars")){
    $("masteryBars").innerHTML=[0,1,2,3,4,5].map(i=>{
      const c=entries.filter(([w,x])=>x.mastery===i).length;
      return `<div style="display:grid;grid-template-columns:90px 1fr 35px;gap:8px;align-items:center;margin:9px 0;font-size:13px"><span>${i===5?'Mastered':masteryLabel(i)}</span><div class="mini-track"><div class="mini-fill" style="width:${Math.min(100,c*5)}%"></div></div><b>${c}</b></div>`;
    }).join("");
  }
}
;

function renderWord(){
 const x=WORDS[index%WORDS.length];
 $("word").textContent=x.w;$("meaning").textContent=x.bn;$("wordType").textContent=x.t;$("pron").textContent="/"+x.w+"/";
 const ex=examples[x.w]||[`I use "${x.w}" in English.`,`আমি "${x.w}" শব্দটি ইংরেজিতে ব্যবহার করি।`];
 $("exampleEn").textContent=ex[0];$("exampleBn").textContent=ex[1];
 $("learnedCount").textContent=learned.length;const pct=Math.min(100,learned.length*10);
 $("pct").textContent=pct+"%";$("fill").style.width=pct+"%";
 localStorage.setItem("lexora_index",index);
}
$("know").onclick=()=>{
  const w=WORDS[index%WORDS.length].w;
  if(!learned.includes(w)) learned.push(w);
  addDailyLearned(w);
  recordAnswer(w,true);
  localStorage.setItem("lexora_learned",JSON.stringify(learned));
  saveVX();
  index=(index+1)%WORDS.length;
  localStorage.setItem("lexora_index",index);
  renderWord();
};
$("again").onclick=()=>{const b=$("again");b.textContent="✓ আবার review হবে";setTimeout(()=>b.textContent="↻ আবার দেখাও",900);};
$("speak").onclick=()=>{if(window.speechSynthesis){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(WORDS[index%WORDS.length].w);u.lang="en-US";speechSynthesis.speak(u);}};

const data={
want:{
subs:[["I","আমি"],["You","তুমি/আপনি"],["We","আমরা"],["They","তারা"],["He","সে"],["She","সে"]],
verbs:[["learn","শিখতে"],["study","পড়াশোনা করতে"],["read","পড়তে"],["write","লিখতে"],["speak","কথা বলতে"],["practice","অনুশীলন করতে"],["use","ব্যবহার করতে"],["go","যেতে"],["eat","খেতে"],["drink","পান করতে"]],
objs:[["English","ইংরেজি"],["a book","একটি বই"],["a sentence","একটি বাক্য"],["water","পানি"],["food","খাবার"],["tea","চা"],["my English","আমার ইংরেজি"]],
extras:[["",""],["today","আজ"],["every day","প্রতিদিন"],["now","এখন"],["at home","বাড়িতে"],["at school","স্কুলে"]]
},
svo:{
subs:[["I","আমি"],["You","তুমি/আপনি"],["We","আমরা"],["They","তারা"],["He","সে"],["She","সে"]],
verbs:[["drink","পান করি"],["eat","খাই"],["read","পড়ি"],["write","লিখি"],["watch","দেখি"],["use","ব্যবহার করি"],["make","তৈরি করি"],["buy","কিনি"],["like","পছন্দ করি"],["have","আছে"]],
objs:[["water","পানি"],["food","খাবার"],["a book","একটি বই"],["tea","চা"],["coffee","কফি"],["my phone","আমার ফোন"],["English","ইংরেজি"]],
extras:[["",""],["today","আজ"],["every day","প্রতিদিন"],["at home","বাড়িতে"],["at school","স্কুলে"]]
},
adj:{
subs:[["I","আমি"],["You","তুমি/আপনি"],["We","আমরা"],["They","তারা"],["He","সে"],["She","সে"]],
verbs:[["happy","খুশি"],["sad","দুঃখিত"],["tired","ক্লান্ত"],["busy","ব্যস্ত"],["ready","প্রস্তুত"],["hungry","ক্ষুধার্ত"],["thirsty","তৃষ্ণার্ত"],["good","ভালো"]],
objs:[["",""]],extras:[["",""],["today","আজ"],["now","এখন"],["at home","বাড়িতে"]],
beNoun:{
subs:[["I","আমি"],["You","তুমি/আপনি"],["We","আমরা"],["They","তারা"],["He","সে"],["She","সে"]],
verbs:[["a student","একজন শিক্ষার্থী"],["a teacher","একজন শিক্ষক"],["a friend","একজন বন্ধু"],["a beginner","একজন শিক্ষানবিস"],["a good person","একজন ভালো মানুষ"]],
objs:[["",""]],extras:[["",""] ,["today","আজ"]]
}
}};
let pattern="want";
const opt=a=>a.map(x=>`<option value="${x[0]}" data-bn="${x[1]}">${x[0]} — ${x[1]}</option>`).join("");
function third(v){const m={go:"goes",do:"does",have:"has",watch:"watches",study:"studies",try:"tries",make:"makes",use:"uses",like:"likes",read:"reads",write:"writes",eat:"eats",drink:"drinks",buy:"buys",open:"opens"};return m[v]||v+"s";}
function loadPattern(p){
 pattern=p;const d=data[p];$("gSub").innerHTML=opt(d.subs);$("gVerb").innerHTML=opt(d.verbs);$("gObj").innerHTML=opt(d.objs);$("gExtra").innerHTML=opt(d.extras);
 $("objStep").style.display=(p==="adj"||p==="beNoun")?"none":"grid";
 $("verbLabel").textContent=p==="want"?"WHAT DO YOU WANT TO DO?":p==="svo"?"WHAT DO YOU DO?":p==="adj"?"HOW DO YOU FEEL?":"WHAT ARE YOU?";
 document.querySelectorAll(".pattern").forEach(b=>b.classList.toggle("active",b.dataset.pattern===p));makeSentence();
}
function makeSentence(){
 const s=$("gSub").value,v=$("gVerb").value,o=$("gObj").value,e=$("gExtra").value;
 const sb=$("gSub").selectedOptions[0]?.dataset.bn||"",vb=$("gVerb").selectedOptions[0]?.dataset.bn||"",ob=$("gObj").selectedOptions[0]?.dataset.bn||"",eb=$("gExtra").selectedOptions[0]?.dataset.bn||"";
 let en,bn,why;
 if(pattern==="want"){en=`${s} want${s==="He"||s==="She"?"s":""} to ${v} ${o}`;bn=`${sb} ${vb} ${ob}`;why=`want-এর পরে <strong>to + verb</strong> ব্যবহার করা হয়েছে।`;}
 else if(pattern==="svo"){en=`${s} ${s==="He"||s==="She"?third(v):v} ${o}`;bn=`${sb} ${vb} ${ob}`;why=`এটি <strong>Subject + Verb + Object</strong> pattern।`;}
 else if(pattern==="adj"){const be={I:"am",You:"are",We:"are",They:"are",He:"is",She:"is"}[s];en=`${s} ${be} ${v}`;bn=`${sb} ${be} ${vb}`;why=`এটি <strong>Subject + be + adjective</strong> pattern।`;
 }else{const be={I:"am",You:"are",We:"are",They:"are",He:"is",She:"is"}[s];en=`${s} ${be} ${v}`;bn=`${sb} ${be} ${vb}`;why=`এটি <strong>Subject + be + noun</strong> pattern।`;}
 if(e){en+=" "+e;bn+=" "+eb;} en+=".";bn+="।";
 $("genEn").textContent=en;$("genBn").textContent=bn;$("why").innerHTML=why;
}
document.querySelectorAll(".pattern").forEach(b=>b.onclick=()=>loadPattern(b.dataset.pattern));
["gSub","gVerb","gObj","gExtra"].forEach(id=>$(id).onchange=makeSentence);

function norm(s){return s.toLowerCase().replace(/[.!?,]/g,"").replace(/\s+/g," ").trim();}
$("check").onclick=()=>{
 const input=norm($("userSentence").value),target=norm($("genEn").textContent),f=$("feedback");
 f.className="feedback show";
 if(!input){f.classList.add("no");f.innerHTML="✍️ আগে একটি sentence লিখো।";return;}
 if(input===target){f.classList.add("ok");f.innerHTML="✅ <b>সঠিক!</b><br>তুমি এই pattern ঠিকভাবে ব্যবহার করেছো।";}
 else{
  const validBeNoun=/^(i am|you are|we are|they are|he is|she is) (a |an |the )?[a-z ]+$/i.test(input);
  f.classList.add("no");
  let hint=validBeNoun?"<b>তোমার sentence-টি valid English হতে পারে</b>, কিন্তু এখন অন্য pattern selected। বর্তমান pattern অনুযায়ী sentence বানাও।":"এই pattern অনুসরণ করে আবার চেষ্টা করো।";
  if(pattern==="want" && /^i want [a-z]/.test(input) && !/^i want to /.test(input)) hint=`<b>খেয়াল করো:</b> want-এর পরে এখানে <strong>to + verb</strong> দরকার।<br>সঠিক example: <strong>${$("genEn").textContent}</strong>`;
  else if(pattern==="adj" && !/\b(am|is|are)\b/.test(input)) hint=`<b>খেয়াল করো:</b> adjective-এর আগে <strong>am / is / are</strong> দরকার।`;
  f.innerHTML="❌ এখনো ঠিক হয়নি।<br>"+hint;
 }
};


/* Lexora v0.5 — Side-by-Side Word Matching */
const MATCH_SOURCE = [
  ["hello","হ্যালো"],["water","পানি"],["food","খাবার"],["book","বই"],["phone","ফোন"],
  ["friend","বন্ধু"],["family","পরিবার"],["home","বাড়ি"],["school","স্কুল"],["English","ইংরেজি"],
  ["learn","শেখা"],["study","পড়াশোনা করা"],["read","পড়া"],["write","লেখা"],["speak","কথা বলা"],
  ["listen","শোনা"],["help","সাহায্য করা"],["work","কাজ করা"],["happy","খুশি"],["tired","ক্লান্ত"],
  ["busy","ব্যস্ত"],["ready","প্রস্তুত"],["today","আজ"],["tomorrow","আগামীকাল"],["now","এখন"]
];
let matchRound=[], matchSelectedEnglish=null, matchSelectedBangla=null, matchDone=0, matchTotal=5;

function shuffle(a){
  const x=[...a];
  for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}
  return x;
}

/* Lexora v0.6 — Matching feedback sounds */
let matchSoundEnabled = localStorage.getItem("lexora_match_sound") !== "false";
let audioCtx = null;

function ensureAudio(){
  if(!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if(AC) {
      try { audioCtx = new AC(); } catch(e) { audioCtx = null; }
    }
  }
  if(audioCtx && audioCtx.state === "suspended") {
    try { audioCtx.resume(); } catch(e) {}
  }
}

function tone(freq,delay,dur,type="sine",vol=.85){
  try{
    const AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return;
    if(!window.__vocabAudio)window.__vocabAudio=new AC();
    const a=window.__vocabAudio;
    if(a.state==="suspended")a.resume();

    const now=a.currentTime+delay;
    const osc=a.createOscillator();
    const gain=a.createGain();
    const comp=a.createDynamicsCompressor();

    osc.type=type;
    osc.frequency.setValueAtTime(freq,now);
    gain.gain.setValueAtTime(0.0001,now);
    gain.gain.exponentialRampToValueAtTime(Math.min(1.35,vol*1.35),now+.008);
    gain.gain.exponentialRampToValueAtTime(.0001,now+dur);

    comp.threshold.setValueAtTime(-18,now);
    comp.knee.setValueAtTime(8,now);
    comp.ratio.setValueAtTime(4,now);
    comp.attack.setValueAtTime(.003,now);
    comp.release.setValueAtTime(.12,now);

    osc.connect(gain); gain.connect(comp); comp.connect(a.destination);
    osc.start(now); osc.stop(now+dur+.03);
  }catch(e){}
}

function playCorrectSound(){
  if(!matchSoundEnabled) return;
  ensureAudio();
  if(!audioCtx) return;
  // Clear two-note success chime.
  tone(740,.00,.13,"sine",.85);
  tone(1040,.125,.18,"sine",.85);
}

function playWrongSound(){
  if(!matchSoundEnabled) return;
  ensureAudio();
  if(!audioCtx) return;
  // Clear short descending error sound.
  tone(300,.00,.12,"triangle",.85);
  tone(180,.12,.18,"triangle",.85);
}

$("matchSoundToggle").onclick=()=>{
  matchSoundEnabled=!matchSoundEnabled;
  localStorage.setItem("lexora_match_sound",String(matchSoundEnabled));
  $("matchSoundToggle").textContent=matchSoundEnabled?"🔊":"🔇";
  if(matchSoundEnabled) ensureAudio();
};
$("matchSoundToggle").textContent=matchSoundEnabled?"🔊":"🔇";

function startMatching(){
  matchRound=shuffle(MATCH_SOURCE).slice(0,matchTotal);
  matchSelectedEnglish=null; matchSelectedBangla=null; matchDone=0;
  const eng=shuffle(matchRound.map((p,i)=>({id:i,text:p[0]})));
  const ben=shuffle(matchRound.map((p,i)=>({id:i,text:p[1]})));
  $("englishCards").innerHTML=eng.map(x=>`<button class="match-card" data-side="en" data-id="${x.id}">${x.text}</button>`).join("");
  $("banglaCards").innerHTML=ben.map(x=>`<button class="match-card" data-side="bn" data-id="${x.id}">${x.text}</button>`).join("");
  $("matchProgress").textContent=`0/${matchTotal}`;
  $("matchStatus").className="match-status";
  $("matchStatus").textContent="একটি English word নির্বাচন করো।";
  $("matchNext").disabled=true;
  document.querySelectorAll(".match-card").forEach(c=>c.onclick=()=>selectMatchCard(c));
}
function clearMatchSelection(){
  matchSelectedEnglish=null;
  matchSelectedBangla=null;
  document.querySelectorAll(".match-card.selected").forEach(x=>x.classList.remove("selected"));
}

function selectMatchCard(card){
  // Locked/correct cards can never participate in a new match.
  if(card.disabled || card.classList.contains("locked")) return;

  ensureAudio();

  const side=card.dataset.side;
  if(side==="en"){
    document.querySelectorAll('.match-card[data-side="en"]:not(.locked)').forEach(x=>x.classList.remove("selected"));
    matchSelectedEnglish=card;
  }else{
    document.querySelectorAll('.match-card[data-side="bn"]:not(.locked)').forEach(x=>x.classList.remove("selected"));
    matchSelectedBangla=card;
  }

  card.classList.add("selected");

  // Only check when the user has deliberately selected one unlocked card
  // from each side. Previous matches are cleared from selection state.
  if(matchSelectedEnglish && matchSelectedBangla) checkMatch();
}

function checkMatch(){
  const e=matchSelectedEnglish, b=matchSelectedBangla;
  if(!e || !b || e.disabled || b.disabled) {
    clearMatchSelection();
    return;
  }

  if(e.dataset.id===b.dataset.id){
    recordAnswer(e.textContent.trim(), true);
    playCorrectSound();

    e.classList.remove("selected");
    b.classList.remove("selected");
    e.classList.add("correct","locked");
    b.classList.add("correct","locked");
    e.disabled=true;
    b.disabled=true;

    matchDone++;
    $("matchProgress").textContent=`${matchDone}/${matchTotal}`;
    $("matchStatus").className="match-status good";
    $("matchStatus").textContent=matchDone===matchTotal
      ? "🎉 সবগুলো সঠিক! এগিয়ে যেতে পারো।"
      : "✓ সঠিক মিল! এবার পরের word-এর জন্য একটি English word নির্বাচন করো।";

    // CRITICAL: clear old selections immediately so a fast next tap
    // can never be compared against the previous correct pair.
    matchSelectedEnglish=null;
    matchSelectedBangla=null;

    if(matchDone===matchTotal) $("matchNext").disabled=false;
  }else{
    playWrongSound();

    e.classList.add("wrong");
    b.classList.add("wrong");
    $("matchStatus").className="match-status error";
    $("matchStatus").textContent="✕ এই দুটো একসাথে নয়। আবার চেষ্টা করো।";

    // Clear both selections after the error animation.
    setTimeout(()=>{
      e.classList.remove("wrong","selected");
      b.classList.remove("wrong","selected");
      matchSelectedEnglish=null;
      matchSelectedBangla=null;
      $("matchStatus").className="match-status";
      $("matchStatus").textContent="আবার চেষ্টা করো। একটি English word নির্বাচন করো।";
    },520);
  }
}

$("matchNext").onclick=()=>{
  startMatching();
  $("matchStatus").textContent="নতুন round শুরু হয়েছে। একটি English word নির্বাচন করো।";
};


document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{
 document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");
 ["learn","build","match","search","quiz","progress","review","coach"].forEach(v=>{const el=$(v+"View");if(el)el.style.display=t.dataset.view===v?"block":"none";});
 if(t.dataset.view==="match") startMatching();
 if(t.dataset.view==="quiz") startQuiz(); if(t.dataset.view==="review") renderSmartReview(); if(t.dataset.view==="coach") renderCoach();
});
$("searchInput").oninput=()=>{
 const q=$("searchInput").value.toLowerCase().trim();
 const r=WORDS.filter(x=>(x.w+" "+x.bn+" "+x.t).toLowerCase().includes(q)).slice(0,30);
 $("results").innerHTML=r.map(x=>`<div class="res"><div><b>${x.w}</b> — ${x.bn}</div><small>${x.t}</small></div>`).join("");
};
$("theme").onclick=()=>{document.body.classList.toggle("dark");$("theme").textContent=document.body.classList.contains("dark")?"☀":"☾";localStorage.setItem("lexora_dark",document.body.classList.contains("dark"));};
if(localStorage.getItem("lexora_dark")==="true"){document.body.classList.add("dark");$("theme").textContent="☀";}
loadPattern("want");
renderWord();
startMatching();
renderProgress();
renderSmartReview();
renderCoach();
$("heroStreakNum")&&($("heroStreakNum").textContent=streakDays());
$("startReview")&&($("startReview").onclick=()=>{
  const tab=document.querySelector('.tab[data-view="quiz"]');
  if(tab) tab.click();
});


/* ===== Lexora Quiz Engine ===== */
const QUIZ_WORDS = WORDS.map(x=>[x.w,x.bn]);

let quizMode="meaning", quizIndex=0, quizScore=0, quizAnswered=false;
let quizDeck=[];
const QUIZ_TOTAL=10;

function setQuizMode(mode){
  quizMode=mode;
  document.querySelectorAll("[data-quiz-mode]").forEach(b=>b.classList.toggle("active",b.dataset.quizMode===mode));
  startQuiz();
}
function startQuiz(){
  quizIndex=0; quizScore=0; quizAnswered=false;
  const due=QUIZ_WORDS.filter(([w])=>{const x=vxState.words[w];return x&&x.next<=Date.now()&&x.mastery<5;});
  const fresh=QUIZ_WORDS.filter(([w])=>!vxState.words[w]);
  const strong=QUIZ_WORDS.filter(([w])=>{const x=vxState.words[w];return x&&x.mastery>=4;});
  const priority=[...due,...fresh];
  const rest=QUIZ_WORDS.filter(x=>!priority.some(d=>d[0]===x[0]));
  quizDeck=[];
  for(const item of shuffle(priority.concat(shuffle(rest)))){
    if(!quizDeck.some(x=>x[0]===item[0])) quizDeck.push(item);
    if(quizDeck.length>=QUIZ_TOTAL) break;
  }
  $("quizScore").textContent="0";
  $("quizNext").disabled=true;
  renderQuiz();
}
function renderQuiz(){
  if(!quizDeck.length){
    $("quizQuestion").textContent="কোনো শব্দ পাওয়া যায়নি।";
    $("quizOptions").innerHTML="";
    return;
  }
  const [en,bn]=quizDeck[quizIndex % quizDeck.length];
  const question=quizMode==="meaning"?en:bn;
  const answer=quizMode==="meaning"?bn:en;
  const pool=QUIZ_WORDS.filter(x=>x[quizMode==="meaning"?1:0]!==answer);
  const wrong=[];
  for(const x of shuffle(pool)){
    const value=quizMode==="meaning"?x[1]:x[0];
    if(value!==answer && !wrong.includes(value)) wrong.push(value);
    if(wrong.length===3) break;
  }
  const options=shuffle([answer,...wrong]);

  quizAnswered=false;
  $("quizQuestion").textContent=question;
  const qLabel=document.querySelector(".quiz-kicker");
  if(qLabel) qLabel.textContent=`প্রশ্ন ${quizIndex+1} / ${QUIZ_TOTAL}`;
  $("quizQuestionSub").textContent=quizMode==="meaning"
    ?"সঠিক বাংলা অর্থটি নির্বাচন করো।":"সঠিক English word-টি নির্বাচন করো।";
  $("quizProgressBar").style.width=((quizIndex/QUIZ_TOTAL)*100)+"%";
  $("quizStatus").className="quiz-status";
  $("quizStatus").textContent="একটি উত্তর নির্বাচন করো।";
  $("quizNext").disabled=true;
  const letters=["ক","খ","গ","ঘ"];
$("quizOptions").innerHTML=options.map((x,i)=>`<button class="quiz-option" data-answer="${x.replace(/"/g,"&quot;")}"><span class="quiz-letter">${letters[i]}</span><span>${x}</span></button>`).join("");

  document.querySelectorAll(".quiz-option").forEach(btn=>{
    btn.onclick=()=>answerQuiz(btn,answer);
  });
}
function answerQuiz(btn,answer){
  if(quizAnswered) return;
  quizAnswered=true;
  const buttons=[...document.querySelectorAll(".quiz-option")];
  buttons.forEach(b=>b.disabled=true);

  if(btn.dataset.answer===answer){
    btn.classList.add("correct");
    quizScore++; recordAnswer(quizDeck[quizIndex % quizDeck.length][0],true);
    $("quizScore").textContent=quizScore;
    $("quizStatus").className="quiz-status good";
    $("quizStatus").textContent="✓ সঠিক উত্তর! খুব ভালো।";
  }else{
    btn.classList.add("wrong");
    recordAnswer(quizDeck[quizIndex % quizDeck.length][0],false);
    const correct=buttons.find(b=>b.dataset.answer===answer);
    if(correct) correct.classList.add("correct");
    $("quizStatus").className="quiz-status bad";
    $("quizStatus").textContent="✕ ভুল উত্তর। সঠিক উত্তরটি সবুজ করে দেখানো হয়েছে।";
  }
  $("quizProgressBar").style.width=(((quizIndex+1)/QUIZ_TOTAL)*100)+"%";
  $("quizNext").disabled=false;
}
$("quizNext").onclick=()=>{
  if(!quizAnswered) return;
  quizIndex++;
  if(quizIndex>=QUIZ_TOTAL){
    showQuizResult();
  }else{
    renderQuiz();
  }
};
function showQuizResult(){
  $("quizArea").innerHTML=`
    <div class="quiz-result">
      <div class="big">${quizScore}/${QUIZ_TOTAL}</div>
      <h3>কুইজ শেষ!</h3>
      <p>তোমার আজকের শব্দগুলোর মধ্যে ${quizScore}টি সঠিক হয়েছে। আবার চেষ্টা করলে আরও ভালোভাবে মনে থাকবে।</p>
      <button class="quiz-next" id="quizRestart">আবার শুরু করি ↻</button>
    </div>`;
  $("quizProgressBar").style.width="100%";
  $("quizRestart").onclick=()=>{
    $("quizArea").innerHTML=`
      <div class="quiz-question-card">
        <div class="quiz-question-label" id="quizQuestionSub">সঠিক বাংলা অর্থটি বেছে নাও।</div>
        <div class="quiz-question" id="quizQuestion">লোড হচ্ছে...</div>
        <div class="quiz-options" id="quizOptions"></div>
      </div>
      <div class="quiz-status" id="quizStatus">একটি উত্তর নির্বাচন করো।</div>
      <button class="quiz-next" id="quizNext" disabled>পরের প্রশ্ন →</button>`;
    startQuiz();
  };
}
document.querySelectorAll("[data-quiz-mode]").forEach(b=>b.onclick=()=>setQuizMode(b.dataset.quizMode));



function unlockVocabAudio(){
  try{
    const AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return;
    if(!window.__vocabAudio)window.__vocabAudio=new AC();
    if(window.__vocabAudio.state==="suspended")window.__vocabAudio.resume();
  }catch(e){}
}
document.addEventListener("pointerdown",unlockVocabAudio,{once:true});

// --- Reliable bindings (kept inside the script) ---
document.addEventListener("click",e=>{
  const c=e.target.closest(".confidence-btn");
  if(c) setConfidence(Number(c.dataset.confidence));
});
if($("quickWinBtn")) $("quickWinBtn").onclick=startQuickWin;
if($("teachReveal")) $("teachReveal").onclick=()=>{
  if($("teachExample")) $("teachExample").style.display=$("teachExample").style.display==="none"?"block":"none";
};


/* ===== Lexora Firebase Account + Cloud Sync / Profile / Admin ===== */
(function(){
  const firebaseConfig=window.LEXORA_FIREBASE_CONFIG;
  const USERS_KEY_PREFIX="lexora_user_";
  let currentUser=null;
  let currentProfile={};
  let syncing=false;
  let isAdmin=false;

  const el=id=>document.getElementById(id);
  function msg(text, cls){
    const node=el("authMsg");
    if(!node)return;
    node.textContent=text||"";
    node.className="auth-msg "+(cls||"");
  }
  function normalizePhone(v){
    let x=(v||"").replace(/[^0-9+]/g,"");
    if(x.startsWith("+880")) x="0"+x.slice(4);
    return x;
  }
  function validPhone(v){return /^01[3-9]\d{8}$/.test(normalizePhone(v));}
  function normalizeEmail(v){return (v||"").trim().toLowerCase();}
  function identifierKey(type,value){return `${type}_${encodeURIComponent(value).replace(/%/g,"_")}`.slice(0,120);}
  function localKey(uid){return USERS_KEY_PREFIX+uid;}

  function showApp(){
    el("authOverlay")?.classList.add("hidden");
    if(el("accountName")) el("accountName").textContent=currentUser?.displayName||currentProfile.name||"Profile";
    if(el("accountBtn")) el("accountBtn").textContent="Profile";
    if(el("adminBtn")) el("adminBtn").classList.toggle("hidden",!isAdmin);
  }
  function showAuth(){
    el("authOverlay")?.classList.remove("hidden");
    if(el("accountName")) el("accountName").textContent="";
    if(el("accountBtn")) el("accountBtn").textContent="Profile";
    if(el("adminBtn")) el("adminBtn").classList.add("hidden");
  }
  function saveLocalSnapshot(){
    if(!currentUser)return;
    const snap={index,learned,vxState,updatedAt:Date.now()};
    localStorage.setItem(localKey(currentUser.uid),JSON.stringify(snap));
    localStorage.setItem("lexora_index",String(index));
    localStorage.setItem("lexora_learned",JSON.stringify(learned));
    localStorage.setItem(VX_KEY,JSON.stringify(vxState));
  }
  function restoreLocalSnapshot(){
    if(!currentUser)return;
    try{
      const snap=JSON.parse(localStorage.getItem(localKey(currentUser.uid)||"null"));
      if(!snap)return;
      if(Array.isArray(snap.learned))learned=snap.learned;
      if(typeof snap.index==="number")index=snap.index;
      if(snap.vxState&&typeof snap.vxState==="object")vxState=snap.vxState;
    }catch(e){console.warn(e)}
  }
  async function cloudSave(){
    if(!currentUser||syncing||!window.lexoraDb)return;
    saveLocalSnapshot();
    try{
      syncing=true;
      await window.lexoraDb.collection("users").doc(currentUser.uid).set({
        name:currentUser.displayName||currentProfile.name||"",
        email:currentUser.email||currentProfile.email||"",
        phone:currentProfile.phone||currentUser._lexoraPhone||"",
        index,learned,vxState,
        updatedAt:firebase.firestore.FieldValue.serverTimestamp()
      },{merge:true});
      currentProfile={...currentProfile,name:currentUser.displayName||currentProfile.name||"",email:currentUser.email||currentProfile.email||"",phone:currentProfile.phone||currentUser._lexoraPhone||""};
    }catch(e){console.warn("Lexora cloud save failed",e)}
    finally{syncing=false}
  }
  window.lexoraCloudSave=cloudSave;

  async function cloudLoad(user){
    if(!window.lexoraDb)return;
    try{
      const ref=window.lexoraDb.collection("users").doc(user.uid);
      const snap=await ref.get();
      if(snap.exists){
        const d=snap.data()||{};
        currentProfile=d;
        if(d.phone)user._lexoraPhone=d.phone;
        if(Array.isArray(d.learned))learned=d.learned;
        if(typeof d.index==="number")index=d.index;
        if(d.vxState&&typeof d.vxState==="object")vxState=d.vxState;
      }else{
        currentProfile={name:user.displayName||"",email:user.email||"",phone:user._lexoraPhone||""};
        await ref.set({...currentProfile,index,learned,vxState,createdAt:firebase.firestore.FieldValue.serverTimestamp(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
      }
      saveLocalSnapshot();
      renderWord();renderProgress();renderSmartReview();renderCoach();
    }catch(e){
      console.warn("Lexora cloud load failed",e);
      restoreLocalSnapshot();
      renderWord();renderProgress();renderSmartReview();renderCoach();
    }
  }

  async function createAccount(name,email,phone,password){
    const cred=await firebase.auth().createUserWithEmailAndPassword(email,password);
    const user=cred.user;
    await user.updateProfile({displayName:name});
    user._lexoraPhone=phone;
    currentUser=user;
    currentProfile={name,email,phone};
    await window.lexoraDb.collection("users").doc(user.uid).set({name,email,phone,index,learned,vxState,createdAt:firebase.firestore.FieldValue.serverTimestamp(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
    await window.lexoraDb.collection("loginIdentifiers").doc(identifierKey("phone",phone)).set({authEmail:email,uid:user.uid,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    await window.lexoraDb.collection("loginIdentifiers").doc(identifierKey("email",email)).set({authEmail:email,uid:user.uid,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    saveLocalSnapshot();
  }

  async function loginWithIdentifier(identifier,password){
    const raw=identifier.trim();
    if(raw.includes("@")){
      await firebase.auth().signInWithEmailAndPassword(normalizeEmail(raw),password);
      return;
    }
    const phone=normalizePhone(raw);
    if(!validPhone(phone))throw Object.assign(new Error("invalid-phone"),{code:"lexora/invalid-phone"});
    const snap=await window.lexoraDb.collection("loginIdentifiers").doc(identifierKey("phone",phone)).get();
    if(!snap.exists)throw Object.assign(new Error("account-not-found"),{code:"auth/user-not-found"});
    const d=snap.data()||{};
    await firebase.auth().signInWithEmailAndPassword(d.authEmail,password);
    const u=firebase.auth().currentUser;
    if(u)u._lexoraPhone=phone;
  }

  function setMode(mode){
    const login=mode==="login";
    el("loginTab")?.classList.toggle("active",login);
    el("signupTab")?.classList.toggle("active",!login);
    el("nameField")?.classList.toggle("hidden",login);
    el("confirmField")?.classList.toggle("hidden",login);
    el("phoneField")?.classList.toggle("hidden",login);
    if(el("identifierLabel"))el("identifierLabel").textContent=login?"Email or Mobile number":"Email";
    if(el("authTitle"))el("authTitle").textContent=login?"Welcome back":"Create your account";
    if(el("authSub"))el("authSub").textContent=login?"Email অথবা mobile number + password দিয়ে login করো।":"Email + mobile number দিয়ে account তৈরি করো। OTP লাগবে না।";
    if(el("authSubmit"))el("authSubmit").textContent=login?"Login":"Create Account";
    if(el("authEmail"))el("authEmail").placeholder=login?"Email or 01XXXXXXXXX":"you@example.com";
    if(el("authPassword"))el("authPassword").autocomplete=login?"current-password":"new-password";
    msg("");
    window.__lexoraAuthMode=mode;
  }

  function firebaseMessage(e){
    const code=e?.code||"";
    const map={
      "auth/email-already-in-use":"এই email দিয়ে account আগে থেকেই আছে।",
      "auth/invalid-email":"Email format ঠিক নয়।",
      "auth/weak-password":"Password আরও শক্তিশালী করো (কমপক্ষে 6 characters)।",
      "auth/user-not-found":"Account পাওয়া যায়নি।",
      "auth/wrong-password":"Password সঠিক নয়।",
      "auth/invalid-credential":"Email/Phone অথবা Password সঠিক নয়।",
      "auth/network-request-failed":"Internet connection check করো।",
      "auth/too-many-requests":"অনেকবার চেষ্টা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করো।",
      "permission-denied":"Firebase Firestore Rules-এ permission দেওয়া হয়নি।",
      "lexora/invalid-phone":"Mobile number format ঠিক নয়।"
    };
    return map[code]||e?.message||"Authentication-এ সমস্যা হয়েছে।";
  }

  async function checkAdmin(){
    isAdmin=false;
    if(!currentUser||!window.lexoraDb)return false;
    try{
      const snap=await window.lexoraDb.collection("admins").doc(currentUser.uid).get();
      isAdmin=snap.exists;
      if(snap.exists)currentProfile={...currentProfile,admin:true};
    }catch(e){console.warn("Admin check failed",e)}
    return isAdmin;
  }

  function initials(name){
    return (name||"L").trim().split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase()||"L";
  }
  function profileHTML(){
    const total=vxState.right+vxState.wrong;
    const accuracy=total?Math.round(vxState.right/total*100):0;
    return `<div class="profile-head"><div class="profile-avatar">${initials(currentProfile.name||currentUser?.displayName)}</div><div><div class="profile-value">${escapeHtml(currentProfile.name||currentUser?.displayName||"Learner")}</div><div class="profile-label">Lexora learner ${isAdmin?"· Admin":""}</div></div></div><div class="profile-grid" style="margin-top:16px"><div class="profile-card"><div class="profile-label">Email</div><div>${escapeHtml(currentProfile.email||currentUser?.email||"—")}</div></div><div class="profile-card"><div class="profile-label">Mobile number</div><div>${escapeHtml(currentProfile.phone||"—")}</div></div><div class="profile-card"><div class="profile-label">Words learned</div><div class="profile-value">${learned.length}</div></div><div class="profile-card"><div class="profile-label">Practice accuracy</div><div class="profile-value">${accuracy}%</div></div><div class="profile-card"><div class="profile-label">Current streak</div><div class="profile-value">${streakDays()} days</div></div><div class="profile-card"><div class="profile-label">Total practice</div><div class="profile-value">${total}</div></div></div><div class="profile-card" style="margin-top:12px"><div class="profile-label">Change display name</div><div style="display:flex;gap:8px;margin-top:8px"><input id="profileNameInput" value="${escapeAttr(currentProfile.name||currentUser?.displayName||"")}" style="flex:1;padding:12px;border:1px solid var(--line);border-radius:12px;background:var(--bg);color:var(--text)"><button type="button" class="btn primary" id="saveProfileName">Save</button></div><p id="profileMsg" class="muted" style="margin:8px 0 0"></p></div><button type="button" class="btn secondary" id="profileLogout" style="width:100%;margin-top:12px">Log out</button>`;
  }
  function escapeHtml(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));}
  function escapeAttr(v){return escapeHtml(v);}
  function openProfile(){
    const m=el("profileModal");if(!m)return;
    el("profileContent").innerHTML=profileHTML();m.classList.remove("hidden");
    el("saveProfileName").onclick=async()=>{
      const name=el("profileNameInput").value.trim();
      if(!name){el("profileMsg").textContent="নাম খালি রাখা যাবে না।";return;}
      try{
        await currentUser.updateProfile({displayName:name});
        await window.lexoraDb.collection("users").doc(currentUser.uid).set({name,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
        currentProfile.name=name;showApp();el("profileMsg").textContent="Profile updated.";
      }catch(e){el("profileMsg").textContent=firebaseMessage(e)}
    };
    el("profileLogout").onclick=()=>firebase.auth().signOut();
  }

  async function openAdmin(){
    if(!isAdmin)return;
    const m=el("adminModal");if(!m)return;
    m.classList.remove("hidden");
    const box=el("adminContent");box.innerHTML="<p class='muted'>Loading users...</p>";
    try{
      const snap=await window.lexoraDb.collection("users").orderBy("createdAt","desc").limit(100).get();
      const users=snap.docs.map(d=>({id:d.id,...d.data()}));
      const total=users.length;
      let learnedTotal=0,practiceTotal=0;
      users.forEach(u=>{learnedTotal+=(Array.isArray(u.learned)?u.learned.length:0);const x=u.vxState||{};practiceTotal+=(Number(x.right)||0)+(Number(x.wrong)||0)});
      box.innerHTML=`<div class="admin-grid"><div class="admin-card"><div class="profile-label">Users loaded</div><div class="admin-stat">${total}</div></div><div class="admin-card"><div class="profile-label">Words learned</div><div class="admin-stat">${learnedTotal}</div></div><div class="admin-card"><div class="profile-label">Practice answers</div><div class="admin-stat">${practiceTotal}</div></div><div class="admin-card"><div class="profile-label">Your role</div><div class="admin-stat" style="font-size:22px">ADMIN</div></div></div><input id="adminSearch" class="admin-search" placeholder="Search name, email or mobile..."><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>Words</th><th>Practice</th></tr></thead><tbody id="adminUsersBody"></tbody></table></div>`;
      const render=()=>{const q=(el("adminSearch").value||"").toLowerCase();el("adminUsersBody").innerHTML=users.filter(u=>`${u.name||""} ${u.email||""} ${u.phone||""}`.toLowerCase().includes(q)).map(u=>{const x=u.vxState||{};return `<tr><td>${escapeHtml(u.name||"—")}</td><td>${escapeHtml(u.email||"—")}</td><td>${escapeHtml(u.phone||"—")}</td><td>${Array.isArray(u.learned)?u.learned.length:0}</td><td>${(Number(x.right)||0)+(Number(x.wrong)||0)}</td></tr>`}).join("")||'<tr><td colspan="5">No users found.</td></tr>';};
      el("adminSearch").oninput=render;render();
    }catch(e){box.innerHTML=`<p class="auth-msg bad">Admin data load failed: ${escapeHtml(firebaseMessage(e))}</p>`;}
  }

  el("loginTab")?.addEventListener("click",()=>setMode("login"));
  el("signupTab")?.addEventListener("click",()=>setMode("signup"));
  el("accountBtn")?.addEventListener("click",openProfile);
  el("adminBtn")?.addEventListener("click",openAdmin);
  el("profileClose")?.addEventListener("click",()=>el("profileModal")?.classList.add("hidden"));
  el("adminClose")?.addEventListener("click",()=>el("adminModal")?.classList.add("hidden"));
  ["profileModal","adminModal"].forEach(id=>el(id)?.addEventListener("click",e=>{if(e.target.id===id)e.currentTarget.classList.add("hidden")}));

  el("authForm")?.addEventListener("submit",async e=>{
    e.preventDefault();
    const submit=el("authSubmit");
    if(submit)submit.disabled=true;
    msg("Checking...","");
    try{
      if(!window.lexoraAuth||!window.lexoraDb)throw new Error("Firebase এখনো initialize হয়নি।");
      const mode=window.__lexoraAuthMode||"signup";
      const name=el("authName").value.trim();
      const identifier=el("authEmail").value.trim();
      const email=normalizeEmail(identifier);
      const phone=normalizePhone(el("authPhone").value);
      const password=el("authPassword").value;
      if(mode==="signup"){
        if(!name)throw new Error("নাম দাও।");
        if(!/^\S+@\S+\.\S+$/.test(email))throw new Error("Valid email দাও।");
        if(!validPhone(phone))throw new Error("Valid Bangladeshi mobile number দাও।");
        if(password.length<6)throw new Error("Password কমপক্ষে 6 characters হতে হবে।");
        if(password!==el("authConfirm").value)throw new Error("দুটি password মেলেনি।");
        const phoneSnap=await window.lexoraDb.collection("loginIdentifiers").doc(identifierKey("phone",phone)).get();
        if(phoneSnap.exists)throw new Error("এই mobile number দিয়ে account আগে থেকেই আছে।");
        const emailSnap=await window.lexoraDb.collection("loginIdentifiers").doc(identifierKey("email",email)).get();
        if(emailSnap.exists)throw new Error("এই email দিয়ে account আগে থেকেই আছে।");
        await createAccount(name,email,phone,password);
        msg("Account তৈরি হয়েছে।","good");
      }else{
        if(!identifier)throw new Error("Email অথবা mobile number দাও।");
        if(!password)throw new Error("Password দাও।");
        await loginWithIdentifier(identifier,password);
        msg("Login successful.","good");
      }
    }catch(err){
      console.error("Lexora auth error",err);
      msg(firebaseMessage(err),"bad");
      if(submit)submit.disabled=false;
    }
  });

  if(!window.firebase||!firebaseConfig){msg("Firebase SDK/config পাওয়া যায়নি।","bad");return;}
  try{
    if(!firebase.apps.length)firebase.initializeApp(firebaseConfig);
    window.lexoraAuth=firebase.auth();
    window.lexoraDb=firebase.firestore();
    window.lexoraAuth.onAuthStateChanged(async user=>{
      currentUser=user;
      if(!user){isAdmin=false;showAuth();if(el("authSubmit"))el("authSubmit").disabled=false;return;}
      try{
        await cloudLoad(user);
        await checkAdmin();
        showApp();
      }catch(e){console.error(e);showApp();}
      if(el("authSubmit"))el("authSubmit").disabled=false;
    });
  }catch(e){
    console.error("Firebase initialization error",e);
    msg("Firebase initialize করা যায়নি।","bad");
  }
  setMode("signup");
})();
