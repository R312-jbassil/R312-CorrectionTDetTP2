# TD et TP 1 - Application d'Agence Immobilière avec Astro et PocketBase

## Objectifs pédagogiques

L'objectif de cette semaine est un rappel de ce qu'on a vu l'année passée dans la ressource R213. De plus nous verrons comment utiliser les types avec TypeScript pour éviter les erreurs en runtime.

### Étape 1 : Installation et configuration

1. **Initialiser le projet Astro**
   ```bash
   npm create astro@latest r312-td
   cd r312-td
   ```

2. **Installer les dépendances**
   ```bash
   npm install pocketbase
   ```

### Étape 2 : Configuration de la base de données si vous ne trouver pas celle faite en S2

1. **Créer la collection `maison`** avec les champs suivants :
   - `nomMaison` (text) - Nom de la propriété
   - `adresse` (text) - Adresse complète
   - `prix` (number) - Prix en euros
   - `surface` (number) - Surface en m²
   - `nbChambres` (number) - Nombre de chambres
   - `nbSdb` (number) - Nombre de salles de bain
   - `image` (file) - Photo de la propriété
   - `favori` (bool) - Marquer comme favori

2. **Générer les types TypeScript**
   ```bash
   npx pocketbase-typegen --url https://votre-instance.pockethost.io/ --email votre-email --password votre-mot-de-passe --out src/utils/pocketbase-types.ts
   ```

### Étape 3 : Configuration de la connexion

Créer le fichier `src/utils/db.ts` :
```typescript
import PocketBase from 'pocketbase';
import type { TypedPocketBase } from "./pocketbase-types";

const pb = new PocketBase('URL') as TypedPocketBase;
export default pb;
```
En utilisant `TypedPocketBase`, nous tirons parti des types générés automatiquement via `pocketbase-typegen`. Cela nous offre l'autocomplétion et un typage strict pour toutes les collections et tous les champs définis dans la base de donnée. L'avantage principal est une réduction significative des erreurs lors de l'accès aux données, un problème fréquemment rencontré en S2.


##  Développement de l'application

### Partie A : Page d'accueil (index.astro)

**Objectif** : Afficher la liste des maisons disponibles dans la page

1. **Récupération des données**
   - Importer PocketBase depuis `../utils/pb`
   - Utiliser `pb.collection(Collection.Maison).getFullList()` pour récupérer toutes les maisons
   - Trier par date de création décroissante

```typescript
---
// le frontmatter de index.astro
import { Collections } from '../../pocketbase-types';
import Card from '../components/Card.astro';
import Layout from '../layouts/Layout.astro';
import pb  from '../utils/pb';

let listMaisons = await pb.collection(Collections.Maison).getFullList({
	sort: '-created',
});
console.log(listMaisons);
---
```

- Assurez-vous que la liste des offres est affichée dans la console.

2. **Affichage des données**
   - Créer un composant `Card.astro` pour afficher chaque maison
   - Utiliser la méthode `map()` pour parcourir la liste

```html
	<a href="/add" ><button>Ajouter une Offre</button></a>
	{???.map((???) => (
		<Card maison={maison} />
	))}
```


### Partie B : Composant Card (CardOffre.astro)

**Objectif** : Créer un composant réutilisable pour afficher une maison

1. **Props et types**
   - Définir l'interface `Props` avec `maison: MaisonRecord`
   - Importer le type `MaisonRecord` depuis les types générés
  

```typescript
---
// frontmatter de CardOffre.astro
// Import du type MaisonRecord généré automatiquement depuis PocketBase
// Ce type contient tous les champs de la collection 'maison' avec leurs types corrects
import type { MaisonRecord } from '../utils/pocketbase-types';
// Définition de l'interface Props pour typer les propriétés passées au composant
// Cela permet l'autocomplétion et la vérification de type au moment de la compilation
interface Props {
    maison: MaisonRecord; // La propriété maison doit être de type MaisonRecord
} 
// Extraction de la propriété maison depuis les props du composant Astro
const { maison } = Astro.props;
---
```

- Afficher les informations d'une maison:

```html
<div>
    <h2>{maison.nomMaison}</h2>
    <p>{maison.adresse}</p>
    ...
</div>
```

### Partie C : Composant d'image PocketBase (PbImage.astro)

**Objectif** : Afficher les images stockées dans PocketBase dans un composant réutilisable.

1. **Créer le composant `PbImage.astro`**
    - Ce composant reçoit comme propriétés les paramètres utilisés par la fonction `pb.files.getURL()`
    - Il génère l'URL complète de l'image stockée dans PocketBase
    - Utilise ensuite le composant `Image` d'Astro pour l'afficher de manière optimisée

2. **Props du composant**
    - `record` : L'enregistrement de la base de données contenant l'image
    - `imageField` : Le nom du champ qui contient le fichier image

```typescript
---
// Import de PocketBase pour accéder aux méthodes de gestion des fichiers
import pb from '../utils/pb';
// Import du composant Image d'Astro pour l'optimisation automatique des images
import { Image } from "astro:assets";

interface Props {
    record: { [key: string]: any }; // L'enregistrement PocketBase contenant l'image
    imageField: string; // Le nom de champ de la collection qui contient l'image
} 

// Récupération des propriétés passées au composant
const { record, imageField } = Astro.props;

// Génération de l'URL complète de l'image en utilisant PocketBase
// pb.files.getURL() prend l'enregistrement et le nom du fichier pour créer l'URL
const imageURL = pb.files.getURL(record, record[imageField]);
---

<!-- Affichage de l'image avec le composant Image d'Astro -->
<!-- inferSize={true} permet à Astro de détecter automatiquement les dimensions -->
{imageURL && 
    <Image
        src={imageURL}
        alt={record.nomMaison || 'Image'}
        inferSize={true}
    />
}
```

3. **Utilisation dans Card.astro**
```html
<!-- Remplacer <img> par le composant PbImage -->
<PbImage record={maison} imageField="image" />
```

### Si vous avez du temps : Ajouter un formulaire d'ajout

Si le temps le permet, implémentez un formulaire pour ajouter une nouvelle maison à la base de données. Vous pouvez vous inspirer du cours R213 ou consulter la documentation officielle d'Astro sur les formulaires : [Astro Forms Recipe](https://docs.astro.build/en/recipes/build-forms/).

**Instructions importantes :**
- Désactivez le prerendering sur la page d'ajout (voir [On-Demand Rendering](https://docs.astro.build/en/guides/on-demand-rendering/)).
- Utilisez l'attribut `enctype="multipart/form-data"` dans la balise `<form>` pour permettre l'upload de fichiers (images).
- Effectuez toujours la validation des données côté serveur pour garantir la sécurité et l'intégrité des données.

