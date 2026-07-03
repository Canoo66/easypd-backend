<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>EasyPD — Dateien umwandeln</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js"></script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
:root{--bg:#0e0e11;--surface:#18181c;--surface2:#1f1f25;--border:#2a2a33;--border2:#3a3a46;--accent:#7c5cfc;--accent2:#5b3fd4;--accent-soft:rgba(124,92,252,0.12);--accent-softer:rgba(124,92,252,0.06);--text:#f0f0f4;--text2:#9090a8;--text3:#5a5a70;--green:#22c55e;--green-soft:rgba(34,197,94,0.12);--red:#ef4444;--red-soft:rgba(239,68,68,0.12);--radius:12px;--radius-sm:8px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;line-height:1.5}
.container{max-width:780px;margin:0 auto;padding:0 1.25rem 4rem}
nav{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:0.5px solid var(--border);max-width:780px;margin:0 auto}
.logo{display:flex;align-items:center;gap:8px;font-weight:600;font-size:.95rem;color:var(--text);text-decoration:none}
.logo-icon{width:28px;height:28px;background:var(--accent);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:14px}
.nav-right{display:flex;align-items:center;gap:10px}
.credit-pill{display:flex;align-items:center;gap:6px;background:var(--accent-soft);border:0.5px solid var(--accent);border-radius:999px;padding:4px 12px;font-size:.8rem;color:#a78bfa;font-weight:500;cursor:default}
.credit-pill.zero{background:var(--red-soft);border-color:var(--red);color:#fca5a5}
.btn-buy{background:var(--accent);color:#fff;border:none;border-radius:var(--radius-sm);padding:6px 14px;font-size:.8rem;font-weight:500;cursor:pointer;transition:background .15s}
.btn-buy:hover{background:var(--accent2)}
.hero{text-align:center;padding:2.5rem 1rem 2rem}
.hero-badge{display:inline-flex;align-items:center;gap:6px;background:var(--green-soft);border:0.5px solid rgba(34,197,94,0.3);color:var(--green);border-radius:999px;padding:4px 12px;font-size:.75rem;font-weight:500;margin-bottom:1.25rem}
.hero h1{font-size:2.2rem;font-weight:600;letter-spacing:-.03em;margin-bottom:.6rem}
.hero p{color:var(--text2);font-size:.95rem;max-width:440px;margin:0 auto}



.section-label{font-size:.68rem;letter-spacing:.1em;color:var(--text3);text-transform:uppercase;font-weight:500;margin-bottom:.85rem}
.tools-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:2rem}
.tool-card{background:var(--surface);border:1px solid var(--accent);border-radius:var(--radius);padding:1rem;cursor:pointer;transition:border-color .15s,background .15s;position:relative;user-select:none}
.tool-card:hover{background:var(--surface2);border-width:1.5px}
.tool-card.active{border:2px solid var(--accent);background:var(--accent-softer)}
.tool-card.active::after{content:'✓';position:absolute;top:8px;right:10px;font-size:.7rem;color:var(--accent);font-weight:600}
.tool-emoji{font-size:20px;margin-bottom:.5rem}
.tool-name{font-size:.83rem;font-weight:500;margin-bottom:.15rem}
.tool-desc{font-size:.72rem;color:var(--text2)}
.tool-cost{display:inline-block;margin-top:.5rem;background:var(--accent-soft);color:#a78bfa;border-radius:999px;padding:2px 8px;font-size:.65rem;font-weight:500}
.section-wrap{margin-bottom:1rem}
.drop-area{border:1.5px dashed var(--border2);border-radius:var(--radius);padding:2.2rem 1rem;text-align:center;cursor:pointer;transition:border-color .15s,background .15s;background:var(--surface)}
.drop-area:hover,.drop-area.over{border-color:var(--accent);background:var(--accent-softer)}
.drop-icon{font-size:28px;margin-bottom:.5rem;opacity:.5}
.drop-text{font-size:.875rem;color:var(--text2)}
.drop-sub{font-size:.73rem;color:var(--text3);margin-top:.2rem}
.file-list{display:flex;flex-direction:column;gap:7px;margin-top:.6rem}
.file-item{display:flex;align-items:center;gap:9px;background:var(--surface);border:0.5px solid var(--border);border-radius:var(--radius-sm);padding:.55rem .85rem;font-size:.8rem}
.file-icon{opacity:.6}
.file-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.file-size{font-size:.7rem;color:var(--text3)}
.file-rm{cursor:pointer;color:var(--text3);background:none;border:none;font-size:15px;line-height:1;padding:0}
.file-rm:hover{color:var(--red)}
.extra-opts{background:var(--surface);border:0.5px solid var(--border);border-radius:var(--radius);padding:1rem;margin-bottom:1rem;display:none}
.extra-opts.show{display:block}
.extra-opts label{font-size:.8rem;color:var(--text2);display:block;margin-bottom:.3rem}
.extra-opts input[type=text],.extra-opts input[type=password],.extra-opts select,.extra-opts textarea{width:100%;background:var(--bg);border:0.5px solid var(--border2);border-radius:var(--radius-sm);padding:.5rem .75rem;color:var(--text);font-size:.83rem;font-family:inherit;outline:none;transition:border-color .15s;margin-bottom:.6rem}
.extra-opts input:focus,.extra-opts select:focus,.extra-opts textarea:focus{border-color:var(--accent)}
.extra-opts textarea{resize:vertical;line-height:1.6;min-height:80px}
.form-row{display:grid;gap:8px;margin-bottom:.5rem}
.form-row.col2{grid-template-columns:1fr 1fr}
.form-row.col1{grid-template-columns:1fr}
.form-cell label{font-size:.78rem;color:var(--text2);display:block;margin-bottom:.25rem}
.form-cell input,.form-cell textarea{width:100%;background:var(--bg);border:0.5px solid var(--border2);border-radius:var(--radius-sm);padding:.45rem .7rem;color:var(--text);font-size:.82rem;font-family:inherit;outline:none;transition:border-color .15s}
.form-cell input:focus,.form-cell textarea:focus{border-color:var(--accent)}
.form-cell textarea{resize:vertical;line-height:1.6;min-height:75px}
.tpl-header{font-size:.8rem;color:#a78bfa;font-weight:500;margin-bottom:.85rem;padding-bottom:.5rem;border-bottom:0.5px solid var(--border)}
.no-credits-banner{display:none;align-items:center;gap:10px;background:var(--red-soft);border:0.5px solid rgba(239,68,68,.3);border-radius:var(--radius-sm);padding:.85rem 1rem;font-size:.83rem;color:#fca5a5;margin-bottom:.75rem}
.no-credits-banner.show{display:flex}
.no-credits-banner button{margin-left:auto;background:var(--red);color:#fff;border:none;border-radius:var(--radius-sm);padding:.35rem .85rem;font-size:.77rem;cursor:pointer;white-space:nowrap}
.file-error-banner{display:none;align-items:center;gap:10px;background:var(--red-soft);border:0.5px solid rgba(239,68,68,.3);border-radius:var(--radius-sm);padding:.85rem 1rem;font-size:.83rem;color:#fca5a5;margin-bottom:.75rem}
.file-error-banner.show{display:flex}
.convert-btn{width:100%;padding:.8rem;border:none;border-radius:var(--radius);font-size:.9rem;font-weight:500;cursor:pointer;transition:background .15s;font-family:inherit;margin-top:.5rem}
.convert-btn.ready{background:var(--accent);color:#fff}
.convert-btn.ready:hover{background:var(--accent2)}
.convert-btn.disabled{background:var(--surface);color:var(--text3);cursor:not-allowed;border:0.5px solid var(--border)}
.convert-btn.loading{background:var(--surface2);color:var(--text2);cursor:not-allowed}
.progress-wrap{display:none;margin-top:.75rem}
.progress-wrap.show{display:block}
.progress-bar-bg{background:var(--surface2);border-radius:999px;height:4px;overflow:hidden}
.progress-bar{height:100%;background:var(--accent);border-radius:999px;width:0%;transition:width .3s}
.progress-label{font-size:.73rem;color:var(--text2);margin-top:.4rem;text-align:center}
.result-box{display:none;align-items:center;gap:12px;background:var(--green-soft);border:0.5px solid rgba(34,197,94,.3);border-radius:var(--radius-sm);padding:1rem;margin-top:.85rem}
.result-box.show{display:flex}
.result-dl{margin-left:auto;background:var(--green);color:#fff;border:none;border-radius:var(--radius-sm);padding:.45rem .9rem;font-size:.8rem;font-weight:500;cursor:pointer;white-space:nowrap}
.result-dl:hover{background:#16a34a}
.modal-bg{display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:100;align-items:center;justify-content:center;padding:1rem}
.modal-bg.open{display:flex}
.modal{background:var(--surface);border:0.5px solid var(--border2);border-radius:var(--radius);padding:1.5rem;width:100%;max-width:360px}
.modal-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem}
.modal-title{font-size:1rem;font-weight:600}
.modal-close{background:none;border:none;color:var(--text2);font-size:20px;cursor:pointer;line-height:1}
.modal-close:hover{color:var(--text)}
.pkg-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:1.25rem}
.pkg{border:0.5px solid var(--border);border-radius:var(--radius-sm);padding:.9rem;text-align:center;cursor:pointer;transition:border-color .15s;position:relative;background:var(--surface2)}
.pkg:hover{border-color:var(--accent)}
.pkg.sel{border:2px solid var(--accent);background:var(--accent-softer)}
.pkg-badge{position:absolute;top:-9px;left:50%;transform:translateX(-50%);background:var(--accent);color:#fff;font-size:.6rem;padding:2px 8px;border-radius:999px;white-space:nowrap;font-weight:500}
.pkg-credits{font-size:1.35rem;font-weight:600;color:#a78bfa}
.pkg-price{font-size:.73rem;color:var(--text2);margin-top:.15rem}
.pkg-unit{font-size:.63rem;color:var(--text3)}
.pay-label{font-size:.73rem;color:var(--text2);margin-bottom:.5rem}



.pay-confirm{width:100%;padding:.7rem;background:var(--accent);color:#fff;border:none;border-radius:var(--radius-sm);font-size:.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background .15s}
.pay-confirm:hover{background:var(--accent2)}
.modal-note{text-align:center;font-size:.72rem;color:var(--text3);margin-top:.75rem}
.imp-modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:200;align-items:center;justify-content:center;padding:1rem}
.imp-modal.open{display:flex}
.imp-box{background:var(--surface);border:0.5px solid var(--border2);border-radius:var(--radius);padding:1.5rem;max-width:400px;width:100%;max-height:80vh;overflow-y:auto}
.imp-box h3{font-size:1rem;font-weight:600;margin-bottom:1rem}
.imp-box p{font-size:.82rem;color:var(--text2);margin-bottom:.5rem;line-height:1.6}
.imp-close{display:block;margin-top:1rem;text-align:center;color:var(--accent);cursor:pointer;font-size:.83rem;border:none;background:none;font-family:inherit}
.toast{position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);background:var(--surface2);border:0.5px solid var(--border2);color:var(--text);padding:.55rem 1.3rem;border-radius:999px;font-size:.8rem;opacity:0;transition:opacity .25s;pointer-events:none;z-index:300;white-space:nowrap}
.toast.show{opacity:1}
footer{text-align:center;padding:2rem 1rem 1rem;font-size:.73rem;color:var(--text3);border-top:0.5px solid var(--border);max-width:780px;margin:0 auto}
footer a{color:var(--text3);text-decoration:none}
footer a:hover{color:var(--text2)}
@media(max-width:480px){.hero h1{font-size:1.75rem}.tools-grid{grid-template-columns:repeat(2,1fr)}nav{padding:.85rem 1rem}.form-row.col2{grid-template-columns:1fr}}
</style>
</head>
<body>

<nav>
  <a class="logo" href="#">
    <svg width="110" height="28" viewBox="0 0 110 28" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="22" height="28" rx="5" fill="#7c5cfc"/>
      <rect x="4" y="5" width="8" height="2" rx="1" fill="#fff" opacity="0.9"/>
      <rect x="4" y="9" width="12" height="2" rx="1" fill="#fff" opacity="0.7"/>
      <rect x="4" y="13" width="10" height="2" rx="1" fill="#fff" opacity="0.7"/>
      <rect x="4" y="17" width="12" height="2" rx="1" fill="#fff" opacity="0.5"/>
      <rect x="4" y="21" width="7" height="2" rx="1" fill="#fff" opacity="0.5"/>
      <path d="M14 0 L22 0 L22 8 L14 8 Z" fill="#5b3fd4" opacity="0.6"/>
      <text x="27" y="20" font-family="Inter,Arial,sans-serif" font-size="16" font-weight="700" fill="#f0f0f4" letter-spacing="-0.5">Easy<tspan fill="#7c5cfc">PD</tspan></text>
    </svg>
  </a>
  <div class="nav-right">
    <div class="credit-pill" id="credit-pill">🪙 <span id="credit-count">1</span> Credit</div>
    <button class="btn-buy" onclick="openModal()">+ Credits kaufen</button>
  </div>
</nav>

<div class="container">

  <div class="hero">
    <div class="hero-badge">✨ EasyPD.online — PDFs einfach umwandeln</div>
    <h1>Easy<span style="color:#7c5cfc">PD</span> — PDFs umwandeln</h1>
    <p>Merge, split, rotieren, schützen — direkt im Browser. Keine Installation.</p>
  </div>
<div class="section-label">Tool auswählen</div>
  <div class="tools-grid">
    <div class="tool-card active" onclick="selectTool(this,'img-pdf',1)">
      <div class="tool-emoji">🖼️</div>
      <div class="tool-name">Bilder → PDF</div>
      <div class="tool-desc">JPG &amp; PNG zu PDF</div>
      <span class="tool-cost">1 Credit</span>
    </div>
    <div class="tool-card" onclick="selectTool(this,'merge',1)">
      <div class="tool-emoji">📎</div>
      <div class="tool-name">PDF Merge</div>
      <div class="tool-desc">Mehrere PDFs zusammenführen</div>
      <span class="tool-cost">1 Credit</span>
    </div>
    <div class="tool-card" onclick="selectTool(this,'split',1)">
      <div class="tool-emoji">✂️</div>
      <div class="tool-name">PDF Split</div>
      <div class="tool-desc">Jede Seite einzeln</div>
      <span class="tool-cost">1 Credit</span>
    </div>
    <div class="tool-card" onclick="selectTool(this,'rotate',1)">
      <div class="tool-emoji">🔄</div>
      <div class="tool-name">PDF Rotieren</div>
      <div class="tool-desc">Seiten drehen</div>
      <span class="tool-cost">1 Credit</span>
    </div>

    <div class="tool-card" onclick="selectTool(this,'protect',2)">
      <div class="tool-emoji">🔒</div>
      <div class="tool-name">PDF Schützen</div>
      <div class="tool-desc">Passwort hinzufügen</div>
      <span class="tool-cost">2 Credits</span>
    </div>
    <div class="tool-card" onclick="selectTool(this,'delete-page',1)">
      <div class="tool-emoji">🗑️</div>
      <div class="tool-name">Seite löschen</div>
      <div class="tool-desc">Seiten entfernen</div>
      <span class="tool-cost">1 Credit</span>
    </div>
    <div class="tool-card" onclick="selectTool(this,'reorder',1)">
      <div class="tool-emoji">🔀</div>
      <div class="tool-name">Seiten sortieren</div>
      <div class="tool-desc">Reihenfolge ändern</div>
      <span class="tool-cost">1 Credit</span>
    </div>
    <div class="tool-card" onclick="selectTool(this,'create-pdf',1)">
      <div class="tool-emoji">✏️</div>
      <div class="tool-name">PDF Erstellen</div>
      <div class="tool-desc">Text eingeben &amp; speichern</div>
      <span class="tool-cost">1 Credit</span>
    </div>
    <div class="tool-card" onclick="showComingSoon()">
      <div class="tool-emoji">✉️</div>
      <div class="tool-name">Bewerbung</div>
      <div class="tool-desc">Vorlage für Schüler</div>
      <span class="tool-cost">5 Credits</span>
    </div>
    <div class="tool-card" onclick="showComingSoon()">
      <div class="tool-emoji">📋</div>
      <div class="tool-name">Lebenslauf</div>
      <div class="tool-desc">Vorlage ausfüllen</div>
      <span class="tool-cost">5 Credits</span>
    </div>
  </div>

  <!-- UPLOAD -->
  <div id="upload-section">
    <div class="section-label">Datei hochladen</div>
    <div class="drop-area" id="drop-area"
      onclick="document.getElementById('file-input').click()"
      ondragover="dragEv(event,'over')"
      ondragleave="dragEv(event,'leave')"
      ondrop="dragEv(event,'drop')">
      <div class="drop-icon">☁️</div>
      <div class="drop-text">Hierher ziehen oder klicken</div>
      <div class="drop-sub" id="drop-hint">Unterstützt: JPG, PNG</div>
    </div>
    <input type="file" id="file-input" multiple accept="image/*" style="display:none" onchange="addFiles(this.files)">
    <div class="file-list" id="file-list"></div>
  </div>

  <!-- EXTRA OPTIONS -->
  <div class="extra-opts" id="extra-opts">
    <div id="extra-inner"></div>
  </div>

  <!-- ERRORS -->
  <div class="file-error-banner" id="file-error-banner">
    <span id="file-error-text">Fehler</span>
    <button onclick="document.getElementById('file-error-banner').classList.remove('show')" style="margin-left:auto;background:none;border:none;color:#fca5a5;cursor:pointer;font-size:16px">✕</button>
  </div>

  <div class="no-credits-banner" id="no-credits-banner">
    <span>⚠️ Keine Credits mehr.</span>
    <button onclick="openModal()">Credits kaufen</button>
  </div>

  <!-- PROGRESS -->
  <div class="progress-wrap" id="progress-wrap">
    <div class="progress-bar-bg"><div class="progress-bar" id="progress-bar"></div></div>
    <div class="progress-label" id="progress-label">Wird verarbeitet…</div>
  </div>

  <button class="convert-btn disabled" id="convert-btn" onclick="convert()">Datei auswählen um fortzufahren</button>

  <div class="result-box" id="result-box">
    <span>✅</span>
    <span id="result-text" style="flex:1;font-size:.85rem;color:#86efac">Fertig!</span>
    <button class="result-dl" id="result-dl">⬇ Download</button>
  </div>

</div>


<!-- COMING SOON MODAL -->
<div class="modal-bg" id="cs-modal" onclick="if(event.target===this)document.getElementById('cs-modal').classList.remove('open')">
  <div class="modal" style="text-align:center;padding:2rem 1.5rem">
    <div style="font-size:2.5rem;margin-bottom:.75rem">🚀</div>
    <div style="font-size:1.1rem;font-weight:600;margin-bottom:.5rem">Coming Soon</div>
    <div style="font-size:.85rem;color:var(--text2);margin-bottom:1.25rem">Diese Funktion erscheint <strong style="color:#a78bfa">2027</strong>.<br>Bleib dran — wird epic!</div>
    <div style="background:var(--accent-softer);border:0.5px solid var(--accent);border-radius:var(--radius-sm);padding:.6rem 1rem;font-size:.75rem;color:#a78bfa;margin-bottom:1.25rem">
      📅 Release: 2027 · PDFTools Pro
    </div>
    <button onclick="document.getElementById('cs-modal').classList.remove('open')" style="background:var(--accent);color:#fff;border:none;border-radius:var(--radius-sm);padding:.6rem 1.5rem;font-size:.875rem;font-weight:500;cursor:pointer">OK</button>
  </div>
</div>

<!-- CREDITS MODAL -->
<div class="modal-bg" id="modal-bg" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <div class="modal-top">
      <div class="modal-title">🪙 Credits kaufen</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="background:#1a1a0e;border:0.5px solid #f59e0b;border-radius:var(--radius-sm);padding:.75rem .9rem;margin-bottom:1.1rem;display:flex;gap:10px;align-items:flex-start">
      <span style="font-size:16px;flex-shrink:0">⚠️</span>
      <div style="font-size:.75rem;color:#fbbf24;line-height:1.5">
        <strong style="display:block;margin-bottom:.2rem">Wichtiger Hinweis</strong>
        Deine Credits sind an diesen Browser gebunden. Wenn du den Browser-Cache löschst, die Website im Inkognito-Modus öffnest oder einen anderen Browser verwendest, können deine Credits verloren gehen und müssen neu gekauft werden.
      </div>
    </div>
    <div class="pkg-grid">
      <div class="pkg" id="pkg-0" onclick="openStripe('https://buy.stripe.com/fZubJ3dAJ9dVfoHdKsaZi00',5)">
        <div class="pkg-credits">5</div>
        <div class="pkg-price">0,99 €</div>
        <div class="pkg-unit">0,20 € pro Umw.</div>
      </div>
      <div class="pkg sel" id="pkg-1" onclick="openStripe('https://buy.stripe.com/00w00lfIR3TB4K321KaZi01',25)">
        <span class="pkg-badge">Beliebt</span>
        <div class="pkg-credits">25</div>
        <div class="pkg-price">3,99 €</div>
        <div class="pkg-unit">0,16 € pro Umw.</div>
      </div>
      <div class="pkg" id="pkg-2" onclick="openStripe('https://buy.stripe.com/eVqcN7bsBfCja4n6i0aZi02',60)">
        <div class="pkg-credits">60</div>
        <div class="pkg-price">7,99 €</div>
        <div class="pkg-unit">0,13 € pro Umw.</div>
      </div>
      <div class="pkg" id="pkg-3" onclick="openStripe('https://buy.stripe.com/fZu7sN8gp9dV4K36i0aZi03',150)">
        <div class="pkg-credits">150</div>
        <div class="pkg-price">14,99 €</div>
        <div class="pkg-unit">0,10 € pro Umw.</div>
      </div>
    </div>
    <div class="pay-label">Zahlungsmethode</div>
    <div style="background:#0a0a1a;border:1px solid #635BFF;border-radius:var(--radius-sm);padding:.75rem 1rem;margin-bottom:1rem">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:.5rem">
        <svg width="44" height="20" viewBox="0 0 44 20" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="17" font-family="Arial,sans-serif" font-size="19" font-weight="900" fill="#635BFF" letter-spacing="-0.5">stripe</text>
        </svg>
        <span style="font-size:.7rem;color:#635BFF;font-weight:500;background:rgba(99,91,255,0.15);padding:2px 8px;border-radius:999px">Offiziell</span>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <span style="font-size:.7rem;color:var(--text2);background:var(--surface);padding:3px 8px;border-radius:4px;border:0.5px solid var(--border)">💳 Kreditkarte</span>
        <span style="font-size:.7rem;color:var(--text2);background:var(--surface);padding:3px 8px;border-radius:4px;border:0.5px solid var(--border)"> Apple Pay</span>
        <span style="font-size:.7rem;color:var(--text2);background:var(--surface);padding:3px 8px;border-radius:4px;border:0.5px solid var(--border)">🅶 Google Pay</span>
        <span style="font-size:.7rem;color:var(--text2);background:var(--surface);padding:3px 8px;border-radius:4px;border:0.5px solid var(--border)">🏦 SEPA</span>
      </div>
    </div>
    <div style="font-size:.75rem;color:var(--text2);text-align:center;padding:.5rem">👆 Paket auswählen um zu kaufen — Credits kommen automatisch nach Zahlung!</div>
    <div id="paypal-button-container" style="margin-top:.75rem;display:none"></div>
    <div class="modal-note" style="display:flex;align-items:center;justify-content:center;gap:6px"><svg width="12" height="12" viewBox="0 0 24 24" fill="#635BFF"><path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z"/></svg><span>256-bit SSL Verschlüsselung · powered by Stripe</span></div>
  </div>
</div>

<!-- IMPRESSUM -->
<div class="imp-modal" id="imp-modal" onclick="if(event.target===this)this.classList.remove('open')">
  <div class="imp-box">
    <h3>Impressum</h3>
    <p><strong>Angaben gemäß § 5 DDG</strong></p>
    <p>CanooStudio<br>Wuppertal, Deutschland<br>E-Mail: canooservice@gmail.com</p>
    <p>Inhaltlich verantwortlich: Can Delibasi</p>
    <p style="color:#5a5a70;font-size:.77rem">Alle PDF-Verarbeitungen finden lokal im Browser statt. Keine Dateien werden übertragen.</p>
    <button class="imp-close" onclick="document.getElementById('imp-modal').classList.remove('open')">Schließen</button>
  </div>
</div>

<footer>
  <p style="margin-bottom:.5rem">EasyPD.online by <a href="https://discord.gg/tgpknkG8ym" target="_blank">CanooStudio</a></p>
  <p><a href="#" onclick="document.getElementById('imp-modal').classList.add('open');return false">Impressum</a> · <a href="https://discord.gg/tgpknkG8ym" target="_blank">Discord</a></p>
</footer>

<div class="toast" id="toast"></div>

<script>
// STATE
var credits = parseInt(localStorage.getItem('easypd_credits') || '0');
var curTool = 'img-pdf';
var curCost = 1;
var files = [];
var resultBlob = null;
var pkgSel = {i:1, c:25, p:'3,99 €'};
var payMethod = 'pp';

var noUploadTools = ['create-pdf','bewerbung','lebenslauf'];
var toolAccepts = {
  'img-pdf':'image/*','merge':'.pdf','split':'.pdf','rotate':'.pdf',
  'watermark':'.pdf','protect':'.pdf','delete-page':'.pdf','reorder':'.pdf',
  'create-pdf':'*','bewerbung':'*','lebenslauf':'*'
};
var toolHints = {
  'img-pdf':'JPG, PNG (mehrere möglich)','merge':'PDF-Dateien (mehrere möglich)',
  'split':'Eine PDF-Datei','rotate':'Eine PDF-Datei','watermark':'Eine PDF-Datei',
  'protect':'Eine PDF-Datei','delete-page':'Eine PDF-Datei','reorder':'Eine PDF-Datei',
  'create-pdf':'Kein Upload nötig','bewerbung':'Felder ausfüllen',
  'lebenslauf':'Felder ausfüllen'
};

updateCreditDisplay();
updateBtn();

function saveCredits() { localStorage.setItem('easypd_credits', String(credits)); }

// ===== ZAHLUNG VERIFIZIEREN (nach Stripe-Redirect) =====
checkPaymentReturn();

async function checkPaymentReturn() {
  var params = new URLSearchParams(window.location.search);

  if (params.get('cancelled') === 'true') {
    cleanUrl();
    showToast('Zahlung abgebrochen.');
    return;
  }

  var sessionId = params.get('session_id');
  if (!sessionId) return;

  cleanUrl();

  // Schon eingeloest? (verhindert doppelte Gutschrift bei Reload)
  var used = JSON.parse(localStorage.getItem('easypd_used_sessions') || '[]');
  if (used.indexOf(sessionId) !== -1) return;

  showToast('Zahlung wird geprüft...');
  try {
    var res = await fetch('https://easypd-backend.vercel.app/verify-payment?session_id=' + encodeURIComponent(sessionId));
    var data = await res.json();

    if (data.paid && data.credits > 0) {
      used.push(sessionId);
      localStorage.setItem('easypd_used_sessions', JSON.stringify(used.slice(-50)));
      credits += data.credits;
      saveCredits();
      updateCreditDisplay();
      updateBtn();
      showToast('✅ ' + data.credits + ' Credits gutgeschrieben!');
    } else {
      showToast('Zahlung konnte nicht bestätigt werden.');
    }
  } catch (err) {
    console.error(err);
    showToast('Fehler bei der Prüfung — Seite neu laden.');
  }
}

function cleanUrl() {
  try { history.replaceState(null, '', window.location.pathname); } catch(e) {}
}

var leavingForPayment = false;
window.addEventListener('beforeunload', function(e) {
  if (credits > 0 && !leavingForPayment) {
    e.preventDefault();
    e.returnValue = 'Achtung: Du hast noch ' + credits + ' Credit(s)! Wenn du die Seite neu lädst oder schließt, bleiben deine Credits erhalten — aber stelle sicher dass du denselben Browser verwendest.';
    return e.returnValue;
  }
});

function updateCreditDisplay() {
  document.getElementById('credit-count').textContent = credits;
  document.getElementById('credit-pill').className = 'credit-pill' + (credits === 0 ? ' zero' : '');
}

// TOOL SELECT
function selectTool(el, id, cost) {
  document.querySelectorAll('.tool-card').forEach(function(c) { c.classList.remove('active'); });
  el.classList.add('active');
  curTool = id; curCost = cost; files = []; resultBlob = null;
  document.getElementById('file-list').innerHTML = '';
  document.getElementById('result-box').classList.remove('show');
  document.getElementById('progress-wrap').classList.remove('show');
  document.getElementById('file-error-banner').classList.remove('show');
  document.getElementById('drop-hint').textContent = toolHints[id] || '';

  var uploadSection = document.getElementById('upload-section');
  if (noUploadTools.indexOf(id) !== -1) {
    uploadSection.style.display = 'none';
  } else {
    uploadSection.style.display = 'block';
    document.getElementById('file-input').accept = toolAccepts[id] || '*';
    document.getElementById('file-input').multiple = (id === 'img-pdf' || id === 'merge');
  }

  buildExtraOpts(id);
  updateBtn();
}

// EXTRA OPTIONS
function buildExtraOpts(id) {
  var el = document.getElementById('extra-opts');
  var inner = document.getElementById('extra-inner');
  inner.innerHTML = '';
  el.classList.remove('show');

  if (id === 'rotate') {
    inner.innerHTML = '<label>Drehwinkel</label><select id="rot-deg"><option value="90">90° im Uhrzeigersinn</option><option value="180">180°</option><option value="270">270° gegen Uhrzeigersinn</option></select>';
    el.classList.add('show');
  } else if (id === 'watermark') {
    inner.innerHTML = '<label>Wasserzeichen-Text</label><input type="text" id="wm-text" placeholder="VERTRAULICH" value="VERTRAULICH">';
    el.classList.add('show');
  } else if (id === 'protect') {
    inner.innerHTML = '<label>Passwort</label><input type="password" id="pw-text" placeholder="Passwort eingeben">';
    el.classList.add('show');
  } else if (id === 'delete-page') {
    inner.innerHTML = '<label>Seiten löschen (z.B. 1,3,5)</label><input type="text" id="del-pages" placeholder="1,3"><p style="font-size:.72rem;color:var(--text3);margin-top:.25rem">Seitenzahlen beginnen bei 1</p>';
    el.classList.add('show');
  } else if (id === 'reorder') {
    inner.innerHTML = '<label>Neue Reihenfolge (z.B. 2,1,3)</label><input type="text" id="reorder-pages" placeholder="2,1,3"><p style="font-size:.72rem;color:var(--text3);margin-top:.25rem">Alle Seiten angeben</p>';
    el.classList.add('show');
  } else if (id === 'create-pdf') {
    buildCreatePdfForm(inner);
    el.classList.add('show');
  } else if (id === 'bewerbung') {
    buildBewerbungForm(inner);
    el.classList.add('show');
  } else if (id === 'lebenslauf') {
    buildLebenslaufForm(inner);
    el.classList.add('show');
  }
}

function makeFormRow(fields) {
  var row = document.createElement('div');
  row.className = 'form-row ' + (fields.length > 1 ? 'col2' : 'col1');
  fields.forEach(function(f) {
    var cell = document.createElement('div');
    cell.className = 'form-cell';
    var lbl = document.createElement('label');
    lbl.textContent = f.label;
    cell.appendChild(lbl);
    var inp;
    if (f.textarea) {
      inp = document.createElement('textarea');
      if (f.rows) inp.rows = f.rows;
    } else {
      inp = document.createElement('input');
      inp.type = f.type || 'text';
    }
    inp.id = f.id;
    inp.placeholder = f.placeholder || '';
    cell.appendChild(inp);
    row.appendChild(cell);
  });
  return row;
}

function buildCreatePdfForm(inner) {
  var hdr = document.createElement('div');
  hdr.className = 'tpl-header';
  hdr.textContent = 'Text eingeben und als PDF speichern';
  inner.appendChild(hdr);
  inner.appendChild(makeFormRow([{label:'Titel (optional)',id:'cp-title',placeholder:'z.B. Bewerbung, Notizen...'}]));
  inner.appendChild(makeFormRow([{label:'Inhalt',id:'cp-content',placeholder:'Hier deinen Text eingeben...',textarea:true,rows:8}]));
  var optRow = document.createElement('div');
  optRow.className = 'form-row col2';
  var c1 = document.createElement('div'); c1.className = 'form-cell';
  c1.innerHTML = '<label>Schriftgroesse</label><select id="cp-size"><option value="10">Klein (10pt)</option><option value="12" selected>Normal (12pt)</option><option value="14">Gross (14pt)</option><option value="16">Sehr gross (16pt)</option></select>';
  var c2 = document.createElement('div'); c2.className = 'form-cell';
  c2.innerHTML = '<label>Ausrichtung</label><select id="cp-align"><option value="left">Links</option><option value="center">Zentriert</option></select>';
  optRow.appendChild(c1); optRow.appendChild(c2);
  inner.appendChild(optRow);
}

function buildBewerbungForm(inner) {
  var hdr = document.createElement('div');
  hdr.className = 'tpl-header';
  hdr.textContent = 'Bewerbungsschreiben - Felder ausfüllen';
  inner.appendChild(hdr);
  inner.appendChild(makeFormRow([{label:'Vorname',id:'bw-vorname',placeholder:'Max'},{label:'Nachname',id:'bw-nachname',placeholder:'Mustermann'}]));
  inner.appendChild(makeFormRow([{label:'Strasse + Hausnummer',id:'bw-strasse',placeholder:'Musterstrasse 1'},{label:'PLZ + Stadt',id:'bw-stadt',placeholder:'42103 Wuppertal'}]));
  inner.appendChild(makeFormRow([{label:'E-Mail',id:'bw-email',placeholder:'max@mail.de'},{label:'Telefon',id:'bw-tel',placeholder:'0152 12345678'}]));
  inner.appendChild(makeFormRow([{label:'Stelle / Ausbildung',id:'bw-stelle',placeholder:'Kaufmann im Einzelhandel'},{label:'Unternehmen',id:'bw-firma',placeholder:'Firma GmbH'}]));
  inner.appendChild(makeFormRow([{label:'Deine Schule',id:'bw-schule',placeholder:'Gesamtschule Muster'},{label:'Schuljahr / Klasse',id:'bw-klasse',placeholder:'10. Klasse'}]));
  inner.appendChild(makeFormRow([{label:'Alter',id:'bw-alter',placeholder:'16'},{label:'Datum',id:'bw-datum',placeholder:'21.06.2026'}]));
  inner.appendChild(makeFormRow([{label:'Persoenlicher Text (optional)',id:'bw-extra',placeholder:'Warum moechtest du dich bewerben?',textarea:true,rows:3}]));
}

function buildLebenslaufForm(inner) {
  var hdr = document.createElement('div');
  hdr.className = 'tpl-header';
  hdr.textContent = 'Lebenslauf - Felder ausfüllen';
  inner.appendChild(hdr);
  inner.appendChild(makeFormRow([{label:'Vorname',id:'lv-vorname',placeholder:'Max'},{label:'Nachname',id:'lv-nachname',placeholder:'Mustermann'}]));
  inner.appendChild(makeFormRow([{label:'Geburtsdatum',id:'lv-geb',placeholder:'01.01.2008'},{label:'Geburtsort',id:'lv-gebort',placeholder:'Wuppertal'}]));
  inner.appendChild(makeFormRow([{label:'Adresse',id:'lv-adresse',placeholder:'Musterstr. 1, 42103 Wuppertal'},{label:'Telefon',id:'lv-tel',placeholder:'0152 12345678'}]));
  inner.appendChild(makeFormRow([{label:'E-Mail',id:'lv-email',placeholder:'max@mail.de'},{label:'Nationalitaet',id:'lv-nation',placeholder:'Deutsch'}]));
  inner.appendChild(makeFormRow([{label:'Aktuelle Schule',id:'lv-schule',placeholder:'Gesamtschule Muster'},{label:'Klasse + Abschluss',id:'lv-klasse',placeholder:'10. Klasse, 2026'}]));
  inner.appendChild(makeFormRow([{label:'Praktikum (Firma + Jahr)',id:'lv-prak',placeholder:'Firma XY, 2025'},{label:'Sprachen',id:'lv-sprachen',placeholder:'Deutsch, Englisch'}]));
  inner.appendChild(makeFormRow([{label:'Hobbys',id:'lv-hobbys',placeholder:'Sport, Musik, Gaming'},{label:'Datum',id:'lv-datum',placeholder:'21.06.2026'}]));
}

// DRAG DROP
function dragEv(e, type) {
  e.preventDefault();
  var da = document.getElementById('drop-area');
  if (type === 'over') da.classList.add('over');
  else if (type === 'leave') da.classList.remove('over');
  else { da.classList.remove('over'); addFiles(e.dataTransfer.files); }
}

function addFiles(fl) {
  var multi = (curTool === 'img-pdf' || curTool === 'merge');
  if (!multi) files = [];
  var allowed = {'img-pdf':['image/jpeg','image/png','image/webp'],'merge':['application/pdf'],'split':['application/pdf'],'rotate':['application/pdf'],'watermark':['application/pdf'],'protect':['application/pdf'],'delete-page':['application/pdf'],'reorder':['application/pdf']};
  var allowedExts = {'img-pdf':['.jpg','.jpeg','.png','.webp'],'merge':['.pdf'],'split':['.pdf'],'rotate':['.pdf'],'watermark':['.pdf'],'protect':['.pdf'],'delete-page':['.pdf'],'reorder':['.pdf']};
  var rejected = [];
  for (var i = 0; i < fl.length; i++) {
    var f = fl[i];
    var ext = '.' + f.name.split('.').pop().toLowerCase();
    var typeList = allowed[curTool] || [];
    var extList = allowedExts[curTool] || [];
    if (typeList.length && !typeList.includes(f.type) && !extList.includes(ext)) {
      rejected.push(f.name);
    } else {
      files.push(f);
    }
  }
  if (rejected.length) {
    showFileError('Falsche Datei! Dieses Tool akzeptiert nur ' + (allowedExts[curTool] || []).join(', ') + ' Dateien.');
  } else {
    document.getElementById('file-error-banner').classList.remove('show');
  }
  renderFiles();
  updateBtn();
}

function renderFiles() {
  var el = document.getElementById('file-list');
  el.innerHTML = '';
  files.forEach(function(f, i) {
    var d = document.createElement('div');
    d.className = 'file-item';
    d.innerHTML = '<span class="file-icon">📄</span><span class="file-name">' + f.name + '</span><span class="file-size">' + (f.size/1024).toFixed(0) + ' KB</span>';
    var btn = document.createElement('button');
    btn.className = 'file-rm';
    btn.textContent = '✕';
    btn.onclick = function() { removeFile(i); };
    d.appendChild(btn);
    el.appendChild(d);
  });
}

function removeFile(i) { files.splice(i,1); renderFiles(); updateBtn(); }

function showFileError(msg) {
  document.getElementById('file-error-text').textContent = msg;
  document.getElementById('file-error-banner').classList.add('show');
}

// BUTTON STATE
function updateBtn() {
  var btn = document.getElementById('convert-btn');
  var nb = document.getElementById('no-credits-banner');
  nb.classList.remove('show');
  var needsFile = noUploadTools.indexOf(curTool) === -1;
  if (needsFile && files.length === 0) {
    btn.className = 'convert-btn disabled';
    btn.textContent = 'Datei auswählen um fortzufahren';
    return;
  }
  if (credits <= 0) {
    btn.className = 'convert-btn disabled';
    btn.textContent = 'Keine Credits — kaufe mehr';
    nb.classList.add('show');
    return;
  }
  if (credits < curCost) {
    btn.className = 'convert-btn disabled';
    btn.textContent = 'Zu wenig Credits (brauchst ' + curCost + ')';
    nb.classList.add('show');
    return;
  }
  btn.className = 'convert-btn ready';
  var label = noUploadTools.indexOf(curTool) !== -1 ? 'PDF erstellen' : 'Jetzt umwandeln';
  btn.textContent = label + ' — ' + curCost + ' Credit' + (curCost > 1 ? 's' : '') + ' verwenden';
}

// PROGRESS
function setProgress(pct, label) {
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-label').textContent = label;
}
function showProgress(show) {
  document.getElementById('progress-wrap').classList[show ? 'add' : 'remove']('show');
}

// CONVERT
async function convert() {
  var needsFile = noUploadTools.indexOf(curTool) === -1;
  if (needsFile && files.length === 0) return;
  if (credits < curCost) return;
  var btn = document.getElementById('convert-btn');
  btn.className = 'convert-btn loading';
  btn.textContent = 'Wird verarbeitet…';
  document.getElementById('result-box').classList.remove('show');
  document.getElementById('file-error-banner').classList.remove('show');
  showProgress(true);
  setProgress(10, 'Wird gestartet…');

  try {
    var blob = null, name = 'output.pdf';
    if (curTool === 'img-pdf')      { blob = await toolImgToPdf();    name = 'bilder.pdf'; }
    else if (curTool === 'merge')   { blob = await toolMerge();       name = 'merged.pdf'; }
    else if (curTool === 'split')   { blob = await toolSplit();       name = 'seiten.pdf'; }
    else if (curTool === 'rotate')  { blob = await toolRotate();      name = 'rotiert.pdf'; }
    else if (curTool === 'watermark'){ blob = await toolWatermark();  name = 'wasserzeichen.pdf'; }
    else if (curTool === 'protect') { blob = await toolProtect();     name = 'geschuetzt.pdf'; }
    else if (curTool === 'delete-page'){ blob = await toolDeletePage(); name = 'bearbeitet.pdf'; }
    else if (curTool === 'reorder') { blob = await toolReorder();     name = 'sortiert.pdf'; }
    else if (curTool === 'create-pdf'){ blob = await toolCreatePdf(); name = 'dokument.pdf'; }
    else if (curTool === 'bewerbung'){ blob = await toolBewerbung();  name = 'bewerbung.pdf'; }
    else if (curTool === 'lebenslauf'){ blob = await toolLebenslauf(); name = 'lebenslauf.pdf'; }

    setProgress(100, 'Fertig!');
    credits -= curCost;
    saveCredits();
    updateCreditDisplay();
    resultBlob = blob;
    document.getElementById('result-text').textContent = name + ' ist fertig (' + (blob.size/1024).toFixed(0) + ' KB)';
    document.getElementById('result-box').classList.add('show');
    document.getElementById('result-dl').onclick = function() { downloadBlob(blob, name); };
    showToast('Fertig! ' + curCost + ' Credit' + (curCost > 1 ? 's' : '') + ' verwendet.');
    updateBtn();
    setTimeout(function() { showProgress(false); }, 800);
  } catch(err) {
    showProgress(false);
    updateBtn();
    showFileError('Fehler: ' + (err && err.message ? err.message : 'Unbekannter Fehler'));
    console.error(err);
  }
}

function downloadBlob(blob, name) {
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = name; a.click();
  setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
}

function g(id) { var el = document.getElementById(id); return el ? el.value || '' : ''; }

async function readAB(file) {
  return new Promise(function(res,rej) {
    var r = new FileReader();
    r.onload = function() { res(r.result); };
    r.onerror = rej;
    r.readAsArrayBuffer(file);
  });
}
async function readDataURL(file) {
  return new Promise(function(res,rej) {
    var r = new FileReader();
    r.onload = function() { res(r.result); };
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

// TOOLS
async function toolImgToPdf() {
  var doc = await PDFLib.PDFDocument.create();
  for (var i = 0; i < files.length; i++) {
    setProgress(10 + Math.round(i/files.length*80), 'Bild ' + (i+1) + ' von ' + files.length);
    var dataUrl = await readDataURL(files[i]);
    var imgBytes = await fetch(dataUrl).then(function(r) { return r.arrayBuffer(); });
    var img = files[i].type === 'image/jpeg' ? await doc.embedJpg(imgBytes) : await doc.embedPng(imgBytes);
    var page = doc.addPage([img.width, img.height]);
    page.drawImage(img, {x:0,y:0,width:img.width,height:img.height});
  }
  setProgress(95, 'Wird gespeichert…');
  return new Blob([await doc.save()], {type:'application/pdf'});
}

async function toolMerge() {
  var merged = await PDFLib.PDFDocument.create();
  for (var i = 0; i < files.length; i++) {
    setProgress(10 + Math.round(i/files.length*80), 'Datei ' + (i+1) + '…');
    var src = await PDFLib.PDFDocument.load(await readAB(files[i]));
    var pages = await merged.copyPages(src, src.getPageIndices());
    pages.forEach(function(p) { merged.addPage(p); });
  }
  return new Blob([await merged.save()], {type:'application/pdf'});
}

async function toolSplit() {
  var src = await PDFLib.PDFDocument.load(await readAB(files[0]));
  var count = src.getPageCount();
  for (var i = 0; i < count; i++) {
    setProgress(10 + Math.round(i/count*85), 'Seite ' + (i+1) + ' von ' + count);
    var single = await PDFLib.PDFDocument.create();
    var pages = await single.copyPages(src, [i]);
    single.addPage(pages[0]);
    var b = new Blob([await single.save()], {type:'application/pdf'});
    downloadBlob(b, 'seite_' + (i+1) + '.pdf');
    await new Promise(function(r) { setTimeout(r, 120); });
  }
  return new Blob([await src.save()], {type:'application/pdf'});
}

async function toolRotate() {
  var deg = parseInt(g('rot-deg') || '90');
  var doc = await PDFLib.PDFDocument.load(await readAB(files[0]));
  setProgress(50, 'Drehe Seiten…');
  doc.getPages().forEach(function(p) {
    p.setRotation(PDFLib.degrees((p.getRotation().angle + deg) % 360));
  });
  return new Blob([await doc.save()], {type:'application/pdf'});
}

async function toolWatermark() {
  var text = g('wm-text') || 'VERTRAULICH';
  var doc = await PDFLib.PDFDocument.load(await readAB(files[0]));
  var font = await doc.embedFont(PDFLib.StandardFonts.HelveticaBold);
  var pages = doc.getPages();
  pages.forEach(function(page, i) {
    setProgress(20 + Math.round(i/pages.length*70), 'Seite ' + (i+1));
    var w = page.getWidth(), h = page.getHeight();
    var sz = Math.min(w,h)/8;
    page.drawText(text, {
      x: w/2 - font.widthOfTextAtSize(text,sz)/2,
      y: h/2 - sz/2, size: sz, font: font,
      color: PDFLib.rgb(0.8,0.1,0.1), opacity: 0.25,
      rotate: PDFLib.degrees(-45)
    });
  });
  return new Blob([await doc.save()], {type:'application/pdf'});
}

async function toolProtect() {
  var pw = g('pw-text');
  if (!pw) throw new Error('Bitte ein Passwort eingeben.');
  var doc = await PDFLib.PDFDocument.load(await readAB(files[0]));
  setProgress(60, 'Passwort wird gesetzt…');
  doc.setTitle('Passwortgeschuetzt');
  showToast('Hinweis: Echte Verschluesselung benoetigt ein Backend.');
  return new Blob([await doc.save()], {type:'application/pdf'});
}

async function toolDeletePage() {
  var input = g('del-pages');
  var toDelete = input.split(',').map(function(s) { return parseInt(s.trim()) - 1; }).filter(function(n) { return !isNaN(n); });
  if (!toDelete.length) throw new Error('Bitte Seitennummern angeben.');
  var src = await PDFLib.PDFDocument.load(await readAB(files[0]));
  var keep = src.getPageIndices().filter(function(i) { return toDelete.indexOf(i) === -1; });
  setProgress(50, 'Seiten werden entfernt…');
  var doc = await PDFLib.PDFDocument.create();
  var pages = await doc.copyPages(src, keep);
  pages.forEach(function(p) { doc.addPage(p); });
  return new Blob([await doc.save()], {type:'application/pdf'});
}

async function toolReorder() {
  var input = g('reorder-pages');
  var order = input.split(',').map(function(s) { return parseInt(s.trim()) - 1; }).filter(function(n) { return !isNaN(n); });
  if (!order.length) throw new Error('Bitte Reihenfolge angeben.');
  var src = await PDFLib.PDFDocument.load(await readAB(files[0]));
  setProgress(50, 'Seiten werden sortiert…');
  var doc = await PDFLib.PDFDocument.create();
  var pages = await doc.copyPages(src, order);
  pages.forEach(function(p) { doc.addPage(p); });
  return new Blob([await doc.save()], {type:'application/pdf'});
}

async function toolCreatePdf() {
  var title = g('cp-title');
  var bodyText = g('cp-content');
  var fontSize = parseInt(g('cp-size') || '12');
  var align = g('cp-align') || 'left';
  if (!bodyText.trim()) throw new Error('Bitte Text eingeben.');
  return await buildPdf(title, bodyText, fontSize, align);
}

async function toolBewerbung() {
  var vn = g('bw-vorname') || 'Vorname';
  var nn = g('bw-nachname') || 'Nachname';
  var str = g('bw-strasse') || 'Musterstrasse 1';
  var sdt = g('bw-stadt') || '00000 Stadt';
  var eml = g('bw-email') || 'email@beispiel.de';
  var tel = g('bw-tel') || '0000 000000';
  var stelle = g('bw-stelle') || 'Ausbildungsplatz';
  var firma = g('bw-firma') || 'Unternehmen GmbH';
  var schule = g('bw-schule') || 'Musterschule';
  var klasse = g('bw-klasse') || '10. Klasse';
  var alter = g('bw-alter') || '16';
  var datum = g('bw-datum') || new Date().toLocaleDateString('de-DE');
  var extra = g('bw-extra') || 'Ich bin sehr motiviert und lerne schnell. Ich freue mich darauf, mein Wissen in Ihrem Unternehmen einzubringen.';

  var doc = await PDFLib.PDFDocument.create();
  var font = await doc.embedFont(PDFLib.StandardFonts.Helvetica);
  var bold = await doc.embedFont(PDFLib.StandardFonts.HelveticaBold);
  var W = 595, H = 842;
  var page = doc.addPage([W, H]);
  var acc = PDFLib.rgb(0.05, 0.36, 0.55);
  var blk = PDFLib.rgb(0,0,0);
  var gry = PDFLib.rgb(0.45,0.45,0.45);

  function wrapText(txt, sz, f, maxW) {
    var words = txt.split(' '), lines = [], cur = '';
    words.forEach(function(w) {
      var t = cur ? cur + ' ' + w : w;
      if (f.widthOfTextAtSize(t, sz) > maxW) { if (cur) lines.push(cur); cur = w; } else cur = t;
    });
    if (cur) lines.push(cur);
    return lines;
  }

  function drawText(p, txt, x, yPos, sz, f, col) {
    p.drawText(txt, {x:x, y:yPos, size:sz, font:f, color:col||blk});
  }

  function drawWrapped(p, txt, x, yPos, sz, f, maxW, col, lh) {
    var lines = wrapText(txt, sz, f, maxW);
    lines.forEach(function(l) {
      p.drawText(l, {x:x, y:yPos, size:sz, font:f, color:col||blk});
      yPos -= lh || sz * 1.5;
    });
    return yPos;
  }

  setProgress(30, 'Kopfzeile...');
  // HEADER BAR
  page.drawRectangle({x:0, y:H-70, width:W, height:70, color:acc});
  drawText(page, vn + ' ' + nn, 40, H-38, 20, bold, PDFLib.rgb(1,1,1));
  drawText(page, eml + '   |   ' + tel, 40, H-58, 9, font, PDFLib.rgb(0.85,0.85,0.85));

  setProgress(50, 'Inhalt...');
  var y = H - 100;
  var ml = 40, mr = W - 40, bodyW = mr - ml;

  // Absender-Block oben rechts
  var absender = [str, sdt];
  absender.forEach(function(line) {
    drawText(page, line, ml, y, 10, font, gry);
    y -= 13;
  });
  y -= 10;

  // Empfaenger
  drawText(page, firma, ml, y, 10, bold, blk); y -= 13;
  drawText(page, 'Personalabteilung', ml, y, 10, font, blk); y -= 20;

  // Datum
  drawText(page, datum, ml, y, 10, font, gry); y -= 25;

  // Betreff
  drawText(page, 'Bewerbung als ' + stelle, ml, y, 13, bold, acc); y -= 8;
  page.drawLine({start:{x:ml,y:y}, end:{x:mr,y:y}, thickness:1.5, color:acc});
  y -= 20;

  // Anrede
  drawText(page, 'Sehr geehrte Damen und Herren,', ml, y, 10, font, blk); y -= 18;

  // Body paragraphs
  var p1 = 'mit grossem Interesse habe ich Ihre Stellenanzeige gelesen und bewerbe mich hiermit um einen Ausbildungsplatz als ' + stelle + ' in Ihrem Unternehmen.';
  y = drawWrapped(page, p1, ml, y, 10, font, bodyW, blk, 14);
  y -= 10;

  var p2 = 'Ich bin ' + alter + ' Jahre alt und besuche derzeit die ' + schule + ' (' + klasse + ').';
  y = drawWrapped(page, p2, ml, y, 10, font, bodyW, blk, 14);
  y -= 10;

  y = drawWrapped(page, extra, ml, y, 10, font, bodyW, blk, 14);
  y -= 10;

  var p3 = 'Ich freue mich sehr ueber die Moeglichkeit, mich persoenlich vorzustellen und stehe fuer ein Vorstellungsgespraech jederzeit zur Verfuegung.';
  y = drawWrapped(page, p3, ml, y, 10, font, bodyW, blk, 14);
  y -= 20;

  drawText(page, 'Mit freundlichen Gruessen,', ml, y, 10, font, blk); y -= 35;
  drawText(page, vn + ' ' + nn, ml, y, 11, bold, blk); y -= 20;

  // Linie Unterschrift
  page.drawLine({start:{x:ml,y:y+10}, end:{x:ml+120,y:y+10}, thickness:0.5, color:gry});
  y -= 15;
  drawText(page, 'Anlagen: Lebenslauf, Zeugniskopie', ml, y, 9, font, gry);

  setProgress(95, 'Speichern...');
  return new Blob([await doc.save()], {type:'application/pdf'});
}

async function toolLebenslauf() {
  var vn = g('lv-vorname') || 'Vorname';
  var nn = g('lv-nachname') || 'Nachname';
  var geb = g('lv-geb') || 'TT.MM.JJJJ';
  var gebort = g('lv-gebort') || 'Stadt';
  var adr = g('lv-adresse') || 'Musterstr. 1, 00000 Stadt';
  var tel = g('lv-tel') || '0000 000000';
  var eml = g('lv-email') || 'email@beispiel.de';
  var nat = g('lv-nation') || 'Deutsch';
  var schule = g('lv-schule') || 'Musterschule';
  var klasse = g('lv-klasse') || '10. Klasse, 2026';
  var prak = g('lv-prak') || 'Kein Praktikum bisher';
  var spr = g('lv-sprachen') || 'Deutsch, Englisch';
  var hob = g('lv-hobbys') || 'Sport, Musik';
  var datum = g('lv-datum') || new Date().toLocaleDateString('de-DE');

  var doc = await PDFLib.PDFDocument.create();
  var font = await doc.embedFont(PDFLib.StandardFonts.Helvetica);
  var bold = await doc.embedFont(PDFLib.StandardFonts.HelveticaBold);
  var W = 595, H = 842;
  var page = doc.addPage([W, H]);

  var acc = PDFLib.rgb(0.15, 0.15, 0.18);
  var accLight = PDFLib.rgb(0.93, 0.93, 0.95);
  var blk = PDFLib.rgb(0,0,0);
  var wht = PDFLib.rgb(1,1,1);
  var gry = PDFLib.rgb(0.5,0.5,0.5);
  var darkAcc = PDFLib.rgb(0.05, 0.36, 0.55);

  // LEFT SIDEBAR
  var sideW = 175;
  page.drawRectangle({x:0, y:0, width:sideW, height:H, color:acc});

  // Name in sidebar top
  page.drawRectangle({x:0, y:H-90, width:sideW, height:90, color:PDFLib.rgb(0.05,0.05,0.08)});
  var nameSize = vn.length + nn.length > 16 ? 13 : 15;
  page.drawText(vn, {x:15, y:H-38, size:nameSize, font:bold, color:wht});
  page.drawText(nn, {x:15, y:H-58, size:nameSize, font:bold, color:wht});
  page.drawText('Lebenslauf', {x:15, y:H-76, size:8, font:font, color:PDFLib.rgb(0.7,0.7,0.7)});

  // Sidebar sections
  function sideSection(title, items, startY) {
    page.drawText(title, {x:12, y:startY, size:8, font:bold, color:PDFLib.rgb(0.7,0.8,0.9)});
    startY -= 4;
    page.drawLine({start:{x:12,y:startY}, end:{x:sideW-12,y:startY}, thickness:0.5, color:PDFLib.rgb(0.3,0.3,0.35)});
    startY -= 12;
    items.forEach(function(item) {
      var lines = wrapSide(item, 8, font, sideW-24);
      lines.forEach(function(l) {
        page.drawText(l, {x:12, y:startY, size:8, font:font, color:PDFLib.rgb(0.85,0.85,0.85)});
        startY -= 11;
      });
      startY -= 2;
    });
    return startY;
  }

  function wrapSide(txt, sz, f, maxW) {
    var words = txt.split(' '), lines = [], cur = '';
    words.forEach(function(w) {
      var t = cur ? cur + ' ' + w : w;
      if (f.widthOfTextAtSize(t, sz) > maxW) { if (cur) lines.push(cur); cur = w; } else cur = t;
    });
    if (cur) lines.push(cur);
    return lines;
  }

  setProgress(40, 'Layout aufbauen...');
  var sy = H - 110;
  sy = sideSection('PERSONLICHE DATEN', [
    'Geb.: ' + geb,
    gebort,
    adr,
    tel,
    eml,
    nat
  ], sy);
  sy -= 15;
  sy = sideSection('SPRACHEN', spr.split(',').map(function(s){return s.trim();}), sy);
  sy -= 15;
  sy = sideSection('HOBBYS', hob.split(',').map(function(s){return s.trim();}), sy);

  // MAIN CONTENT
  var mx = sideW + 25, mW = W - mx - 30;
  var y = H - 55;

  function mainSection(title, yPos) {
    page.drawText(title, {x:mx, y:yPos, size:11, font:bold, color:darkAcc});
    yPos -= 5;
    page.drawLine({start:{x:mx,y:yPos}, end:{x:W-30,y:yPos}, thickness:1, color:darkAcc});
    return yPos - 14;
  }

  function mainEntry(left, right, sub, yPos) {
    page.drawText(left, {x:mx, y:yPos, size:10, font:bold, color:blk});
    if (right) page.drawText(right, {x:W-30-font.widthOfTextAtSize(right,9), y:yPos, size:9, font:font, color:gry});
    yPos -= 13;
    if (sub) {
      page.drawText(sub, {x:mx+8, y:yPos, size:9, font:font, color:gry});
      yPos -= 13;
    }
    return yPos;
  }

  function wrapMain(txt, yPos) {
    var words = txt.split(' '), lines = [], cur = '';
    words.forEach(function(w) {
      var t = cur ? cur+' '+w : w;
      if (font.widthOfTextAtSize(t,9) > mW) { if(cur) lines.push(cur); cur=w; } else cur=t;
    });
    if (cur) lines.push(cur);
    lines.forEach(function(l) {
      page.drawText(l, {x:mx+8, y:yPos, size:9, font:font, color:blk});
      yPos -= 12;
    });
    return yPos;
  }

  setProgress(65, 'Inhalt einfuegen...');

  y = mainSection('SCHULAUSBILDUNG', y);
  y = mainEntry(schule, 'aktuell', klasse, y);
  y -= 15;

  y = mainSection('PRAKTIKA & ERFAHRUNG', y);
  y = wrapMain(prak, y);
  y -= 15;

  y = mainSection('KENNTNISSE', y);
  y = mainEntry('Sprachen', '', spr, y);
  y = mainEntry('EDV', '', 'MS Office, Internet', y);
  y -= 20;

  // Unterschrift
  page.drawText(datum, {x:mx, y:y, size:9, font:font, color:gry}); y -= 25;
  page.drawLine({start:{x:mx,y:y+5}, end:{x:mx+130,y:y+5}, thickness:0.5, color:gry});
  page.drawText(vn + ' ' + nn, {x:mx, y:y-8, size:9, font:font, color:gry});

  setProgress(95, 'Speichern...');
  return new Blob([await doc.save()], {type:'application/pdf'});
}

async function buildPdf(title, bodyText, fontSize, align) {
  var doc = await PDFLib.PDFDocument.create();
  var font = await doc.embedFont(PDFLib.StandardFonts.Helvetica);
  var boldFont = await doc.embedFont(PDFLib.StandardFonts.HelveticaBold);
  var pageW = 595, pageH = 842, margin = 60;
  var maxW = pageW - margin * 2;
  var lh = fontSize * 1.6;

  function wrap(txt, sz, f) {
    var words = txt.split(' ');
    var lines = [], cur = '';
    words.forEach(function(w) {
      var test = cur ? cur + ' ' + w : w;
      if (f.widthOfTextAtSize(test, sz) > maxW) { if (cur) lines.push(cur); cur = w; }
      else cur = test;
    });
    if (cur) lines.push(cur);
    return lines;
  }

  var allLines = [];
  if (title) {
    allLines.push({text: title, size: fontSize + 3, bold: true});
    allLines.push({text: '', size: fontSize, bold: false});
  }
  bodyText.split('\n').forEach(function(para) {
    if (!para.trim()) { allLines.push({text:'',size:fontSize,bold:false}); return; }
    var isHeader = para === para.toUpperCase() && para.trim().length > 3;
    wrap(para, fontSize, font).forEach(function(l) {
      allLines.push({text:l, size:fontSize, bold:isHeader});
    });
  });

  setProgress(60, 'Seiten werden bef\u00fcllt\u2026');
  var page = doc.addPage([pageW, pageH]);
  var y = pageH - margin;

  allLines.forEach(function(line) {
    if (y < margin + line.size) { page = doc.addPage([pageW, pageH]); y = pageH - margin; }
    if (line.text) {
      var f = line.bold ? boldFont : font;
      var tw = f.widthOfTextAtSize(line.text, line.size);
      var x = (align === 'center') ? (pageW - tw) / 2 : margin;
      page.drawText(line.text, {x:x, y:y, size:line.size, font:f, color:PDFLib.rgb(0,0,0)});
    }
    y -= lh;
  });

  setProgress(95, 'Wird gespeichert\u2026');
  return new Blob([await doc.save()], {type:'application/pdf'});
}

// MODAL
async function openStripe(url, credits) {
  closeModal();
  showToast('Zahlung wird vorbereitet...');
  try {
    var res = await fetch('https://easypd-backend.vercel.app/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credits: credits })
    });
    if (!res.ok) throw new Error('Server Fehler');
    var data = await res.json();
    if (data.url) {
      leavingForPayment = true;
      window.location.href = data.url;
    } else {
      throw new Error('Keine URL');
    }
  } catch(err) {
    console.error(err);
    showToast('Direkt zu Stripe...');
    leavingForPayment = true;
    window.location.href = url;
  }
}

function showComingSoon() { document.getElementById("cs-modal").classList.add("open"); }

function openModal() { document.getElementById('modal-bg').classList.add('open'); }
function closeModal() { document.getElementById('modal-bg').classList.remove('open'); }

function selPkg(i, c, p) {
  document.querySelectorAll('.pkg').forEach(function(x) { x.classList.remove('sel'); });
  document.getElementById('pkg-' + i).classList.add('sel');
  pkgSel = {i:i, c:c, p:p};
  var btn = document.getElementById('pay-confirm');
  btn.textContent = c + ' Credits fuer ' + p + ' kaufen';
}



function buyCredits() {
  showToast('Bitte Paket auswählen!');
}

function showToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2800);
}
</script>
</body>
</html>
