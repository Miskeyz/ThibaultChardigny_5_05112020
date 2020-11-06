// Récupération de l'id envoyé dans l'URL :

var urlGet = location.search;

// Vérification de sa correspondance et extraction du chiffre 
//qui suit le symbole d'égalité :

var regex = /^(\?id=)(((\d*)([a-z]*))*)$/;
var result = urlGet.match(regex);
var id = result[2];

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

	// Création du formulaire pour le choix de couleur et la commande :
	var formElt = document.createElement('form');
	formElt.classList = 'produit__form';

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
});