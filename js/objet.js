// Constructor de la class Produit :

class Produit 
{
	constructor(colors, id, nom, prix, imageUrl, description)
	{
		this.colors = colors;
		this.id = id;
		this.nom = nom;
		this.prix = prix;
		this.imageUrl = imageUrl;
		this.description = description;
	}

	// Deux méthodes de la class Produit pour remplir nos pages HTML :

	listProduitCreation()
	{
		// Création des cartes des produits pour la page index :

		// Création d'un élément IMG :
		let imgElt = document.createElement('img');
		imgElt.src = this.imageUrl;
		imgElt.classList = 'produits-card__img rounded-top w-100';

		// Création du nom du produit dans une balise h2:
		let nomElt = document.createElement('h2');
		nomElt.textContent = this.nom;
		nomElt.classList = 'produits-card__heading pl-3 pt-3 mb-0';

		//Création du prix dans un élément p :
		let priceElt = document.createElement('p');
		priceElt.textContent = (this.prix / 100) + ' €';
		priceElt.classList = 'produits-card__prix pl-3';

		// Création de la carte clickable du produit :
		let cardElt = document.createElement('a');
		cardElt.classList = 'card produits-card col-4 p-0 rounded'
		cardElt.href = 'produit.html?id=' + this.id;


		// Création du conteneur de la carte :
		let cardBodyElt = document.createElement('div');
		cardBodyElt.classList = 'card-body p-0 produits-card__body';

		// Ajout de l'image, du nom et du prix au contenu de la carte :
		cardBodyElt.appendChild(imgElt);
		cardBodyElt.appendChild(nomElt);
		cardBodyElt.appendChild(priceElt);

		// Ajout du contenu à la carte clickable :
		cardElt.appendChild(cardBodyElt);

		// Ajout de la carte clickable au container du DOM :
		container.appendChild(cardElt);
	}

	produitCreation()
	{
		// Création du bloc produit de la page produit :

		// Modification de la balise title de la page :
		document.title = this.nom + ' - Orinoco';

		// Récupération du container du DOM : 
		let containerProduit = document.getElementById('produit');

		// Création de l'élément titre :
		let nomProduit = document.createElement('h1');
		nomProduit.textContent = this.nom;
		nomProduit.classList = 'produit__heading';

		// Création de l'élément IMG :
		let imgProduit = document.createElement('img');
		imgProduit.src = this.imageUrl;
		imgProduit.classList = 'produit__img';

		// Création de l'élément description :
		let descriptionProduit = document.createElement('p');
		descriptionProduit.textContent = this.description;
		descriptionProduit.classList = 'produit__txt';

		// Création de l'élément prix :
		let prixProduit = document.createElement('p');
		prixProduit.textContent = (this.prix / 100) + ' €';
		prixProduit.classList = 'produit__prix';

		// Remplissage du formulaire pour le choix de couleur et la commande :
		let formElt = document.createElement('form');
		formElt.classList = 'produit__form';
		formElt.id = 'produit__form';

		// Création de l'élément select pour le choix de la couleur :
		let couleurProduit = document.createElement('select');
		let couleurs = this.colors;

		// Création des options :
		couleurs.forEach(function(couleur)
		{
			let couleurOption = document.createElement('option');
			couleurOption.setAttribute = couleur;
			couleurOption.textContent = couleur;
			couleurProduit.appendChild(couleurOption);
		});

		// Création du bouton pour ajouter au panier :

		let submitElt = document.createElement('input');
		submitElt.type = 'submit';
		submitElt.value = 'Ajouter au panier';
		submitElt.classList = 'produit__submit';

		// Ajout du menu déroulant et du bouton au formulaire :

		formElt.appendChild(couleurProduit);
		formElt.appendChild(document.createElement('br'));
		formElt.appendChild(submitElt);

		// Ajout d'un élément pour afficher les messages d'erreurs :

		let errorElt = document.createElement('p');
		errorElt.id = 'errorElt';

		// Ajout des éléments à la page HTML :
		containerProduit.appendChild(nomProduit);
		containerProduit.appendChild(imgProduit);
		containerProduit.appendChild(descriptionProduit);
		containerProduit.appendChild(prixProduit);
		containerProduit.appendChild(formElt);
		containerProduit.appendChild(errorElt);
	}
}



