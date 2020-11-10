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

	// Ajout des éléments à la page HTML :
	containerProduit.appendChild(nomProduit);
	containerProduit.appendChild(imgProduit);
	containerProduit.appendChild(descriptionProduit);
	containerProduit.appendChild(prixProduit);
	containerProduit.appendChild(formElt);

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

		// On vérifie si l'article n'est pas déjà dans le panier :

		var panierActuel = localStorage.getItem(id + couleurChoisie);

		if(JSON.parse(panierActuel) != null)
		{
			var quantite = JSON.parse(panierActuel).quantite + 1;
		}

		else
		{
			var quantite = 1;
		} 

		var ajoutPanier = 
		{
			id: id,
			nom: nomChoisie,
			prix: prixChoisie,
			personnalisation: couleurChoisie,
			quantite: quantite
		};
		
		var commande_json = JSON.stringify(ajoutPanier);
		localStorage.setItem(id + couleurChoisie, commande_json);
	});
});

var panier = window.localStorage;

console.log(panier.length);









