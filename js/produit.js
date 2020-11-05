// Récupération de l'id envoyé dans l'URL :

var urlGet = location.search;

// Vérification de sa correspondance et extraction du chiffre 
//qui suit le symbole d'égalité :

var regex = /^(\?id=)(\d+)$/;
var result = urlGet.match(regex);
var id = result[2];

// // Récupération de notre container dans le DOM :

var containerProduit = document.getElementById('produit')

// Création de la requête AJAX pour récupérer les données dans l'API :

ajaxGet('http://localhost:3000/api/teddies', function(reponse)
{
	// Conversion des données reçuent en chaine de caractère :

	var listeProduits = JSON.parse(reponse);

	// Sélection du produit que nous souhaitons afficher

	var selectProduit = listeProduits[id];
	console.log(selectProduit);

	// Création du bloc produit :

	// Création de l'élément titre :
	var nomProduit = document.createElement('h1');
	nomProduit.textContent = selectProduit.name;

	// Création de l'élément IMG :
	var imgProduit = document.createElement('img');
	imgProduit.src = selectProduit.imageUrl;

	// Création de l'élément description :
	var descriptionProduit = document.createElement('p');
	descriptionProduit.textContent = selectProduit.description;

	// Création de l'élément prix :
	var prixProduit = document.createElement('p');
	prixProduit.textContent = selectProduit.price;





});