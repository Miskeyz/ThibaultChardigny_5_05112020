// Récupération de notre container dans le DOM :

var container = document.getElementById('produits-grid');

// Création de la requête AJAX pour récupérer les données dans l'API :

ajaxGet('http://localhost:3000/api/teddies', function(reponse)
{
	// Conversion des données reçuent en chaine de caractère :

	var listeProduits = JSON.parse(reponse);

	// Création du bloc produit :

	for (var i = 0; i < listeProduits.length; i++)
		{
			// Création d'un élément IMG :
			var imgElt = document.createElement('img');
			imgElt.src = listeProduits[i].imageUrl;
			imgElt.classList = 'produits-card__img rounded-top w-100';

			// Création du nom du produit dans une balise h2:
			var nomElt = document.createElement('h2');
			nomElt.textContent = listeProduits[i].name;
			nomElt.classList = 'produits-card__heading pl-3 pt-3 mb-0';

			//Création du prix dans un élément p :
			var priceElt = document.createElement('p');
			priceElt.textContent = (listeProduits[i].price / 100) + ' €';
			priceElt.classList = 'produits-card__prix pl-3';

			// Création de la carte clickable du produit :
			var cardElt = document.createElement('a');
			cardElt.classList = 'card produits-card col-4 p-0 rounded'
			cardElt.href = 'produit.html?id=' + listeProduits[i]._id;


			// Création du contenu de la carte :
			var cardBodyElt = document.createElement('div');
			cardBodyElt.classList = 'card-body p-0 produits-card__body';

			// Ajout de l'image, du nom et du prix au contenu de la carte :
			cardBodyElt.appendChild(imgElt);
			cardBodyElt.appendChild(nomElt);
			cardBodyElt.appendChild(priceElt);

			// Ajout du contenu à la carte clickable :
			cardElt.appendChild(cardBodyElt);

			// Ajout de la carte clickable au container du DOM :
			container.appendChild(cardElt);

		};
});