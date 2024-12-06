# Webstore api documentation
## Modeles
## Modèle Item
Le modèle Item représente les articles disponibles dans la boutique en ligne. Il inclut des informations telles que le nom, le prix, la description, les quantités disponibles, ainsi que des images pour différentes perspectives.
### Attributs
			Attribut
			Type
			Contraintes
			id
			INTEGER
			Clé primaire, incrémentation automatique.
			name
			STRING
			Non nul, ne doit pas être vide. Validation : notNull, notEmpty.
			price
			FLOAT
			Non nul, ne doit pas être vide, doit être un nombre valide, supérieur ou égal à 0.
			description
			TEXT
			Non nulle, ne doit pas être vide.
			quantity
			INTEGER
			Non nulle, ne doit pas être vide.
			category
			STRING
			Non nulle.
			subcategory
			STRING
			Non nulle.
			matricule
			STRING
			Non nul, ne doit pas être vide. Validation : notNull, notEmpty. Peut être unique.
			front_pic
			BLOB (long)
			Optionnel.
			back_pic
			BLOB (long)
			Optionnel.
			left_pic
			BLOB (long)
			Optionnel.
			right_pic
			BLOB (long)
			Optionnel.
			up_pic
			BLOB (long)
			Optionnel.
			down_pic
			BLOB (long)
			Optionnel.
### Configurations
- Timestamps : Activés ( createdAt → created, updatedAt → update).
### Validations Personnalisées
- Le prix doit être supérieur ou égal à 0.
- Les champs name, price, description, et matricule ne doivent ni être null ni vides.
## Modèle User
Le modèle User représente les utilisateurs enregistrés dans l'application. Il inclut des informations personnelles telles que le prénom, le nom, l'email, le nom d'utilisateur, ainsi que des fonctionnalités comme un panier et une photo de profil.
### Attributs
			Attribut
			Type
			Contraintes
			id
			INTEGER
			Clé primaire, incrémentation automatique.
			firstname
			STRING
			Optionnel.
			lastname
			STRING
			Optionnel.
			username
			STRING
			Optionnel, unique. Validation : unique.
			email
			STRING
			Optionnel, unique. Validation : unique.
			password
			STRING
			Optionnel.
			cart
			STRING
			Optionnel. Permet de stocker les références aux articles du panier.
			picture
			BLOB (long)
			Optionnel. Contient l'image de profil de l'utilisateur.
### Configurations
- Timestamps : Désactivés.
- Contraintes uniques : Les champs username et email doivent être uniques.
### Validations Personnalisées
- Le username et l'email doivent être uniques, avec un message d'erreur clair si la contrainte n'est pas respectée.
## Routes
### Base URL : http://localhost:3000
#### 1. Gestion des Articles
#### Ajouter un article
- Endpoint : POST /api/add-item
- Description : Ajouter un nouvel article dans la boutique.
- Exemple de corps de requête :
	```{
  "name": "PlayStation 5",
  "price": 499.99,
  "description": "La dernière console de Sony avec des graphismes de nouvelle génération.",
  "quantity": 100,
  "category": "Console",
  "subcategory": "ps5",
  "matricule": "PS5-001",
  "front_pic": null,
  "back_pic": null,
  "left_pic": null,
  "right_pic": null,
  "up_pic": null,
  "down_pic": null
}

```
- Headers :
	- Content-Type: application/json
#### Récupérer tous les articles
- Endpoint : GET /api/get-all-items/:limit/:sortField/:sortOrder
- Description : Obtenir une liste de tous les articles avec une pagination et un tri.
- Paramètres d'URL :
	- limit : Nombre maximum d'articles à retourner.
	- sortField : Champ de tri (par exemple, id).
	- sortOrder : Ordre de tri ( asc ou desc).
#### Récupérer un article par ID
- Endpoint : GET /api/get-item/:id
- Description : Récupérer les détails d'un article spécifique.
- Paramètres d'URL :
	- id : Identifiant unique de l'article.
#### Récupérer des articles par paramètres
- Endpoint : GET /api/get-items/category/:category/:limit
- Description : Filtrer les articles par catégorie.
- Paramètres d'URL :
	- category : Nom de la catégorie.
	- limit : Limite des articles à retourner.
#### Mettre à jour un article
- Endpoint : PUT /api/update-item/:id
- Description : Mettre à jour les informations textuelles d'un article.
- Exemple de corps de requête :
	```{
  "name": "Xbox Series S",
  "price": 399.99,
  "description": "La console next-gen de Microsoft plus accessible.",
  "quantity": 100,
  "category": "Console",
  "subcategory": "xboxseries",
  "matricule": "XSS-001",
  "front_pic": null,
  "back_pic": null,
  "left_pic": null,
  "right_pic": null,
  "up_pic": null,
  "down_pic": null
}

```
- Headers :
	- Content-Type: application/json
#### Supprimer un article
- Endpoint : DELETE /api/remove-item/:id
- Description : Supprimer un article spécifique.
- Paramètres d'URL :
	- id : Identifiant unique de l'article.
#### 2. Gestion des Images d'Articles
#### Récupérer les images d'un article
- Endpoints :
	- GET /api/get-item/:id/front_pic
	- GET /api/get-item/:id/back_pic
	- GET /api/get-item/:id/left_pic
	- GET /api/get-item/:id/right_pic
	- GET /api/get-item/:id/up_pic
	- GET /api/get-item/:id/down_pic
- Description : Récupérer une image spécifique d'un article.
- Paramètres d'URL :
	- id : Identifiant unique de l'article.
#### Mettre à jour les images d'un article
- Endpoints :
	- PUT /api/update-item/:id/front_pic
	- PUT /api/update-item/:id/back_pic
	- PUT /api/update-item/:id/left_pic
	- PUT /api/update-item/:id/right_pic
	- PUT /api/update-item/:id/up_pic
	- PUT /api/update-item/:id/down_pic
- Description : Mettre à jour une image spécifique d'un article.
- Headers :
	- Content-Type: multipart/form-data
#### 3. Gestion des Utilisateurs
#### Créer un utilisateur
- Endpoint : POST /api/add-user
- Description : Ajouter un nouvel utilisateur.
- Exemple de corps de requête :
	```{
  "firstname": "Emma",
  "username": "Lizeth.Miller",
  "email": "Emma3@yahoo.com",
  "password": "eKei67e65UVwQB9"
}

```
- Headers :
	- Content-Type: application/json
#### Connexion d'un utilisateur
- Endpoint : POST /api/user-login
- Description : Authentifier un utilisateur.
- Exemple de corps de requête :
	```{
  "username": "Lizeth.Miller",
  "password": "eKei67e65UVwQB9"
}

```
#### Récupérer tous les utilisateurs
- Endpoint : GET /api/get-users
- Description : Obtenir la liste de tous les utilisateurs.
#### Mettre à jour un utilisateur
- Endpoint : PUT /api/update-user/:username
- Description : Mettre à jour les informations d'un utilisateur.
#### Récupérer un utilisateur par paramètre
- Endpoint : GET /api/get-user/:parameter/:value
- Description : Obtenir un utilisateur en fonction de paramètres (exemple : email).
#### Gestion du panier utilisateur
- Endpoints :
	- GET /api/get-user-cart/:username : Récupérer le panier d'un utilisateur.
#### Gestion des images de profil
- Endpoints :
	- PUT /api/update-user-picture/:username : Mettre à jour la photo de profil d'un utilisateur.
	- GET /api/get-user-picture/:username : Récupérer la photo de profil.
	- DELETE /api/remove-user-picture/:username : Supprimer la photo de profil.
#### Supprimer un utilisateur
- Endpoint : DELETE /api/remove-user/:username
- Description : Supprimer un utilisateur spécifique.
Si vous souhaitez une mise en forme ou un regroupement spécifique, faites-le moi savoir !