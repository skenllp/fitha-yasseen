/* ===== EDIT THESE ===== */
var BRIDE = "Fitha Noureen";
var GROOM = "Muhammed Yasseen";
var WEDDING = "2026-12-05T11:00:00+05:30";
var DATE_TEXT = "";
/* ====================== */
(function(){
  var B1=BRIDE.split(" ")[0], G1=GROOM.split(" ")[0]; var names = B1 + " & " + G1; var full = BRIDE + " & " + GROOM;
  document.querySelectorAll("[data-full]").forEach(function(e){e.textContent=full});
  document.querySelectorAll("[data-names]").forEach(function(e){e.textContent=names});
  var n1 = document.querySelector("[data-n1]");
  var n2 = document.querySelector("[data-n2]");
  if(n1) n1.textContent = B1;
  if(n2) n2.textContent = G1;
  if(DATE_TEXT) document.querySelector("[data-date]").textContent = DATE_TEXT;
  document.title = names + " – Wedding Invitation";

  var env = document.getElementById("env");
  var music = document.getElementById("bgMusic");
  function openEnv(){
    env.classList.add("open");
    document.body.style.overflow="";
    if(music){music.play().catch(function(){});}
  }
  document.body.style.overflow="hidden";
  env.addEventListener("click",openEnv);
  env.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" ")openEnv()});


  var cd = document.querySelectorAll("#cd b");
  function tick(){
    if(!WEDDING) return;
    var d = new Date(WEDDING) - new Date();
    if(d<0) d=0;
    var v=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];
    v.forEach(function(x,i){cd[i].textContent=String(x).padStart(2,"0")});
    var sb=cd[3];if(sb.dataset.s!==String(v[3])){sb.dataset.s=String(v[3]);sb.classList.remove("pop");void sb.offsetWidth;sb.classList.add("pop")}
  }
  tick(); setInterval(tick,1000);

  var io = new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add("in")})},{threshold:.15});
  document.querySelectorAll(".fade").forEach(function(e){io.observe(e)});

  (function(){
    var g=document.getElementById("calg"),H="";
    ["Su","Mo","Tu","We","Th","Fr","Sa"].forEach(function(d){H+='<div class="h">'+d+'</div>'});
    var first=new Date(2026,11,1).getDay(),n=31;
    for(var i=0;i<first;i++)H+='<div></div>';
    for(var d=1;d<=n;d++)H+='<div><div class="x'+(d===5?' on':'')+'">'+d+'</div></div>';
    g.innerHTML=H;
    document.getElementById("addcal").href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent("Nikkah – "+names)+"&dates=20261205T053000Z/20261205T063000Z&location="+encodeURIComponent("Jacobs Convention Centre, Muvattupuzha");
    var c2=document.getElementById("cd2");
    function t2(){var d=new Date(WEDDING)-new Date();if(d<0)d=0;c2.innerHTML=Math.floor(d/864e5)+" days "+Math.floor(d/36e5)%24+" hours "+Math.floor(d/6e4)%60+" min <span class=\"sec\">"+Math.floor(d/1e3)%60+" sec</span>"}
    t2();setInterval(t2,1000);
  })();
  var wl=document.getElementById("wl"), db=null, LK="wishes_local";
  function show(items){wl.innerHTML="";items.forEach(function(w){var d=document.createElement("div");d.className="wish";var b=document.createElement("b");b.textContent=w.name;var p=document.createElement("p");p.textContent=w.msg;d.appendChild(b);d.appendChild(p);wl.appendChild(d)})}
  function local(){try{return JSON.parse(localStorage.getItem(LK)||"[]")}catch(e){return[]}}
  show(local());
  if(typeof claude!=="undefined"){claude.use("db").then(function(x){if(!x)return;db=x;
    var t=setTimeout(function(){},10000);
    db.collection("wishes").orderBy("t","desc").limit(100).onSnapshot(function(sn){clearTimeout(t);show(sn.docs.map(function(d){return d.data()}))},function(){})
  }).catch(function(){})}
  document.getElementById("wsend").addEventListener("click",function(){
    var n=document.getElementById("wn"),m=document.getElementById("wm");
    var name=n.value.trim(),msg=m.value.trim();
    if(!name){n.focus();return} if(!msg){m.focus();return}
    var w={name:name,msg:msg,t:Date.now()};
    if(db){db.collection("wishes").add(w).catch(function(){})}
    else{var a=local();a.unshift(w);try{localStorage.setItem(LK,JSON.stringify(a))}catch(e){}show(a)}
    m.value="";
  });
})();
