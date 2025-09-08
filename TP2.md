# TP et TD 2: Utilisation d'une librairie de composants: DaisyUI

## Objectifs pédagogiques

L'objectif de cette semaine est d'ajouter du style en utilisant  [DaisyUI](https://daisyui.com/). DaisyUI est une librairie de composants basée sur Tailwind CSS qui permet de styliser rapidement des applications web avec des composants préconçus et personnalisables.

## Installation et Configuration:

1. **Installer les libraires de Tailwind CSS et daisyUI**:
    ```bash
    npx astro add tailwind
    npm install daisyui@latest
    ```

2. **Verifier que le fichier astro.config.mjs contient** :
    ```js
    // @ts-check
    import { defineConfig } from "astro/config";
    import tailwindcss from "@tailwindcss/vite";

    export default defineConfig({
        vite: {
            plugins: [tailwindcss()],
        },
    });
    ```

3. **Ajouter Tailwind CSS et daisyUI dans votre fichier CSS principal (et supprimer les autres styles)** :
    ```js
    @import "tailwindcss";
    @plugin "daisyui";
    ```


4. **Utiliser les classes DaisyUI dans vos composants** :
    - Par exemple :
      ```html
      <button class="btn btn-primary">Bouton DaisyUI</button>
      ```

Votre projet Astro est maintenant prêt à utiliser DaisyUI pour styliser vos composants rapidement.

Faites un commit.

## Exploration de l'utilisation des couleurs sémantiques

DaisyUI propose des couleurs sémantiques (comme `primary`, `secondary`, `accent`, `info`, `success`, `warning`, `error`) qui facilitent la cohérence du design dans votre application.

### Exercice

1. **Modifiez la couleur des textes** de vos boutons, cartes et autres éléments en utilisant les classes de couleurs DaisyUI, par exemple :
    ```html
    <button class="btn btn-primary text-primary-content">Ajouter une Offre</button>
    <div class="card bg-base-100 shadow-xl border border-primary text-primary">
      <!-- contenu de la carte -->
    </div>
    ```

2. **Essayez différentes variantes** :
    - Remplacez `text-primary` par `text-secondary`, `text-accent`, `text-success`, etc.
    - Utilisez aussi les classes `text-base-content`, `text-info`, `text-warning`, etc. pour tester les couleurs sémantiques sur différents éléments.

3. **Ajoutez des messages d'état** avec des couleurs de texte adaptées, par exemple :
    ```html
    <div class="alert alert-success text-success-content">Opération réussie !</div>
    <div class="alert alert-error text-error-content">Une erreur est survenue.</div>
    ```

### Ressources utiles

- [Documentation DaisyUI - Colors](https://daisyui.com/docs/colors/)

Testez différentes couleurs et composants pour mieux comprendre l'intérêt des couleurs sémantiques dans la conception d'interfaces accessibles et cohérentes.
## Exploration des composants DaisyUI

DaisyUI propose de nombreux composants prêts à l'emploi (boutons, cartes, alertes, formulaires, modals, etc.) que vous pouvez intégrer facilement dans votre application Astro.

### Exercice

1. **Parcourez la [documentation DaisyUI - Components](https://daisyui.com/components/)** pour découvrir les différents composants disponibles.

2. **Remplacez vos éléments HTML classiques** (boutons, cartes, formulaires, etc.) par les composants DaisyUI correspondants. Par exemple :
    ```html
    <div class="card bg-base-100 w-96 shadow-sm m-5">
    <figure>
        <PbImage record={maison} imageField="image" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">{maison.nomMaison}</h2>
        <p>{maison.adresse}</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Plus d'infos</button>
        </div>
    </div>
    ```

3. **Testez d'autres composants** comme les alertes, badges, modals, ou encore les barres de navigation pour enrichir l'interface de votre application.

4. **Personnalisez les composants** en utilisant les classes utilitaires Tailwind CSS et les options de DaisyUI pour adapter le style à vos besoins.

### Conseils

- Utilisez la documentation officielle pour copier-coller rapidement des exemples de composants.
- Pensez à la cohérence visuelle de votre application en utilisant les couleurs et variantes sémantiques vues précédemment.
- N'hésitez pas à explorer les options de personnalisation de DaisyUI pour adapter les composants à votre charte graphique.

## Utilisation des thèmes avec DaisyUI

DaisyUI propose plusieurs thèmes prédéfinis qui permettent de changer rapidement l'apparence globale de votre application (couleurs, ambiance claire/sombre, etc.). Vous pouvez aussi créer vos propres thèmes personnalisés.

### Activer et changer de thème

1. **Activer le sélecteur de thème DaisyUI**  
    Ajoutez l'attribut `data-theme` sur la balise `<html>` ou `<body>` de votre projet Astro pour appliquer un thème (Consultez la [liste complète des thèmes DaisyUI](https://daisyui.com/docs/themes/) pour voir les options disponibles (`light`, `dark`, `cupcake`, `bumblebee`, `emerald`, etc.)):
    ```html
    <html data-theme="light">
    <!-- ou -->
    <html data-theme="dark">
    <!-- ou un autre thème DaisyUI, par exemple -->
    <html data-theme="cupcake">
    ```

Par default,les themes `light` et `dark` sont activés. On peut activer d'autre themes dans le fichier css global:

```js
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark, cupcake;
}
```

### Exemple de changement de theme dynamique

```html
<div class="p-4">
  <button onclick="document.documentElement.setAttribute('data-theme', 'dark')" class="btn btn-neutral">Mode sombre</button>
  <button onclick="document.documentElement.setAttribute('data-theme', 'light')" class="btn btn-primary ml-2">Mode clair</button>
</div>
```

Vous pouvez aussi utiliser les composants de type [Theme Controller](https://daisyui.com/components/theme-controller/) de DaisyUI.


### Personnaliser un thème

Vous pouvez personnaliser un thème dans le fichier CSS global. Par exemple pour changer la couleur primaire du thème `light`, il faut ajouter sous la ligne `@plugin "daisyui";`:
```js
@plugin "daisyui/theme" {
  name: "light";
  default: true;
  --color-primary: blue;
  --color-secondary: teal;
}
```
Vous pouvez aussi créer votre propre thème. DaisyUI propose un [générateur de thème](https://daisyui.com/theme-generator) pour concevoir facilement votre thème, puis copier le code généré dans votre fichier CSS.

Pour aller plus loin, consultez la [documentation DaisyUI sur les thèmes](https://daisyui.com/docs/themes/).


# Exercices
Pour mettre en application ce que vous avez appris, réalisez les exercices suivants :

1. **Créer votre propre thème DaisyUI**
    - Utilisez le [générateur de thème DaisyUI](https://daisyui.com/theme-generator) pour concevoir un thème personnalisé (choisissez vos couleurs, polices, etc.).
    - Ajoutez ce thème à votre projet en suivant la documentation DaisyUI sur les thèmes.
    - Appliquez votre thème à votre site d’agence immobilière.

2. **Styliser votre site avec DaisyUI**
    - Remplacez les éléments HTML classiques par des composants DaisyUI.
    - Assurez-vous que votre site est responsive.  
        Utilisez les utilitaires responsive de Tailwind CSS (`sm:`, `md:`, `lg:`, `xl:`) pour adapter la mise en page et le style de vos composants DaisyUI sur tous les formats d’écran. Consultez la [documentation Tailwind CSS sur la responsivité](https://tailwindcss.com/docs/responsive-design) pour plus d’exemples.   
    - Essayez d’utiliser au moins un composant de chaque catégorie :
      - **Actions** (ex : boutons, dropdowns)
      - **Navigation** (ex : navbar, tabs)
      - **Data Display** (ex : cards, badges, alerts)
    - Consultez la [documentation des composants DaisyUI](https://daisyui.com/components/) pour trouver des exemples.

3. **Ajouter un bouton de changement de thème (Theme Controller)**
    - Ajoutez un bouton qui permet à l’utilisateur de basculer entre deux thèmes : un thème clair et un thème sombre.
    - Vous pouvez utiliser le composant [Theme Controller](https://daisyui.com/components/theme-controller/) de DaisyUI ou créer votre propre bouton avec du JavaScript.

4. **Créer une route dynamique pour les détails d’une maison,  si cela n’a pas déjà été fait dans le TP1**
    - Ajoutez une page dynamique qui affiche les détails d’une maison sélectionnée (par exemple : `/maison/[id].astro`).
    - Inspirez-vous de ce que vous avez vu en R213 pour la création de routes dynamiques dans Astro.
    - Affichez toutes les informations de la maison, y compris l’image, en utilisant les composants DaisyUI pour la mise en forme.


