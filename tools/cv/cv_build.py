# -*- coding: utf-8 -*-
"""Genera el CV (ES y EN) replicando el diseno del PDF original.
Metricas extraidas del PDF de referencia con PyMuPDF; unidades en pt sobre A4.
Render final con Chrome headless (mismo motor Skia que genero el original)."""
import os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cv_content import ES, EN, STACK, LINKS

HERE = os.path.dirname(os.path.abspath(__file__))
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
import base64
FOTO = base64.b64encode(open(os.path.join(HERE, 'foto.png'), 'rb').read()).decode()

CSS = """
@page { size: A4; margin: 0; }
* { margin:0; padding:0; box-sizing:border-box; }
html,body { width:595.92pt; height:841.92pt; }
body {
  font-family:'Geist',sans-serif; background:#070A13; color:#A7B0C0;
  -webkit-print-color-adjust:exact; print-color-adjust:exact;
  display:flex; font-size:8pt;
}
.side { width:191pt; background:#0C1221; border-right:.75pt solid #283C58;
        padding:41.97pt 18pt 0 25.5pt; flex-shrink:0; }
.main { flex:1; padding:25.3pt 34.9pt 0 33pt; }

.photo { width:93.7pt; height:93.7pt; border-radius:50%; object-fit:cover;
         display:block; margin-left:.7pt; border:1.2pt solid #3981BF; }
.name { font-size:23pt; font-weight:700; color:#F5F7FA; letter-spacing:-.02em;
        margin-top:12.5pt; line-height:1; }
.name b { color:#F4B860; font-weight:700; }
.role { font-size:8.2pt; color:#5AA3D9; line-height:1.46; margin-top:8.5pt; }

.slabel { font-size:7.2pt; color:#3981BF; letter-spacing:.28em; margin-top:20pt;
          margin-bottom:9pt; font-weight:400; white-space:nowrap; }
.item { margin-bottom:9.2pt; }
.item .k { font-size:7pt; font-weight:500; color:#5AA3D9; letter-spacing:.09em; }
.item .v { font-size:8pt; color:#A7B0C0; margin-top:2.2pt; }

.grp { font-size:8pt; font-weight:600; color:#5AA3D9; margin:9pt 0 5.6pt; }
.grp:first-of-type { margin-top:0; }
.badges { display:flex; flex-wrap:wrap; gap:4.2pt; }
.b { font-size:7.4pt; padding:3.1pt 5.2pt; border-radius:3.2pt; background:#161D33;
     border:.6pt solid #5882B4; color:#F5F7FA; line-height:1; white-space:nowrap; }
.b.hi { border-color:#F4B860; color:#F4B860; }

.lang { font-size:8.6pt; margin-bottom:6pt; }
.lang b { color:#F5F7FA; font-weight:600; }
.lang span { color:#A7B0C0; }

.intro { font-size:9pt; line-height:1.58; color:#A7B0C0; }
.intro b { color:#F5F7FA; font-weight:600; }
.stats { display:flex; margin-top:17.2pt; }
.stat { width:84pt; }
.stat .n { font-size:16pt; font-weight:700; color:#5AA3D9; line-height:1; }
.stat .l { font-size:6.6pt; color:#A7B0C0; margin-top:7.5pt; letter-spacing:.04em;
           line-height:1.35; }
.stat .areas { letter-spacing:0; }

.sec { display:flex; align-items:baseline; gap:3.4pt; margin-top:10.7pt; }
.sec .sl { font-size:7pt; font-weight:700; color:#3981BF; }
.sec h2 { font-size:10pt; font-weight:700; color:#F5F7FA; letter-spacing:-.01em; }
.rule { height:.6pt; background:#5983B4; opacity:.42; margin-top:5.4pt; }

.entry { margin-top:8.4pt; padding-left:17pt; position:relative; }
.entry::before { content:''; position:absolute; left:4pt; top:3.1pt; width:4.6pt;
                 height:4.6pt; border-radius:50%; background:#59A2D9; }
.entry .hd { display:flex; justify-content:space-between; align-items:baseline; gap:8pt; }
.entry .t { font-size:9pt; font-weight:600; color:#F5F7FA; }
.entry .d { font-size:7pt; color:#F4B860; white-space:nowrap; }
.entry .o { font-size:7.6pt; color:#5AA3D9; margin-top:2.6pt; }
.entry .p { font-size:8pt; line-height:1.47; margin-top:3.4pt; }

.pr { margin-top:6.6pt; }
.last { padding-bottom:4.2pt; }
.pr .hd { display:flex; justify-content:space-between; align-items:baseline; gap:8pt; }
.pr .t { font-size:8.6pt; font-weight:600; color:#F5F7FA; }
.pr .tag { font-size:7pt; font-weight:600; color:#F4B860; white-space:nowrap; }
.pr .y { font-size:7pt; color:#A7B0C0; white-space:nowrap; }
.pr .p { font-size:7.8pt; line-height:1.49; margin-top:3.2pt; }
.pr .st { font-family:'Geist Mono',monospace; font-size:6.8pt; color:#5AA3D9;
          margin-top:4.2pt; }
.edu .p { color:#5AA3D9; }
"""


def spaced(s):
    # letter-spacing manual + hueco ancho entre palabras (HTML colapsa espacios)
    return '&#8195;&#8195;'.join(' '.join(w) for w in s.split(' '))


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def build(C):
    intro = ''.join(('<b>%s</b>' % esc(t)) if b else esc(t) for t, b in C['intro'])
    stats = ''.join(
        '<div class="stat"><div class="n">%s</div><div class="l">%s</div></div>' % (n, l)
        for n, l in C['stats'])

    items = ''
    for key, val in LINKS:
        v = C.get(key) if val is None else val
        items += '<div class="item"><div class="k">%s</div><div class="v">%s</div></div>' % (
            C['labels'][key], esc(v))

    stack = ''
    for gk, gname in C['stack_groups'].items():
        bs = ''.join('<span class="b%s">%s</span>' % (' hi' if hi else '', esc(t))
                     for t, hi in STACK[gk])
        stack += '<div class="grp">%s</div><div class="badges">%s</div>' % (esc(gname), bs)

    langs = ''.join('<div class="lang"><b>%s</b> <span>— %s</span></div>' % (esc(a), esc(b))
                    for a, b in C['langs'])

    exps = ''
    for t, o, d, p in C['exp']:
        exps += ('<div class="entry%s"><div class="hd"><div class="t">%s</div>'
                 '<div class="d">%s</div></div><div class="o">%s</div>'
                 '<div class="p">%s</div></div>') % (' last' if (t,o,d,p)==C['exp'][-1] else '', esc(t), esc(d), esc(o), esc(p))

    projs = ''
    for t, tag, y, p, st in C['proj']:
        tg = ' <span class="tag">&#9733; %s</span>' % esc(tag) if tag else ''
        projs += ('<div class="pr%s"><div class="hd"><div class="t">%s%s</div>'
                  '<div class="y">%s</div></div><div class="p">%s</div>'
                  '<div class="st">%s</div></div>') % (' last' if (t,tag,y,p,st)==C['proj'][-1] else '', esc(t), tg, y, esc(p), esc(st))

    et, ed, ep = C['edu']
    edu = ('<div class="pr edu"><div class="hd"><div class="t">%s</div>'
           '<div class="y" style="color:#F4B860">%s</div></div>'
           '<div class="p">%s</div></div>') % (esc(et), esc(ed), esc(ep))

    def sec(title):
        return ('<div class="sec"><span class="sl">//</span><h2>%s</h2></div>'
                '<div class="rule"></div>') % esc(title)

    return """<!doctype html><html lang="%s"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=block" rel="stylesheet">
<style>%s</style></head><body>
<aside class="side">
  <img class="photo" src="data:image/png;base64,%s" alt="">
  <div class="name">Alex <b>D.E.V.</b></div>
  <div class="role">%s</div>
  <div class="slabel">/ / %s</div>
  %s
  <div class="slabel">/ / %s</div>
  %s
  <div class="slabel">/ / %s</div>
  %s
</aside>
<main class="main">
  <p class="intro">%s</p>
  <div class="stats">%s</div>
  %s %s
  %s %s
  %s %s
</main></body></html>""" % (
        C['lang'], CSS, FOTO, esc(C['role']),
        spaced(C['contact_label']), items,
        spaced(C['stack_label']), stack,
        spaced(C['langs_label']), langs,
        intro, stats,
        sec(C['exp_title']), exps,
        sec(C['proj_title']), projs,
        sec(C['edu_title']), edu)


for C in (ES, EN):
    tag = C['lang']
    html = os.path.join(HERE, 'cv-%s.html' % tag)
    pdf = os.path.join(HERE, 'CV-Alex-DEV-%s.pdf' % tag.upper())
    open(html, 'w', encoding='utf-8').write(build(C))
    if os.path.exists(pdf):
        os.remove(pdf)
    subprocess.run([CHROME, '--headless', '--disable-gpu', '--no-pdf-header-footer',
                    '--print-to-pdf=' + pdf, '--virtual-time-budget=12000',
                    'file:///' + html.replace('\\', '/')],
                   capture_output=True, timeout=180)
    print(tag, '->', os.path.basename(pdf),
          (str(os.path.getsize(pdf)) + ' bytes') if os.path.exists(pdf) else 'FALLO')
