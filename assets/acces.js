/* Accès protégé par mot de passe (protection simple, côté navigateur) */
(function () {
  var H = "70823454ea40d1f1b682cb61f009f2df007af86bfdf56152d2432e0cfb9048e4";
  var CLE = "acces-site-ok";
  if (sessionStorage.getItem(CLE) === "1") { return; }

  /* on masque le contenu tant que le mot de passe n'est pas saisi */
  document.documentElement.style.visibility = "hidden";

  async function sha256(txt) {
    var buf = new TextEncoder().encode(txt);
    var d = await crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(d)).map(function (b) {
      return b.toString(16).padStart(2, "0");
    }).join("");
  }

  window.addEventListener("DOMContentLoaded", function () {
    var voile = document.createElement("div");
    voile.id = "voile-acces";
    voile.style.cssText = "position:fixed;inset:0;z-index:99999;display:flex;" +
      "align-items:center;justify-content:center;background:#0f2544;font-family:system-ui,sans-serif";
    voile.innerHTML =
      '<form id="form-acces" style="background:#fff;padding:2rem 1.6rem;border-radius:16px;' +
      'box-shadow:0 12px 40px rgba(0,0,0,.35);width:min(92vw,340px);text-align:center">' +
      '<h1 style="margin:0 0 .3rem;font-size:1.15rem;color:#1a365d">Accès protégé</h1>' +
      '<p style="margin:0 0 1rem;font-size:.85rem;color:#4a5568">Site de mathématiques</p>' +
      '<input id="mdp" type="password" placeholder="Mot de passe" autocomplete="current-password" ' +
      'style="width:100%;padding:.65rem;border:1px solid #cbd5e0;border-radius:10px;font-size:1rem">' +
      '<p id="err" style="color:#c53030;font-size:.82rem;min-height:1.1em;margin:.5rem 0 0"></p>' +
      '<button type="submit" style="margin-top:.6rem;width:100%;padding:.7rem;border:0;border-radius:10px;' +
      'background:#1a365d;color:#fff;font-size:1rem;cursor:pointer">Entrer</button></form>';
    document.body.appendChild(voile);
    document.documentElement.style.visibility = "visible";
    document.getElementById("mdp").focus();

    document.getElementById("form-acces").addEventListener("submit", async function (e) {
      e.preventDefault();
      var val = document.getElementById("mdp").value;
      var ok = (await sha256(val)) === H;
      if (ok) {
        sessionStorage.setItem(CLE, "1");
        voile.remove();
      } else {
        document.getElementById("err").textContent = "Mot de passe incorrect.";
        document.getElementById("mdp").value = "";
        document.getElementById("mdp").focus();
      }
    });
  });
})();
