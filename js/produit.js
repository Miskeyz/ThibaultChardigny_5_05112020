// Récupération de l'id envoyé dans l'URL :

var searchId = (new URL(document.location)).searchParams;
let id = searchId.get('id');

// // Récupération de notre container dans le DOM :

var containerProduit = document.getElementById('produit');

// Création de la requête AJAX pour récupérer les données dans l'API :

ajaxGet('http://localhost:3000/api/teddies/' + id, function(reponse)
{
	// Conversion des données reçuent en chaine de caractère :

	var infosProduit = JSON.parse(reponse);

	// Création du bloc produit :

	// Création de l'élément titre :
	var nomProduit = document.createElement('h1');
	nomProduit.textContent = infosProduit.name;
	nomProduit.classList = 'produit__heading';

	// Création de l'élément IMG :
	var imgProduit = document.createElement('img');
	imgProduit.src = infosProduit.imageUrl;
	imgProduit.classList = 'produit__img';

	// Création de l'élément description :
	var descriptionProduit = document.createElement('p');
	descriptionProduit.textContent = infosProduit.description;
	descriptionProduit.classList = 'produit__txt';

	// Création de l'élément prix :
	var prixProduit = document.createElement('p');
	prixProduit.textContent = (infosProduit.price / 100) + ' €';
	prixProduit.classList = 'produit__prix';

	// Remplissage du formulaire pour le choix de couleur et la commande :
	var formElt = document.createElement('form');
	formElt.classList = 'produit__form';
	formElt.id = 'produit__form';

	// Création de l'élément select pour le choix de la couleur :
	var couleurProduit = document.createElement('select');
	var couleurs = infosProduit.colors;

	// Création des options :
	couleurs.forEach(function(couleur)
	{
		var couleurOption = document.createElement('option');
		couleurOption.setAttribute = couleur;
		couleurOption.textContent = couleur;
		couleurProduit.appendChild(couleurOption);
	});

	// Création du bouton pour ajouter au panier :

	var submitElt = document.createElement('input');
	submitElt.type = 'submit';
	submitElt.value = 'Ajouter au panier';
	submitElt.classList = 'produit__submit';

	// Ajout du menu déroulant et du bouton au formulaire :

	formElt.appendChild(couleurProduit);
	formElt.appendChild(document.createElement('br'));
	formElt.appendChild(submitElt);

	// Ajout d'un élément pour afficher les messages d'erreurs :

	var errorElt = document.createElement('p');
	errorElt.id = 'errorElt';

	// Ajout des éléments à la page HTML :
	containerProduit.appendChild(nomProduit);
	containerProduit.appendChild(imgProduit);
	containerProduit.appendChild(descriptionProduit);
	containerProduit.appendChild(prixProduit);
	containerProduit.appendChild(formElt);
	containerProduit.appendChild(errorElt);

	// Envoi du produit selectionné au panier :

	var couleurChoisie = couleurProduit.value;
	var nomChoisie = infosProduit.name;
	var prixChoisie = infosProduit.price;

	// On écoute les changements de la valeur de personnalisation de couleur :

	couleurProduit.addEventListener('change', function(e)
	{
		couleurChoisie = e.target.value;
	});

	// On écoute les click sur le bouton “Ajouter au panier“ :

	formElt.addEventListener('submit', function(e)
	{
		e.preventDefault();

		// Selection du produit concerné : 

		var currentProduit = id + couleurChoisie;
		var quantite;
		var panierQuantite;

		// Vérification du bon fonctionnement du local storage :

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
				var currentQuantite = JSON.parse(currentArticle);
				quantite = currentQuantite.quantite + 1;
			}

			// Ajout d'un élément au panier :

			if(!localStorage.getItem('panier'))
			{
				panierQuantite = 1;
			}

			else
			{
				panier = localStorage.getItem('panier');
				panierResult = JSON.parse(panier);
				panierQuantite = panierResult + 1;
			}

			// Création de l'objet à envoyer :

			var envoiPanier = 
			{
				id: id,
				nom: infosProduit.name,
				couleur: couleurChoisie,
				prix: infosProduit.price,
				quantite: quantite 
			}

			// Envoi des données au local storage : 

			localStorage.setItem(currentProduit, JSON.stringify(envoiPanier));
			localStorage.setItem('panier', panierQuantite);

			// Mise à jour du numéro inscrit dans l'icone du panier :

			var panierLabelNumber = localStorage.getItem('panier');
			var panierLabel = document.getElementsByClassName('panier-text')[0];
			panierLabel.textContent = panierLabelNumber;
		}

		else
		{
			var error = document.getElementById('errorElt');
			error.textContent = 'Oups panier indisponible !';
			error.style.color = 'red';
		}
	});
});










