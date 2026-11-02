
(function () {
  "use strict";
  var recherche = document.getElementById("recherche");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip[data-niveau]"));
  var sections = Array.prototype.slice.call(document.querySelectorAll(".niveau"));
  var vide = document.getElementById("vide");
  var niveauActif = "tous";

  function normalise(s) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }

  function filtre() {
    var q = normalise(recherche.value);
    var total = 0;

    sections.forEach(function (section) {
      var id = section.id;
      var visibleNiveau = (niveauActif === "tous" || niveauActif === id);
      var cartes = Array.prototype.slice.call(section.querySelectorAll(".carte"));
      var vus = 0;

      cartes.forEach(function (carte) {
        var titre = carte.getAttribute("data-titre") || "";
        var ok = visibleNiveau && (q === "" || titre.indexOf(q) !== -1);
        carte.style.display = ok ? "" : "none";
        if (ok) { vus++; total++; }
      });

      section.style.display = (vus > 0) ? "" : "none";
    });

    vide.hidden = total !== 0;
  }

  if (recherche) {
    recherche.addEventListener("input", filtre);
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("actif"); });
      chip.classList.add("actif");
      niveauActif = chip.getAttribute("data-niveau");
      filtre();
    });
  });

  /* touche « / » pour aller à la recherche */
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== recherche) {
      e.preventDefault();
      recherche.focus();
    }
  });
})();
