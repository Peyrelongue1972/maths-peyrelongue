# Site « Cours et exercices de mathématiques »

Généré le 15/11/2026 par `build_site.py`.

## Ce que contient ce dossier

```
site/
├── index.html          la page d'accueil (une seule page, tous les niveaux)
├── assets/style.css    la mise en forme
├── assets/app.js       la recherche et les filtres par niveau
└── pdf/<niveau>/       les cours au format PDF
```

## Ajouter ou modifier un chapitre

1. Ouvrez `site-src/chapitres.json` (à la racine, à côté de vos `.tex`).
2. Ajoutez une ligne dans le niveau concerné :

```json
{ "num": "13", "titre": "Mon nouveau chapitre", "fichier": "Chapitre 13 - Mon nouveau chapitre.tex" }
```

   Le champ `exercices` est facultatif : s'il est présent, un second bouton
   « Exercices » apparaît à côté de « Cours ».

3. Relancez `python build_site.py`.

## Compiler les PDF

1. Compilez vos `.tex` comme d'habitude (`pdflatex` deux fois).
2. Renommez / copiez le PDF dans `site/pdf/<niveau>/` en respectant le nom affiché
   par le script (il vous le rappelle à chaque exécution).
3. Relancez `python build_site.py` : le bouton « PDF à venir » devient « Cours ».

Astuce : `compile.ps1` (fourni par le script) compile tous les chapitres et copie
les PDF au bon endroit en une seule commande.

## Publier le site (gratuit)

- **Le plus simple** : déposez le dossier `site/` sur **Netlify Drop**
  (https://app.netlify.com/drop) par glisser-déposer : vous obtenez une adresse
  en quelques secondes.
- **Version contrôlée** : créez un dépôt GitHub, poussez le dossier `site/`,
  puis activez *GitHub Pages* (branche `main`, dossier `/root`).
- **Sans internet** : ouvrez simplement `site/index.html` dans un navigateur
  (tout fonctionne hors ligne, y compris la recherche).

## Accessibilité et impression

La page est responsive, la recherche est insensible aux accents, la touche `/`
place le curseur dans le champ de recherche, et la feuille de style prévoit une
version imprimable (les boutons disparaissent à l'impression).
