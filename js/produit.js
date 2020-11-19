// Récupération de l'id envoyé dans l'URL :

let searchId = (new URL(document.location)).searchParams;
let id = searchId.get('id');

// Création des variables de notre produit :

let couleurChoisie;
let prixChoisie;
let nomChoisie;

// Création de la requête Fetch pour récupérer les données dans l'API :

let url = 'http://localhost:3000/api/teddies/' + id;

fetch(url)
.then (response => 
	{
		// Vérification si la réponse demandée existe :

		if(response.ok)
		{
			response.json()

			.then (response => 
			{	

				// Création d'une nouvelle instance de la classe Produit :
				let newProduit = new Produit
				(
					response.colors,
					response._id,
					response.name,
					response.price,
					response.imageUrl,
					response.description
				);

				// Application de la méthode produitCreation à l'instance crée :
				newProduit.produitCreation();

				let couleurProduit = document.getElementsByTagName('select')[0];

				// Mise à jour de nos variables en fonction du produit chargé :

				couleurChoisie = couleurProduit.value;
				nomChoisie = response.name;
				prixChoisie = response.price;
			})

			.then (response => 
			{
				// On écoute les changements de la valeur de personnalisation de couleur :

				let couleurProduit = document.getElementsByTagName('select')[0];

				couleurProduit.addEventListener('change', function(e)
				{
					couleurChoisie = e.target.value;
				});

			})

		// On écoute les click sur le bouton “Ajouter au panier“ :

			.then (response => 
			{
				let formElt = document.getElementsByTagName('form')[0];
				let couleurProduit = document.getElementsByTagName('select')[0];
				
				formElt.addEventListener('submit', function(e)
				{
					e.preventDefault();

					// Selection du produit concerné : 

					let currentProduit = id + couleurChoisie;

					let quantite;
					let panierQuantite;

					/* Vérification du bon fonctionnement du local storage 
					(voir la fonction dans fonction.js) : */

					if(storageAvailable('localStorage'))
					{
						// Ajout d'un élément si l'élément n'existe pas encore :

						if(!localStorage.getItem(currentProduit))
						{
							quantite = 1;
						}

						// Sinon on ajoute 1 à sa quantité :

						else
						{
							currentArticle = localStorage.getItem(currentProduit);
							let currentQuantite = JSON.parse(currentArticle);
							quantite = currentQuantite.quantite + 1;
						}

						// Ajout d'un élément au panier si il est vide :

						if(!localStorage.getItem('panier'))
						{
							panierQuantite = 1;
						}

						// Sinon on prend la valeur actuel et on lui ajoute 1 :

						else
						{
							panier = localStorage.getItem('panier');
							panierResult = JSON.parse(panier);
							panierQuantite = panierResult + 1;
						}

						// Création de l'objet à envoyer :

						let envoiPanier = 
						{
							id: id,
							nom: nomChoisie,
							couleur: couleurChoisie,
							prix: prixChoisie,
							quantite: quantite 
						}

						// Envoi des données au local storage : 

						localStorage.setItem(currentProduit, JSON.stringify(envoiPanier));
						localStorage.setItem('panier', panierQuantite);

						// Mise à jour du numéro inscrit dans l'icone du panier :

						let panierLabelNumber = localStorage.getItem('panier');
						majPanier(panierLabelNumber);
					}

					else
					{
						let error = document.getElementById('errorElt');
						error.textContent = 'Oups panier indisponible !';
						error.style.color = 'red';
					}
				});
			})
		}

		// Si la réponse n'existe pas alors on affiche un message d'erreur :

		else
		{
			let err = document.createElement('p');
			err.textContent = 'La ressource demandée n\'existe pas !';
			err.style.color = 'red';
			err.style.fontSize = '1.5em';
			err.style.textAlign = 'center';

			document.getElementById('produit').appendChild(err);
		}
	})











