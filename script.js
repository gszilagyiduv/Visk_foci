/* ============================================================
   TJ Družstevník Vyškovce nad Ipľom — közös beállítások
   ============================================================
   FONTOS: ide kell beilleszteni a Google Apps Script telepítésekor
   kapott "Web app URL"-t (lásd Code.gs teteje a lépésekért).
*/
const API_URL = 'https://script.google.com/macros/s/AKfycbz_YeS129vdoYoOGwOYoL4MAFJAHlbrj2LH8FJyaV6GXPsFCjn_FIm93IMU4J3Rdh4bBA/exec';

async function apiHivas(action) {
  const res = await fetch(`${API_URL}?action=${action}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

async function apiPost(body) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' }, // szándékosan text/plain, hogy ne váltson ki CORS preflight kérést
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

function eletkor(szuletesiDatum) {
  if (!szuletesiDatum) return null;
  const tisztitott = String(szuletesiDatum).replace(/\./g, '-').replace(/-$/, '');
  const resz = tisztitott.split(/[-.]/).map(Number);
  if (resz.length < 3 || resz.some(isNaN)) return null;
  const [ev, honap, nap] = resz;
  const szul = new Date(ev, honap - 1, nap);
  const ma = new Date();
  let kor = ma.getFullYear() - szul.getFullYear();
  const meg = ma.getMonth() - szul.getMonth();
  if (meg < 0 || (meg === 0 && ma.getDate() < szul.getDate())) kor--;
  return kor;
}

function kezdobetuk(nev) {
  return nev.split(' ').filter(Boolean).slice(0, 2).map(sz => sz[0]).join('').toUpperCase();
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s == null ? '' : s;
  return d.innerHTML;
}

/* Mobil menü nyitása/zárása — minden oldal fejlécén ugyanaz */
function inicializaldMenut() {
  const gomb = document.getElementById('menu-toggle');
  const nav = document.getElementById('fo-nav');
  if (!gomb || !nav) return;
  gomb.addEventListener('click', () => nav.classList.toggle('open'));
}
document.addEventListener('DOMContentLoaded', inicializaldMenut);
