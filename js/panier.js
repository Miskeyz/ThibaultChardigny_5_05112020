// Récupération du container dans lequel on affichera notre panier :

let containerElt = document.getElementsByClassName('commande')[0];

/* Création d'un array qui contiendra les id des différents 
produits une fois le panier chargé : */

let products = [];

/* Création d'une requête ajax pour scanner le local storage en fonction 
des id et couleurs (les clés créées dans le localstorage sont au format id + couleur)*/

ajaxGet('http://localhost:3000/api/teddies', function(reponse)
{
	let listeProduits = JSON.parse(reponse);
	let prixTotal = 0;

	// Pour chaque produit....

	listeProduits.forEach(function(produit)
	{
		produitId = produit._id;
		listeCouleurs = produit.colors;

		// Et chaque couleurs... 

		listeCouleurs.forEach(function(couleur)
		{
			let currentProduit = produitId + couleur;

			// On regarde si le produit existe dans le local storage :

			if(!localStorage.getItem(currentProduit))
			{
				produitQuantite = 0;
			}

			/* Si il existe, on l'affiche sous forme de carte dans le panier et
			on ajoute l'id produit concerné à l'array products plusieurs fois selon
			la quantité souhaitée : */

			else
			{
				let produit = localStorage.getItem(currentProduit);
				let currentArticle = JSON.parse(produit);
				let produitNom = currentArticle.nom;
				let produitPrix = currentArticle.prix;
				let produitQuantite = currentArticle.quantite;

				for(let i = 0; i < produitQuantite; i++)
				{
					products.push(currentArticle.id);
				}
				
				let produitTotal = (produitPrix * produitQuantite) / 100;
				let produitCouleur = currentArticle.couleur;

				let nomElt = document.createElement('h2');
				nomElt.textContent = produitNom;

				let prixElt = document.createElement('p');
				prixElt.textContent = 'Prix : ' + produitPrix / 100 + ' €';

				let quantiteElt = document.createElement('span');
				quantiteElt.textContent = 'Quantité : ' + produitQuantite;

				let couleurElt = document.createElement('span');
				couleurElt.textContent = 'Couleur : ' + produitCouleur;

				let totalProduitElt = document.createElement('div');
				totalProduitElt.textContent = 'Total produit : ' + produitTotal + ' €';

				let boutonElt = document.createElement('button');
				boutonElt.textContent = 'Retirer du panier';
				boutonElt.classList = 'bouton-panier';

				totalProduitElt.appendChild(document.createElement('br'));
				totalProduitElt.appendChild(boutonElt);

				let lineElt = document.createElement('div');
				lineElt.classList = 'ligne';

				let blocLeftElt = document.createElement('div');
				
				blocLeftElt.appendChild(nomElt);
				blocLeftElt.appendChild(prixElt);
				blocLeftElt.appendChild(quantiteElt);
				blocLeftElt.appendChild(couleurElt);

				lineElt.appendChild(blocLeftElt);
				lineElt.appendChild(totalProduitElt);

				
				containerElt.appendChild(lineElt);

				// Calcul du prix total par ajout du prix total par article :

				prixTotal += produitTotal;

				// On permet au client de retirer un produit du panier :	

				boutonElt.addEventListener('click', function(e)
				{
					// Requête au local storage :
					let panierLabelNumber = localStorage.getItem('panier');

					//Diminution de la quantité de produit :
					panierLabelNumber -= produitQuantite;

					// Mise à jour du local storage :
					localStorage.setItem('panier', panierLabelNumber);

					//Mise à jour de l'affichage du nombre d'article dans le panier :
					majPanier(panierLabelNumber);

					// Retrait du produit et de l'élément HTML :
					localStorage.removeItem(currentProduit);
					lineElt.remove();

					// Mise à jour du prix total du panier :
					prixTotal -= produitTotal;
					prixTotalElt.textContent = 'Total : ' + prixTotal + ' €';

					// Retrait des id des produits dans l'array products :
					let index = products.indexOf(currentArticle.id);
					products.splice(index, produitQuantite);									
				});						
			}
		});

	});

	// Affichage du prix total du panier :
	let prixTotalElt = document.createElement('h3');
	prixTotalElt.textContent = 'Total : ' + prixTotal + ' €';
	prixTotalElt.id = 'prix-total';
	containerElt.appendChild(prixTotalElt);

});

// Récupération des éléments du DOM à modifier :
let submitForm = document.getElementById('envoyer');
let formElt = document.querySelector('form');
let formContainer = document.getElementById('form-container');

// Écoute du formulaire pour l'envoi au serveur :

submitForm. addEventListener('click', function(e)
{
	e.preventDefault();

	// Vérification de l'existance d'au moins 1 produit dans le panier :

	if(products.length > 0)
	{
		// Création de l'objet “contact“ :

		let contact = 
		{
			firstName: document.getElementById('prenom').value,
			lastName: document.getElementById('nom').value,
			address: document.getElementById('adresse').value,
			city: document.getElementById('ville').value,
			email: document.getElementById('mail').value
		};

		// Création de l'objet commande :

		let maCommande = 
		{
			contact: contact, 
			products: products
		};

		// Mise au format JSON :

		let maCommandeJSON = JSON.stringify(maCommande);

		// Création des paramètres de notre futur requête fetch :

		let options = 
		{
			method: 'POST',
			body: maCommandeJSON,
			headers: 
			{
				'Content-Type': 'application/json'
			}
		}

		let url = 'http://localhost:3000/api/teddies/order';

		// Vérification du bon fonctionnenment de fetch :

		if(window.fetch)
		{

			// Envoi de la requête POST au serveur via fetch
			fetch(url, options)
			.then (response => response.json())

			// Affichage de la confirmation de la commande et du récapitulatif :
			.then(response => 
				{
					let prixCommande = 0;

					let prixArticlesCommande = response.products;

					prixArticlesCommande.forEach(function(article)
					{
						prixCommande += article.price;
					});

					formElt.remove();

					let confirmationElt = document.createElement('h2');
					confirmationElt.textContent = 'Confirmation !';
					confirmationElt.classList = 'confirmation__heading';

					let merciElt = document.createElement('h3');
					merciElt.textContent = 'Merci pour votre commande';
					merciElt.classList = 'confirmation__subheading';

					let totalElt = document.createElement('p');
					totalElt.textContent = 'Prix total : ' + prixCommande / 100 + ' €';
					totalElt.classList = 'confirmation__prix';

					let orderElt = document.createElement('p');
					orderElt.textContent = 'Numéro de commande : ' + response.orderId;
					orderElt.classList= 'confirmation__order';

					formContainer.appendChild(confirmationElt);
					formContainer.appendChild(merciElt);
					formContainer.appendChild(totalElt);
					formContainer.appendChild(orderElt);
				})

			// Clear du local storage :
			.then (response => 
				{
					localStorage.clear();
				});

		}

		else
		{
			console.log('Requête fetch indisponible !');
		}
	}

	else
	{
		alert('Le panier est vide, remplissez le avant de passer votre commande !')
	}
	
});

