// ── Firebase Sync — Joc România ─────────────────────────────────────────────

// ── UI helpers (definite PRIMUL — butonul merge chiar dacă Firebase eșuează) ─
function deschideModalCloud() {
    document.getElementById('fb-modal').classList.remove('ascuns');
    setTimeout(() => document.getElementById('fb-email').focus(), 80);
}
function inchideModalCloud() {
    document.getElementById('fb-modal').classList.add('ascuns');
    const errEl = document.getElementById('fb-err');
    if (errEl) errEl.textContent = '';
    document.getElementById('fb-email').value = '';
    document.getElementById('fb-pass').value  = '';
}

function actualizareUIAuth(user) {
    const btn    = document.getElementById('fb-btn-profil');
    const status = document.getElementById('fb-status-bar');
    if (!btn || !status) return;
    if (user) {
        btn.textContent = '☁️ ' + user.email;
        btn.classList.add('fb-conectat');
        status.innerHTML =
            '<span class="fb-sync-ok">✓ Sincronizat</span>' +
            '<button class="fb-logout-btn" onclick="fbLogout()">Deconectare</button>';
    } else {
        btn.textContent = '☁️ Conectează la cloud';
        btn.classList.remove('fb-conectat');
        status.innerHTML = '';
    }
}

// ── Placeholder-uri dacă Firebase nu e disponibil ────────────────────────────
function fbLogin()    { document.getElementById('fb-err').textContent = 'Firebase nu s-a inițializat. Verifică conexiunea la internet.'; }
function fbRegister() { document.getElementById('fb-err').textContent = 'Firebase nu s-a inițializat. Verifică conexiunea la internet.'; }
function fbLogout()   {}
function fbScorSalvat() {}

// ── Init Firebase ─────────────────────────────────────────────────────────────
(function() {
    if (typeof firebase === 'undefined') {
        console.warn('[FB] Firebase SDK nu s-a încărcat.');
        return;
    }

    const cfg = {
        apiKey:            'AIzaSyDv3TIuRLNmNodBge7B6vKIqCz0YIm1BEE',
        authDomain:        'joc-comune.firebaseapp.com',
        projectId:         'joc-comune',
        storageBucket:     'joc-comune.firebasestorage.app',
        messagingSenderId: '1057717358994',
        appId:             '1:1057717358994:web:335250c0eb9f99d47d714b',
    };

    // Folosim un nume explicit ca să nu intre în conflict cu app-ul de Duel
    let syncApp;
    try {
        syncApp = firebase.initializeApp(cfg, 'joc-comune-sync');
    } catch(e) {
        if (e.code === 'app/duplicate-app') {
            syncApp = firebase.app('joc-comune-sync');
        } else { console.error('[FB] init:', e); return; }
    }

    const fbAuth = firebase.auth(syncApp);
    const fbDb   = firebase.firestore(syncApp);

    // Firestore nu acceptă '.' în field names
    const enc = k => k.replace(/\./g, '·');
    const dec = k => k.replace(/·/g, '.');

    function docRef(uid) { return fbDb.collection('profiles').doc(uid); }

    // ── Sincronizare unui scor (apelat din lsSet) ────────────────────────────
    fbScorSalvat = function(cheie, valoare) {
        const user = fbAuth.currentUser;
        if (!user || !cheie.startsWith('hs_')) return;
        docRef(user.uid)
            .set({ scores: { [enc(cheie)]: valoare } }, { merge: true })
            .catch(e => console.warn('[FB] sync:', e));
    };

    // ── Download scoruri din cloud ────────────────────────────────────────────
    async function fbDownload(uid) {
        try {
            const snap = await docRef(uid).get();
            if (!snap.exists) return;
            const scores = snap.data().scores || {};
            const prefix = currentPlayer ? 'p_' + currentPlayer + '_' : '';
            let changed = false;
            Object.entries(scores).forEach(([k, v]) => {
                const cheie    = dec(k);
                const localKey = prefix + cheie;
                const local    = localStorage.getItem(localKey);
                if (local) {
                    try {
                        const ex = JSON.parse(local), nou = JSON.parse(v);
                        if (ex.timp && nou.timp && ex.timp <= nou.timp) return;
                    } catch(_) {}
                }
                localStorage.setItem(localKey, v);
                changed = true;
            });
            if (changed) {
                if (typeof actualizeazaLandingHS === 'function') actualizeazaLandingHS();
                if (typeof afiseazaHSGeografie   === 'function') afiseazaHSGeografie();
                if (typeof actualizeazaAchBadge  === 'function') actualizeazaAchBadge();
            }
        } catch(e) { console.warn('[FB] download:', e); }
    }

    // ── Upload scoruri locale pe cloud ────────────────────────────────────────
    async function fbUpload(uid) {
        try {
            const prefix = currentPlayer ? 'p_' + currentPlayer + '_' : '';
            const scores = {};
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                const isHS = prefix
                    ? k.startsWith(prefix + 'hs_')
                    : (k.startsWith('hs_') && !k.startsWith('p_'));
                if (!isHS) continue;
                const cheie = prefix ? k.slice(prefix.length) : k;
                scores[enc(cheie)] = localStorage.getItem(k);
            }
            if (!Object.keys(scores).length) return;
            await docRef(uid).set({
                name: currentPlayer || fbAuth.currentUser.email,
                scores
            }, { merge: true });
        } catch(e) { console.warn('[FB] upload:', e); }
    }

    // ── Auth state ────────────────────────────────────────────────────────────
    fbAuth.onAuthStateChanged(async user => {
        actualizareUIAuth(user);
        if (user) {
            await fbDownload(user.uid);
            await fbUpload(user.uid);
        }
    });

    // ── Login ─────────────────────────────────────────────────────────────────
    fbLogin = async function() {
        const email = document.getElementById('fb-email').value.trim();
        const pass  = document.getElementById('fb-pass').value;
        const errEl = document.getElementById('fb-err');
        errEl.textContent = '';
        try {
            await fbAuth.signInWithEmailAndPassword(email, pass);
            inchideModalCloud();
        } catch(e) { errEl.textContent = tradFbErr(e.code); }
    };

    // ── Register ──────────────────────────────────────────────────────────────
    fbRegister = async function() {
        const email = document.getElementById('fb-email').value.trim();
        const pass  = document.getElementById('fb-pass').value;
        const errEl = document.getElementById('fb-err');
        errEl.textContent = '';
        if (pass.length < 6) { errEl.textContent = 'Parola trebuie să aibă minim 6 caractere.'; return; }
        try {
            await fbAuth.createUserWithEmailAndPassword(email, pass);
            inchideModalCloud();
        } catch(e) { errEl.textContent = tradFbErr(e.code); }
    };

    // ── Logout ────────────────────────────────────────────────────────────────
    fbLogout = async function() {
        await fbAuth.signOut();
    };

    function tradFbErr(code) {
        return ({
            'auth/user-not-found':         'Email inexistent. Înregistrează-te mai întâi.',
            'auth/wrong-password':         'Parolă incorectă.',
            'auth/invalid-credential':     'Email sau parolă incorectă.',
            'auth/email-already-in-use':   'Email deja folosit. Autentifică-te.',
            'auth/invalid-email':          'Email invalid.',
            'auth/too-many-requests':      'Prea multe încercări. Încearcă mai târziu.',
            'auth/network-request-failed': 'Eroare de rețea. Verifică conexiunea.',
        })[code] || ('Eroare: ' + code);
    }

})();
