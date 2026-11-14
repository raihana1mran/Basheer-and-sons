/* Booking runs on its own so it still works if the animation library fails to load */
/* ---------- table booking → WhatsApp ---------- */
const WA_LINK = 'https://wa.me/919842468188';
const WA_QR = 'https://wa.me/qr/UHVPDF64MXHRM1';   // your WhatsApp QR link: opens your chat   // your WhatsApp number: country code first, digits only (e.g. 96550000000)
const bookEl = document.getElementById('book'), bookForm = document.getElementById('bookForm');
const openBook = () => { bookEl.opener = document.activeElement; bookEl.classList.add('open'); document.documentElement.style.overflow = 'hidden'; document.getElementById('bookDone').hidden = true; setTimeout(() => bookForm.querySelector('input').focus({ preventScroll: true }), 50); };
const closeBook = () => { bookEl.classList.remove('open'); document.documentElement.style.overflow = ''; if (bookEl.opener && bookEl.opener.focus) bookEl.opener.focus({ preventScroll: true }); };
document.querySelectorAll('#openBook, .fab').forEach(b => b.addEventListener('click', e => { e.preventDefault(); openBook(); }));
bookEl.addEventListener('click', e => { if (e.target === bookEl || e.target.closest('[data-close]')) closeBook(); });
bookEl.addEventListener('keydown', e => { if (e.key === 'Escape') closeBook(); e.stopPropagation(); });
const d0 = new Date();
bookForm.querySelector('[name=date]').min = new Date(d0.getTime() - d0.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const pick = document.getElementById('menuPick');
cats.forEach(c => {
  const label = c.name + (c.sub ? ' ' + c.sub.toLowerCase() : '');
  const d = document.createElement('details');
  d.innerHTML = `<summary><span>${label}</span><b class="cnt"></b></summary><div class="chips">${c.items.map(n => `<label class="chip"><input type="checkbox" name="menu" value="${n}" data-cat="${label}"><span>${n}</span></label>`).join('')}</div>`;
  pick.appendChild(d);
});
pick.addEventListener('change', () => pick.querySelectorAll('details').forEach(d => { const n = d.querySelectorAll('input:checked').length; d.querySelector('.cnt').textContent = n || ''; }));
bookForm.addEventListener('submit', e => {
  e.preventDefault();
  const go = bookForm.querySelector('.book-go'); if (go.disabled) return; go.disabled = true; setTimeout(() => { go.disabled = false; }, 3000);
  const f = new FormData(bookForm);
  const lines = ['Hello Basheer & Sons, I would like to book a catering service.', '', `Name: ${f.get('name')}`];
  if (f.get('phone')) lines.push(`Phone: ${f.get('phone')}`);
  lines.push(`Event date: ${f.get('date')}`, `Event time: ${f.get('time')}`, `People: ${f.get('guests')}`);
  const rice = f.getAll('rice'); if (rice.length) lines.push(`Rice: ${rice.join(', ')}`);
  const sel = {}; bookForm.querySelectorAll('input[name=menu]:checked').forEach(x => (sel[x.dataset.cat] = sel[x.dataset.cat] || []).push(x.value));
  const groups = Object.entries(sel);
  if (groups.length) { lines.push('', 'Menu:'); groups.forEach(([k, v]) => lines.push(`${k}: ${v.join(', ')}`)); lines.push(''); }
  if (f.get('note')) lines.push(`Details: ${f.get('note')}`);
  const msg = lines.join('\n'); const url = `${WA_LINK}?text=${encodeURIComponent(msg)}`;
  try { navigator.clipboard.writeText(msg).catch(() => {}); } catch (_) {}
  const phone = WA_LINK.split('/').pop(), text = encodeURIComponent(msg);
  const L = { main: WA_QR, api: `https://api.whatsapp.com/send?phone=${phone}&text=${text}`, web: `https://web.whatsapp.com/send?phone=${phone}&text=${text}`, app: `whatsapp://send?phone=${phone}&text=${text}` };
  if (window.top === window) { setTimeout(() => location.assign(L.api), 250); } else { window.open(L.api, '_blank', 'noopener'); }
  const done = document.getElementById('bookDone');
  done.hidden = false; done.querySelector('.wa-main').href = L.main; done.querySelector('.wa-web').href = L.web; done.querySelector('.wa-app').href = L.app;
  const cp = done.querySelector('.wa-copy'); cp.textContent = 'Copy message';
  cp.onclick = () => { const ok = () => { cp.textContent = 'Copied ✓'; }; const fb = () => { const t = document.createElement('textarea'); t.value = msg; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); ok(); } catch (_) {} t.remove(); }; if (navigator.clipboard) navigator.clipboard.writeText(msg).then(ok, fb); else fb(); }; done.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
});
