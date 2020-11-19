// Récupération de notre container dans le DOM :

let container = document.getElementById('produits-grid');

// Création de la requête AJAX pour récupérer les données dans l'API :

ajaxGet('http://localhost:3000/api/teddies', function(reponse)
{
	// Conversion des données reçuent en chaine de caractère :

	let listeProduits = JSON.parse(reponse);

	listeProduits.forEach(function(produit)
	{
		let newProduit = new Produit
		(
			produit.colors,
			produit._id,
			produit.name,
			produit.price,
			produit.imageUrl,
			produit.description
		);

		newProduit.listProduitCreation();

	});

});