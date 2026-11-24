(function(){
  /* Contenido del juego. answers[0] es la palabra que se muestra; el resto son variantes aceptadas. */
  var ITEMS=[
    {l:'A',type:'q',clue:'Es el líquido que las plantas necesitan para crecer. En el huerto hay que cuidarlo y no malgastarlo.',answers:['agua'],fact:'Regar a primera hora de la mañana o al atardecer evita que el agua se evapore con el sol.'},
    {l:'B',type:'q',clue:'Es la gran variedad de plantas, animales e insectos distintos que viven en un mismo lugar.',answers:['biodiversidad'],fact:'Un huerto con muchas plantas e insectos distintos tiene menos plagas y es más fuerte.'},
    {l:'C',type:'q',clue:'Abono natural que se hace con restos de frutas, verduras y hojas que se pudren poco a poco.',answers:['compost','compostaje'],fact:'Con el compost devolvemos alimento a la tierra y tiramos menos basura.'},
    {l:'D',type:'q',clue:'Fruto dulce de la palmera. En Elche hay un palmeral muy famoso lleno de ellas.',answers:['dátil','datil','datiles'],fact:'El Palmeral de Elche es Patrimonio de la Humanidad de la UNESCO.'},
    {l:'E',type:'c',name:'El espantapájaros',text:'Haz el espantapájaros durante 30 segundos: brazos abiertos, sin moverte y sin reírte.',seconds:30,fact:'Un espantapájaros ayuda a proteger la cosecha de las aves sin usar productos químicos.'},
    {l:'F',type:'q',clue:'Parte de la planta que nace de la flor y guarda las semillas. La naranja y la fresa son ejemplos.',answers:['fruto','fruta','frutos','frutas'],fact:'Comer fruta de temporada, la que madura en cada época del año, gasta menos energía y sabe mejor.'},
    {l:'G',type:'q',clue:'Sistema de riego que suelta el agua poco a poco, gota a gota, junto a la raíz de cada planta.',answers:['goteo','gota a gota','riego por goteo','riego gota a gota'],fact:'El riego por goteo lleva el agua justo donde hace falta y casi no se pierde nada.'},
    {l:'H',type:'q',clue:'Terreno donde se cultivan verduras y hortalizas. Alrededor de València hay una muy famosa.',answers:['huerta','huerto','horta'],fact:'El Tribunal de las Aguas de València, que resuelve los problemas del riego en la huerta, se reúne los jueves.'},
    {l:'I',type:'q',clue:'Animal pequeño con seis patas, como la abeja, la mariposa o la hormiga.',answers:['insecto','insectos'],fact:'Las abejas y otros insectos llevan el polen de flor en flor, y así se forman los frutos.'},
    {l:'J',type:'q',clue:'Lugar con flores y plantas de adorno donde viven mariposas y abejas.',answers:['jardín','jardin'],fact:'Plantar flores cerca del huerto atrae a los insectos que ayudan a las plantas.'},
    {l:'K',type:'q',clue:'Mide mil metros. Los alimentos de "km 0" se cultivan cerca de donde se venden.',answers:['kilómetro','kilometro','kilometros','km'],fact:'Los alimentos de kilómetro 0 viajan poco, gastan menos combustible y contaminan menos.'},
    {l:'L',type:'q',clue:'Animal blando y alargado, sin patas, que vive bajo tierra, la airea y fabrica abono natural.',answers:['lombriz','lombrices'],fact:'Las lombrices hacen túneles que dejan pasar el aire y el agua hasta las raíces.'},
    {l:'M',type:'q',clue:'Insecto rojo con puntitos negros que se come los pulgones que atacan a las plantas.',answers:['mariquita','mariquitas'],fact:'Las mariquitas protegen el huerto sin necesidad de usar productos químicos.'},
    {l:'N',type:'q',clue:'Fruta redonda y naranja, símbolo de la Comunitat Valenciana. Con ella se hace zumo.',answers:['naranja','naranjas'],fact:'La flor del naranjo se llama azahar y huele muy bien.'},
    {l:'O',type:'q',clue:'Árbol mediterráneo de hojas plateadas y tronco retorcido. Da aceitunas.',answers:['olivo','olivos','olivera','oliveras'],fact:'Hay olivos que tienen cientos de años y siguen dando aceitunas.'},
    {l:'P',type:'c',name:'La semilla que crece',text:'Hazte semilla: empieza agachado en el suelo y, poco a poco, crece hasta ser una planta enorme con las ramas al sol. Tienes 20 segundos.',seconds:20,fact:'Una semilla necesita agua, calor y luz para convertirse en planta.'},
    {l:'R',type:'c',name:'La regadera',text:'Haz de regadera: imita cómo riegas las plantas y di en voz alta 3 formas de ahorrar agua en el huerto.',seconds:40,fact:'Cada gota cuenta: un huerto bien regado gasta menos agua.',tip:'Ideas: riego por goteo, regar temprano o al atardecer, recoger agua de lluvia, cubrir la tierra con paja.'},
    {l:'S',type:'q',clue:'Si la entierras y la riegas, de ella nace una planta nueva.',answers:['semilla','semillas'],fact:'Guardar semillas de cada cosecha ayuda a conservar las variedades de siempre.'},
    {l:'T',type:'c',name:'El tractor',text:'Imita a un tractor arando el campo durante 20 segundos, con todos sus ruidos y movimientos.',seconds:20,fact:'El arado remueve la tierra para que las semillas puedan crecer.'},
    {l:'U',type:'q',clue:'Fruto pequeño y dulce que crece en racimos. Se toman doce en Nochevieja.',answers:['uva','uvas'],fact:'En el Vinalopó, en Alicante, se cultiva una uva de mesa muy conocida: la uva embolsada.'},
    {l:'V',type:'c',name:'Verduras verdes',text:'Nombra 5 verduras u hortalizas de color verde en 1 minuto.',seconds:60,fact:'Las verduras de hoja verde son de las que más vitaminas dan.',tip:'Ideas: lechuga, espinaca, acelga, brócoli, judía verde, pepino, calabacín, pimiento verde, col.'},
    {l:'Z',type:'q',clue:'Hortaliza alargada y naranja que crece bajo tierra. A los conejos les encanta.',answers:['zanahoria','zanahorias'],fact:'Lo que comemos de la zanahoria es su raíz.'}
  ];
  var N=ITEMS.length;
  var NQ=ITEMS.filter(function(i){return i.type==='q'}).length;
  var NC=N-NQ;
  var STATE_TXT={p:'pendiente',ok:'bien',bad:'mal',s:'pasada'};

  /* Apoyos visuales para la versión TEA. En las preguntas, opts[0] es la respuesta correcta y las otras dos son distractores claramente distintos. */
  var TEA={
    A:{pics:'💧',short:'Las plantas lo beben. Sale de la regadera.',opts:[['agua','💧'],['arena','🏖️'],['piedra','🪨']],fact:'Regamos por la mañana o por la tarde para no gastar agua.'},
    B:{pics:'🐝🦋🌸🐛',short:'Muchas plantas y animales distintos viven juntos.',opts:[['biodiversidad','🐝🦋🌸'],['basura','🗑️'],['bicicleta','🚲']],fact:'Si hay muchos seres vivos distintos, el huerto está más sano.'},
    C:{pics:'🍌🍂➡️🟤',short:'Abono natural hecho con restos de comida y hojas.',opts:[['compost','♻️'],['cemento','🧱'],['champú','🧴']],fact:'Con el compost damos comida a la tierra y tiramos menos basura.'},
    D:{pics:'🌴',short:'Fruto dulce de la palmera. En Elche hay muchas palmeras.',opts:[['dátil','🌴'],['dado','🎲'],['dedo','☝️']],fact:'El Palmeral de Elche es muy famoso.'},
    E:{pics:'🧍',name:'El espantapájaros',steps:[['🧍','Ponte de pie.'],['🙆','Abre los brazos como un espantapájaros.'],['🤫','No te muevas ni te rías.']],tip:'',fact:'El espantapájaros protege la cosecha de los pájaros.'},
    F:{pics:'🍎🍓🍊',short:'Crece en el árbol o en la planta. Se come. La fresa es un ejemplo.',opts:[['fruta','🍓'],['fuego','🔥'],['foca','🦭']],fact:'La fruta de temporada gasta menos energía.'},
    G:{pics:'🌱💧',short:'El agua cae poco a poco, gota a gota, junto a la planta.',opts:[['goteo','💧'],['globo','🎈'],['gato','🐱']],fact:'El riego por goteo ahorra mucha agua.'},
    H:{pics:'🥕🥬🌽',short:'Terreno donde crecen las verduras. En València hay una muy famosa.',opts:[['huerta','🥕'],['hielo','🧊'],['hoguera','🔥']],fact:'La huerta de València es muy antigua.'},
    I:{pics:'🐝🦋🐜',short:'Animal pequeño con seis patas. La abeja es un ejemplo.',opts:[['insecto','🐝'],['isla','🏝️'],['iglesia','⛪']],fact:'Las abejas llevan el polen de flor en flor.'},
    J:{pics:'🌷🌻🦋',short:'Lugar con flores y plantas bonitas.',opts:[['jardín','🌷'],['jabón','🧼'],['jirafa','🦒']],fact:'Las flores atraen a insectos buenos para el huerto.'},
    K:{pics:'📏🚶',short:'Mide mil metros. Es una distancia larga.',opts:[['kilómetro','📏'],['koala','🐨'],['kiwi','🥝']],fact:'Si un alimento viaja poco, contamina menos.'},
    L:{pics:'🪱',short:'Animal blando y largo, sin patas. Vive bajo la tierra.',opts:[['lombriz','🪱'],['luna','🌙'],['libro','📖']],fact:'Las lombrices hacen túneles para que pase el aire.'},
    M:{pics:'🐞',short:'Insecto rojo con puntos negros. Se come los bichos malos.',opts:[['mariquita','🐞'],['mesa','🪑'],['moto','🛵']],fact:'La mariquita cuida las plantas sin productos químicos.'},
    N:{pics:'🍊',short:'Fruta redonda y naranja. Con ella se hace zumo.',opts:[['naranja','🍊'],['nube','☁️'],['nieve','❄️']],fact:'La flor del naranjo se llama azahar y huele muy bien.'},
    O:{pics:'🫒🌳',short:'Árbol con hojas plateadas. Da aceitunas.',opts:[['olivo','🫒'],['oso','🐻'],['ojo','👁️']],fact:'Algunos olivos tienen cientos de años.'},
    P:{pics:'🌰',name:'La semilla que crece',steps:[['🌰','Agáchate. Eres una semilla.'],['💧','Llega el agua y el sol.'],['🌱','Crece poco a poco.'],['🌳','Brazos arriba. Ya eres una planta grande.']],tip:'',fact:'Una semilla necesita agua, calor y luz para crecer.'},
    R:{pics:'🚿',name:'La regadera',steps:[['🚿','Haz como que riegas las plantas.'],['🗣️','Di en voz alta 3 formas de ahorrar agua.']],tip:'💧 goteo · 🌧️ agua de lluvia · 🌅 regar temprano',fact:'Cada gota cuenta en el huerto.'},
    S:{pics:'🌰➡️🌱',short:'La entierras, la riegas y nace una planta.',opts:[['semilla','🌱'],['sopa','🍲'],['silla','🪑']],fact:'Guardamos semillas para que sigan existiendo las variedades de siempre.'},
    T:{pics:'🚜',name:'El tractor',steps:[['🚜','Imita a un tractor.'],['🔊','Haz el ruido del motor.'],['↔️','Muévete como si araras la tierra.']],tip:'',fact:'El tractor remueve la tierra para sembrar.'},
    U:{pics:'🍇',short:'Fruto pequeño y dulce que crece en racimos.',opts:[['uva','🍇'],['uña','💅'],['uno','1️⃣']],fact:'En Nochevieja se toman doce uvas.'},
    V:{pics:'🥬🥦🥒🫑',name:'Verduras verdes',steps:[['🥦','Piensa en verduras de color verde.'],['🗣️','Di 5 en voz alta.'],['⏱️','Tienes 1 minuto.']],tip:'🥬 lechuga · 🥦 brócoli · 🥒 pepino · 🫑 pimiento',fact:'Las verduras verdes tienen muchas vitaminas.'},
    Z:{pics:'🥕',short:'Verdura naranja y alargada. Crece bajo tierra.',opts:[['zanahoria','🥕'],['zapato','👟'],['zorro','🦊']],fact:'De la zanahoria comemos la raíz.'}
  };

  function $(id){return document.getElementById(id)}
  var panel=$('panel');

  function fresh(prev){
    var total=prev?prev.total:480, mode=prev?prev.mode:'type', tea=prev?prev.tea:false;
    return {status:'intro',total:total,mode:mode,tea:tea,left:total,idx:-1,res:ITEMS.map(function(){return 'p'}),ch:null,revealed:false,reason:'',elapsed:0,fin:{}};
  }
  var S=fresh();
  /* Enlace directo a la versión TEA: la dirección de la página terminada en #tea */
  try{if(location.hash==='#tea'){S.tea=true;S.total=0;S.left=0;}}catch(e){}
  function applyTea(){var w=document.querySelector('.wrap');if(w)w.classList.toggle('tea',S.tea);}

  /* Comparación de respuestas: sin mayúsculas, sin tildes, sin artículo y con un margen para faltas de escritura. */
  function norm(s){
    s=String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
    return s.replace(/^(el|la|los|las|un|una|unos|unas) /,'');
  }
  function lev(a,b){
    var m=a.length,n=b.length;
    if(!m)return n; if(!n)return m;
    var p=[],j,i;
    for(j=0;j<=n;j++)p[j]=j;
    for(i=1;i<=m;i++){
      var c=[i];
      for(j=1;j<=n;j++){
        c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a.charAt(i-1)===b.charAt(j-1)?0:1));
      }
      p=c;
    }
    return p[n];
  }
  function isCorrect(input,item){
    var n=norm(input);
    if(!n)return false;
    for(var k=0;k<item.answers.length;k++){
      var a=norm(item.answers[k]);
      if(n===a)return true;
      var tol=a.length>=9?2:(a.length>=6?1:0);
      if(tol&&lev(n,a)<=tol)return true;
    }
    return false;
  }

  function fmt(sec){
    sec=Math.max(0,Math.ceil(sec));
    var m=Math.floor(sec/60),s=sec%60;
    return m+':'+(s<10?'0':'')+s;
  }
  function counts(){
    var ok=0,bad=0,left=0;
    S.res.forEach(function(r){if(r==='ok')ok++;else if(r==='bad')bad++;else left++;});
    return {ok:ok,bad:bad,left:left};
  }

  /* Rosco */
  function buildRosco(){
    var ol=$('nodes');ol.innerHTML='';
    ITEMS.forEach(function(it,i){
      var a=(-90+i*360/N)*Math.PI/180,R=43;
      var li=document.createElement('li');
      li.className='node'+(it.type==='c'?' ch':'');
      li.style.left=(50+R*Math.cos(a)).toFixed(2)+'%';
      li.style.top=(50+R*Math.sin(a)).toFixed(2)+'%';
      li.textContent=it.l;
      ol.appendChild(li);
    });
  }
  function paintRosco(){
    var kids=$('nodes').children;
    for(var i=0;i<kids.length;i++){
      var li=kids[i],r=S.res[i];
      li.setAttribute('data-s',r);
      var cur=(i===S.idx)&&(S.status==='question'||S.status==='feedback'||S.status==='challenge');
      li.classList.toggle('cur',cur);
      li.setAttribute('aria-label','Letra '+ITEMS[i].l+', '+(ITEMS[i].type==='c'?'prueba comodín, ':'')+STATE_TXT[r]);
    }
  }
  function paintHub(){
    var c=counts();
    applyTea();
    $('tOk').textContent=c.ok;$('tBad').textContent=c.bad;$('tLeft').textContent=c.left;
    $('lblBad').textContent=S.tea?'repasar':'mal';
    var t=$('hubTime'),lab=$('hubLab');
    if(S.status==='end'){lab.textContent='Fin';t.textContent=c.ok+'/'+N;t.classList.remove('low');return;}
    if(S.tea){lab.textContent='Hechas';t.textContent=(N-c.left)+'/'+N;t.classList.remove('low');return;}
    if(S.total===0){lab.textContent='Sin límite';t.textContent='∞';t.classList.remove('low');return;}
    lab.textContent='Tiempo';
    t.textContent=fmt(S.left);
    t.classList.toggle('low',S.status!=='intro'&&S.left<=30);
  }

  /* Reloj */
  var tm=null,lastT=0;
  function startLoop(){stopLoop();lastT=performance.now();tm=setInterval(tick,200);}
  function stopLoop(){if(tm){clearInterval(tm);tm=null;}}
  function tick(){
    var now=performance.now(),dt=(now-lastT)/1000;lastT=now;
    if(S.status==='question'&&!S.revealed){
      S.elapsed+=dt;
      if(S.total>0){
        S.left=Math.max(0,S.left-dt);
        paintHub();
        if(S.left<=0){endGame('time');}
      }
    }else if(S.status==='challenge'&&S.ch&&S.ch.phase==='running'){
      S.ch.left=Math.max(0,S.ch.left-dt);
      var el=$('chTime');
      if(el)el.textContent=Math.ceil(S.ch.left);
      var bar=$('chBar');
      if(bar)bar.style.width=(S.ch.left/ITEMS[S.idx].seconds*100)+'%';
      if(S.ch.left<=0){S.ch.phase='done';renderChallenge();}
    }
  }

  /* Flujo */
  function nextIndex(from){
    for(var k=1;k<=N;k++){
      var j=(((from+k)%N)+N)%N;
      if((S.res[j]==='p'||S.res[j]==='s')&&!S.fin[j])return j;
    }
    return -1;
  }
  function startGame(){
    S.res=ITEMS.map(function(){return 'p'});
    S.fin={};
    S.idx=-1;S.left=S.total;S.elapsed=0;S.reason='';
    startLoop();
    goNext(-1);
  }
  function goNext(from){
    var j=nextIndex(from);
    if(j<0){endGame('done');return;}
    S.idx=j;S.revealed=false;
    if(ITEMS[j].type==='c'){
      S.status='challenge';S.ch={phase:'ready',left:ITEMS[j].seconds};
      renderChallenge();
    }else{
      S.status='question';renderQuestion();
    }
    paintRosco();paintHub();
  }
  function resolve(result){
    S.res[S.idx]=result;
    S.status='feedback';
    S.ch=null;
    renderFeedback(result);
    paintRosco();paintHub();
  }
  function pass(){
    /* En la versión TEA, una letra pasada vuelve una sola vez; si se vuelve a pasar, se aparca. */
    if(S.tea&&S.res[S.idx]==='s')S.fin[S.idx]=true;
    S.res[S.idx]='s';
    S.ch=null;
    goNext(S.idx);
  }
  function endGame(reason){
    stopLoop();
    S.status='end';S.reason=reason;S.ch=null;
    renderEnd();paintRosco();paintHub();
  }

  function focusFirst(){
    var el=panel.querySelector('[data-autofocus]');
    if(el){try{el.focus({preventScroll:true});}catch(e){el.focus();}}
  }
  function bindQuit(){
    var b=$('quit');if(!b)return;
    var armed=false,t=null;
    b.addEventListener('click',function(){
      if(!armed){
        armed=true;b.textContent='¿Seguro? Pulsa otra vez para terminar';
        t=setTimeout(function(){armed=false;b.textContent='Terminar ahora';},3500);
      }else{clearTimeout(t);endGame('quit');}
    });
  }

  /* Vistas */
  function renderIntro(){
    if(S.tea){renderIntroTea();return;}
    panel.innerHTML=
      '<h2>¿Cuánto sabes del huerto?</h2>'+
      '<p class="lead">'+N+' letras: '+NQ+' preguntas y '+NC+' pruebas comodín. Acierta la palabra que empieza por la letra, o supera la prueba, para pintarla de verde.</p>'+
      '<ul class="rules">'+
        '<li>Si no lo sabes, pulsa <strong>Pasapalabra</strong>. La letra vuelve en la segunda vuelta.</li>'+
        '<li>Las pruebas comodín se hacen de pie y delante de todos. ¡Con ganas!</li>'+
        '<li>Después de cada letra descubrirás un dato sobre el huerto.</li>'+
      '</ul>'+
      '<div class="legend" aria-hidden="true"><span><i class="sw"></i>Pregunta</span><span><i class="sw ch"></i>Prueba comodín</span><span><i class="sw ok"></i>Bien</span><span><i class="sw bad"></i>Mal</span><span><i class="sw s"></i>Pasada</span></div>'+
      '<fieldset><legend>Tiempo</legend><div class="seg">'+
        '<label><input type="radio" name="time" value="300"><span>5 minutos</span></label>'+
        '<label><input type="radio" name="time" value="480"><span>8 minutos</span></label>'+
        '<label><input type="radio" name="time" value="0"><span>Sin límite</span></label>'+
      '</div></fieldset>'+
      '<fieldset><legend>Cómo se responde</legend><div class="seg">'+
        '<label><input type="radio" name="mode" value="type"><span>Escribiendo</span></label>'+
        '<label><input type="radio" name="mode" value="voice"><span>En voz alta (la persona docente comprueba)</span></label>'+
      '</div></fieldset>'+
      versionHTML()+
      '<div class="row"><button class="btn" id="start" type="button" data-autofocus>Empezar el rosco</button></div>';
    bindVersion();
    var rt=panel.querySelectorAll('input[name="time"]'),rm=panel.querySelectorAll('input[name="mode"]');
    Array.prototype.forEach.call(rt,function(r){
      r.checked=(Number(r.value)===S.total);
      r.addEventListener('change',function(){S.total=Number(r.value);S.left=S.total;paintHub();});
    });
    Array.prototype.forEach.call(rm,function(r){
      r.checked=(r.value===S.mode);
      r.addEventListener('change',function(){S.mode=r.value;});
    });
    $('start').addEventListener('click',startGame);
  }

  /* Versión TEA */
  function versionHTML(){
    return '<fieldset><legend>Versión</legend><div class="seg">'+
      '<label><input type="radio" name="ver" value="std"><span>Normal</span></label>'+
      '<label><input type="radio" name="ver" value="tea"><span>Con apoyos visuales (TEA)</span></label>'+
    '</div></fieldset>';
  }
  function bindVersion(){
    Array.prototype.forEach.call(panel.querySelectorAll('input[name="ver"]'),function(r){
      r.checked=((r.value==='tea')===S.tea);
      r.addEventListener('change',function(){
        S.tea=(r.value==='tea');
        S.total=S.tea?0:480;S.left=S.total;
        renderIntro();paintHub();
      });
    });
  }
  function renderIntroTea(){
    panel.innerHTML=
      '<h2>El Rosco del Huerto</h2>'+
      '<div class="steps3">'+
        '<div class="s3"><span class="pic" aria-hidden="true">👀</span><b>1. Mira</b></div>'+
        '<div class="s3"><span class="pic" aria-hidden="true">👆</span><b>2. Elige</b></div>'+
        '<div class="s3"><span class="pic" aria-hidden="true">⭐</span><b>3. Descubre</b></div>'+
      '</div>'+
      '<ul class="rules">'+
        '<li>Hay '+N+' letras.</li>'+
        '<li>No hay prisa y no hay reloj.</li>'+
        '<li>Si no quieres una letra, pulsa «Ahora no».</li>'+
        '<li>Al terminar una letra, pulsa «Siguiente».</li>'+
      '</ul>'+
      '<div class="legend"><span><i class="sw ok"></i>Bien</span><span><i class="sw bad"></i>Para repasar</span><span><i class="sw s"></i>Ahora no</span><span><i class="sw ch"></i>Prueba</span></div>'+
      versionHTML()+
      '<div class="row"><button class="btn" id="start" type="button" data-autofocus>Empezar</button></div>';
    bindVersion();
    $('start').addEventListener('click',startGame);
  }
  function renderQuestionTea(){
    var it=ITEMS[S.idx],t=TEA[it.l];
    var cor=t.opts[0],order=t.opts.slice(1);
    order.splice(S.idx%3,0,cor);
    var canSay=('speechSynthesis' in window)&&('SpeechSynthesisUtterance' in window);
    panel.innerHTML=
      '<div class="qhead"><span class="badge">'+it.l+'</span><p class="kicker">Letra '+it.l+'</p></div>'+
      '<div class="bigpic pic" aria-hidden="true">'+t.pics+'</div>'+
      '<p class="clue">'+t.short+'</p>'+
      (canSay?'<div class="row"><button class="btn quiet" id="say" type="button"><span class="pic" aria-hidden="true">🔊</span> Escuchar</button></div>':'')+
      '<div class="opts">'+order.map(function(o,i){
        return '<button type="button" class="opt" data-i="'+i+'"><span class="pic" aria-hidden="true">'+o[1]+'</span><span>'+o[0]+'</span></button>';
      }).join('')+'</div>'+
      '<div class="row"><button class="btn quiet" id="pass" type="button">Ahora no</button></div>'+
      '<button class="link" id="quit" type="button">Terminar ahora</button>';
    Array.prototype.forEach.call(panel.querySelectorAll('.opt'),function(b){
      b.addEventListener('click',function(){resolve(order[Number(b.getAttribute('data-i'))]===cor?'ok':'bad');});
    });
    $('pass').addEventListener('click',pass);
    var say=$('say');
    if(say)say.addEventListener('click',function(){
      try{var u=new SpeechSynthesisUtterance(t.short);u.lang='es-ES';u.rate=.9;window.speechSynthesis.cancel();window.speechSynthesis.speak(u);}catch(e){}
    });
    bindQuit();
  }
  function renderChallengeTea(){
    var it=ITEMS[S.idx],ch=S.ch,t=TEA[it.l];
    var html=
      '<div class="qhead"><span class="badge ch">'+it.l+'</span><div><p class="kicker">Prueba comodín</p><h2>'+it.name+'</h2></div></div>'+
      '<ol class="vsteps">'+t.steps.map(function(s){return '<li><span class="pic" aria-hidden="true">'+s[0]+'</span><span>'+s[1]+'</span></li>';}).join('')+'</ol>';
    if(t.tip)html+='<p class="note"><span class="pic" aria-hidden="true">💡</span> '+t.tip+'</p>';
    if(ch.phase==='ready'){
      html+=
        '<p class="note"><span class="pic" aria-hidden="true">⏱️</span> '+it.seconds+' segundos</p>'+
        '<div class="row"><button class="btn" type="button" id="go" data-autofocus>Empezar</button><button class="btn quiet" type="button" id="pass">Ahora no</button></div>';
    }else{
      html+=
        (ch.phase==='running'
          ?'<div class="count" id="chTime" role="timer">'+Math.ceil(ch.left)+'</div>'
          :'<div class="count done" id="chTime">¡Tiempo!</div>')+
        '<div class="bar" aria-hidden="true"><i id="chBar" style="width:'+(ch.left/it.seconds*100)+'%"></i></div>'+
        '<div class="row"><button class="btn" type="button" id="yes" data-autofocus>Sí, hecho</button><button class="btn quiet" type="button" id="no">Lo intento otro día</button></div>';
    }
    html+='<button class="link" id="quit" type="button">Terminar ahora</button>';
    panel.innerHTML=html;
    if(ch.phase==='ready'){
      $('go').addEventListener('click',function(){S.ch.phase='running';lastT=performance.now();renderChallenge();});
      $('pass').addEventListener('click',pass);
    }else{
      $('yes').addEventListener('click',function(){resolve('ok');});
      $('no').addEventListener('click',function(){resolve('bad');});
    }
    bindQuit();focusFirst();
  }
  function renderFeedbackTea(result){
    var it=ITEMS[S.idx],t=TEA[it.l],ok=result==='ok',isC=it.type==='c';
    var html='<div class="fb '+(ok?'good':'bad')+'" role="status">'+(ok?'<span class="pic" aria-hidden="true">⭐</span> ¡Muy bien!':'Para repasar')+'</div>';
    html+='<div class="bigpic pic" aria-hidden="true">'+t.pics+'</div>';
    if(!isC)html+='<p class="answer-line">Es <strong>'+t.opts[0][0]+'</strong></p>';
    html+='<div class="fact"><p class="kicker">¿Sabías que…?</p><p>'+t.fact+'</p></div>';
    var more=nextIndex(S.idx)>=0;
    html+='<div class="row"><button class="btn" type="button" id="next" data-autofocus>'+(more?'Siguiente':'Ver el final')+'</button></div>';
    html+='<button class="link" id="quit" type="button">Terminar ahora</button>';
    panel.innerHTML=html;
    $('next').addEventListener('click',function(){goNext(S.idx);});
    bindQuit();focusFirst();
  }

  function renderQuestion(){
    if(S.tea){renderQuestionTea();return;}
    var it=ITEMS[S.idx];
    var html=
      '<div class="qhead"><span class="badge">'+it.l+'</span><div><p class="kicker">Empieza por la letra '+it.l+'</p></div></div>'+
      '<p class="clue">'+it.clue+'</p>';
    if(S.mode==='type'){
      html+=
        '<form id="form" autocomplete="off" novalidate>'+
          '<label class="sr" for="answer">Tu respuesta</label>'+
          '<input id="answer" type="text" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Escribe la palabra" data-autofocus>'+
          '<p class="hint" id="hint" role="status"></p>'+
          '<div class="row"><button class="btn" type="submit">Responder</button><button class="btn skip" type="button" id="pass">Pasapalabra</button></div>'+
        '</form>';
    }else{
      html+=
        '<div id="voice">'+
          '<div class="row"><button class="btn" type="button" id="reveal" data-autofocus>Ver la respuesta</button><button class="btn skip" type="button" id="pass">Pasapalabra</button></div>'+
        '</div>';
    }
    html+='<button class="link" id="quit" type="button">Terminar ahora</button>';
    panel.innerHTML=html;
    $('pass').addEventListener('click',pass);
    if(S.mode==='type'){
      $('form').addEventListener('submit',function(e){
        e.preventDefault();
        var v=$('answer').value;
        if(!norm(v)){$('hint').textContent='Escribe una respuesta o pulsa Pasapalabra.';return;}
        resolve(isCorrect(v,it)?'ok':'bad');
      });
    }else{
      $('reveal').addEventListener('click',function(){
        S.revealed=true;
        $('voice').innerHTML=
          '<p class="answer-line">La respuesta es <strong>'+it.answers[0]+'</strong></p>'+
          '<div class="row" style="margin-top:.8rem"><button class="btn" type="button" id="yes" data-autofocus>Ha acertado</button><button class="btn bad" type="button" id="no">Ha fallado</button></div>';
        $('yes').addEventListener('click',function(){resolve('ok');});
        $('no').addEventListener('click',function(){resolve('bad');});
        focusFirst();
      });
    }
    bindQuit();focusFirst();
  }

  function renderChallenge(){
    if(S.tea){renderChallengeTea();return;}
    var it=ITEMS[S.idx],ch=S.ch;
    var html=
      '<div class="qhead"><span class="badge ch">'+it.l+'</span><div><p class="kicker">Prueba comodín</p><h2>'+it.name+'</h2></div></div>'+
      '<p class="clue">'+it.text+'</p>';
    if(ch.phase==='ready'){
      html+=
        '<p class="note">Tiempo de la prueba: '+it.seconds+' segundos. El reloj del rosco se detiene mientras tanto.</p>'+
        '<div class="row"><button class="btn" type="button" id="go" data-autofocus>¡Empezar la prueba!</button><button class="btn skip" type="button" id="pass">Pasapalabra</button></div>';
    }else{
      html+=
        (ch.phase==='running'
          ?'<div class="count" id="chTime" role="timer">'+Math.ceil(ch.left)+'</div>'
          :'<div class="count done" id="chTime">¡Tiempo!</div>')+
        '<p class="note">¿Lo habéis conseguido?</p>'+
        '<div class="row"><button class="btn" type="button" id="yes" data-autofocus>¡Superada!</button><button class="btn bad" type="button" id="no">No ha salido</button></div>';
    }
    html+='<button class="link" id="quit" type="button">Terminar ahora</button>';
    panel.innerHTML=html;
    if(ch.phase==='ready'){
      $('go').addEventListener('click',function(){S.ch.phase='running';lastT=performance.now();renderChallenge();});
      $('pass').addEventListener('click',pass);
    }else{
      $('yes').addEventListener('click',function(){resolve('ok');});
      $('no').addEventListener('click',function(){resolve('bad');});
    }
    bindQuit();focusFirst();
  }

  function renderFeedback(result){
    if(S.tea){renderFeedbackTea(result);return;}
    var it=ITEMS[S.idx],ok=result==='ok',isC=it.type==='c';
    var title=isC?(ok?'¡Prueba superada!':'No ha salido. ¡Otra vez será!'):(ok?'¡Correcto!':'No era esa');
    var html='<div class="fb '+(ok?'good':'bad')+'" role="status">'+title+'</div>';
    if(!isC)html+='<p class="answer-line">La respuesta es <strong>'+it.answers[0]+'</strong></p>';
    if(isC&&it.tip)html+='<p class="note">'+it.tip+'</p>';
    html+='<div class="fact"><p class="kicker">¿Sabías que…?</p><p>'+it.fact+'</p></div>';
    var more=nextIndex(S.idx)>=0;
    html+='<div class="row"><button class="btn" type="button" id="next" data-autofocus>'+(more?'Siguiente letra':'Ver resultados')+'</button></div>';
    html+='<button class="link" id="quit" type="button">Terminar ahora</button>';
    panel.innerHTML=html;
    $('next').addEventListener('click',function(){goNext(S.idx);});
    bindQuit();focusFirst();
  }

  function renderEnd(){
    var c=counts();
    var title;
    if(S.reason==='time')title='¡Se acabó el tiempo!';
    else if(S.reason==='quit')title='Rosco terminado';
    else title='¡Rosco completado!';
    if(S.tea)title='¡Has terminado el rosco!';
    var msg;
    if(c.ok===N)msg='Todas las letras en verde. Eres una persona experta del huerto.';
    else if(c.ok>=Math.ceil(N*0.75))msg='¡Gran cosecha! Casi no se te escapa nada.';
    else if(c.ok>=Math.ceil(N*0.5))msg='Buena cosecha. Con un poco más de riego, el próximo rosco será perfecto.';
    else if(c.ok>=Math.ceil(N*0.25))msg='Tu huerto va creciendo. Repasa las respuestas y vuelve a probar.';
    else msg='Toca seguir regando. Repasa las respuestas y juega otra vez.';
    if(S.tea)msg='Gracias por jugar. Las letras para repasar están marcadas en naranja.';
    var chips=ITEMS.map(function(it,i){
      var r=S.res[i],mark=r==='ok'?'Bien':(r==='bad'?'Mal':'Sin resolver');
      var word=it.type==='c'?it.name:it.answers[0];
      return '<li class="chip'+(it.type==='c'?' c':'')+'" data-s="'+r+'" aria-label="'+it.l+', '+word+', '+mark+'"><b>'+it.l+'</b><em>'+word+'</em></li>';
    }).join('');
    panel.innerHTML=
      '<h2>'+title+'</h2>'+
      '<p class="lead">'+msg+'</p>'+
      '<div class="stats">'+
        '<div class="stat"><b>'+c.ok+'</b><span>Bien</span></div>'+
        '<div class="stat"><b>'+c.bad+'</b><span>'+(S.tea?'Para repasar':'Mal')+'</span></div>'+
        '<div class="stat"><b>'+c.left+'</b><span>Sin resolver</span></div>'+
        '<div class="stat"><b>'+fmt(S.elapsed)+'</b><span>Tiempo de juego</span></div>'+
      '</div>'+
      '<div><p class="kicker" style="margin-bottom:.5rem">Repaso del rosco</p><ul class="review">'+chips+'</ul></div>'+
      '<div class="row"><button class="btn" type="button" id="again" data-autofocus>Jugar otra vez</button></div>';
    $('again').addEventListener('click',function(){
      S=fresh(S);renderIntro();paintRosco();paintHub();
    });
    focusFirst();
  }

  buildRosco();
  renderIntro();
  paintRosco();
  paintHub();
})();
