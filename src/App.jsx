import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const SpanishGuide = lazy(() => import('./guides/spanish.jsx'));
const ArabicGuide = lazy(() => import('./guides/arabic.jsx'));
const EnglishGuide = lazy(() => import('./guides/english.jsx'));
const GermanGuide = lazy(() => import('./guides/german.jsx'));
const HawaiianGuide = lazy(() => import('./guides/hawaiian.jsx'));

const Loading = () => (
  <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#FDFBF7",fontFamily:"system-ui,sans-serif"}}>
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:32,marginBottom:8}}>🌍</div>
      <div style={{fontSize:14,color:"#999"}}>Cargando guía...</div>
    </div>
  </div>
);

const languages = [
  { path: "/spanish", emoji: "🇪🇸", title: "Español", subtitle: "Spanish grammar from pronunciation to false cognates. Mexican/US Spanish when applicable.", count: "25 guides", color: "#C62828" },
  { path: "/arabic", emoji: "🇵🇸", title: "العربية", subtitle: "Arabic writing system, grammar, and verb forms. Palestinian dialect notes throughout.", count: "30 guides", color: "#1B5E20" },
  { path: "/english", emoji: "🇺🇸", title: "American English", subtitle: "Inglés americano para hispanohablantes. Sonidos, verbos, artículos, phrasal verbs. Notas de Chattanooga.", count: "35 guías", color: "#1565C0" },
  { path: "/german", emoji: "🇩🇪", title: "Deutsch", subtitle: "Cases, gender, word order, verb brackets, compound nouns, adjective endings, and modal particles.", count: "33 guides", color: "#1a1a1a" },
  { path: "/hawaiian", emoji: "🌺", title: "ʻŌlelo Hawaiʻi", subtitle: "Hawaiian sounds, sentence patterns, possessives, and cultural context. With language revival notes.", count: "30 guides", color: "#00695C" },
];

function Home() {
  return (
    <div style={{minHeight:"100vh",background:"#FDFBF7",fontFamily:"'Segoe UI','Helvetica Neue',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { -webkit-font-smoothing: antialiased; }
        .guide-card { text-decoration: none; color: inherit; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .guide-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
        .guide-card:active { transform: translateY(-1px); }
        .card-arrow { transition: transform 0.2s; }
        .guide-card:hover .card-arrow { transform: translateX(4px); color: #999; }
      `}</style>
      
      <div style={{textAlign:"center",padding:"60px 24px 40px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-50%",left:"-50%",width:"200%",height:"200%",background:"radial-gradient(ellipse at 30% 50%, rgba(27,94,32,0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(198,40,40,0.03) 0%, transparent 50%)",zIndex:0}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:14,fontWeight:700,letterSpacing:6,textTransform:"uppercase",color:"#999",marginBottom:20}}>Peliglot</div>
          <h1 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(36px, 7vw, 56px)",fontWeight:900,lineHeight:1.1,color:"#1a1a1a",marginBottom:16}}>
            Learn a language <em style={{fontStyle:"italic",color:"#2E7D32"}}>visually</em>
          </h1>
          <p style={{fontSize:18,color:"#888",fontWeight:300,maxWidth:480,margin:"0 auto 12px",lineHeight:1.5}}>
            Interactive grammar guides you can flip through. No accounts, no ads, no tracking.
          </p>
          <span style={{display:"inline-block",fontSize:11,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"#aaa",background:"#f0eeeb",padding:"4px 12px",borderRadius:4}}>Free & Open Source</span>
        </div>
      </div>

      <div style={{maxWidth:800,margin:"0 auto",padding:"20px 24px 60px",display:"flex",flexDirection:"column",gap:16}}>
        {languages.map(lang => (
          <Link to={lang.path} key={lang.path} className="guide-card" style={{display:"flex",alignItems:"stretch",background:"#fff",borderRadius:20,overflow:"hidden",border:"1px solid #e8e5e0"}}>
            <div style={{width:6,flexShrink:0,background:lang.color}}/>
            <div style={{flex:1,padding:"24px 28px",display:"flex",alignItems:"center",gap:20}}>
              <div style={{fontSize:40,lineHeight:1,flexShrink:0}}>{lang.emoji}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,fontWeight:700,marginBottom:4}}>{lang.title}</div>
                <div style={{fontSize:14,color:"#888",lineHeight:1.4}}>{lang.subtitle}</div>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:"#aaa",background:"#f5f3ef",padding:"4px 10px",borderRadius:6,flexShrink:0,whiteSpace:"nowrap"}}>{lang.count}</div>
              <div className="card-arrow" style={{fontSize:20,color:"#ccc",flexShrink:0}}>→</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{textAlign:"center",padding:"20px 24px 40px",fontSize:12,color:"#bbb",lineHeight:1.6}}>
        <p>Built with care. All content is free to use.</p>
        <p style={{marginTop:8}}><a href="https://github.com/YOUR_USERNAME/peliglot" style={{color:"#999",textDecoration:"none"}}>View on GitHub</a></p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spanish" element={<SpanishGuide />} />
          <Route path="/arabic" element={<ArabicGuide />} />
          <Route path="/english" element={<EnglishGuide />} />
          <Route path="/german" element={<GermanGuide />} />
          <Route path="/hawaiian" element={<HawaiianGuide />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
