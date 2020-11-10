var containerElt = document.getElementsByClassName('commande')[0];

ajaxGet('http://localhost:3000/api/teddies', function(reponse)
{
	var listeProduits = JSON.parse(reponse);
	var prixTotal = 0;

	listeProduits.forEach(function(produit)
	{
		produitId = produit._id;
		listeCouleurs = produit.colors;

		listeCouleurs.forEach(function(couleur)
		{
			var currentProduit = produitId + couleur;

			if(!localStorage.getItem(currentProduit))
			{
				produitQuantite = 0;
			}

			else
			{
				var produit = localStorage.getItem(currentProduit);
				var currentArticle = JSON.parse(produit);
				var produitNom = currentArticle.nom;
				var produitPrix = currentArticle.prix;
				var produitQuantite = currentArticle.quantite;
				var produitTotal = (produitPrix * produitQuantite) / 100;
				var produitCouleur = currentArticle.couleur;

				var nomElt = document.createElement('h2');
				nomElt.textContent = produitNom;

				var prixElt = document.createElement('p');
				prixElt.textContent = 'Prix : ' + produitPrix / 100 + ' €';

				var quantiteElt = document.createElement('span');
				quantiteElt.textContent = 'Quantité : ' + produitQuantite;

				var couleurElt = document.createElement('span');
				couleurElt.textContent = 'Couleur : ' + produitCouleur;

				var totalProduitElt = document.createElement('div');
				totalProduitElt.textContent = 'Total produit : ' + produitTotal + ' €';

				var boutonElt = document.createElement('button');
				boutonElt.textContent = 'Retirer du panier';
				boutonElt.classList = 'bouton-panier';

				totalProduitElt.appendChild(document.createElement('br'));
				totalProduitElt.appendChild(boutonElt);

				var lineElt = document.createElement('div');
				lineElt.classList = 'ligne';

				var blocLeftElt = document.createElement('div');
				
				blocLeftElt.appendChild(nomElt);
				blocLeftElt.appendChild(prixElt);
				blocLeftElt.appendChild(quantiteElt);
				blocLeftElt.appendChild(couleurElt);

				lineElt.appendChild(blocLeftElt);
				lineElt.appendChild(totalProduitElt);

				
				containerElt.appendChild(lineElt);

				prixTotal += produitTotal;	

				boutonElt.addEventListener('click', function(e)
				{
					var panierLabelNumber = localStorage.getItem('panier');
					panierLabelNumber -= produitQuantite;
					localStorage.setItem('panier', panierLabelNumber);
					panierLabelNumber = localStorage.getItem('panier');
					var panierLabel = document.getElementsByClassName('panier-text')[0];
					panierLabel.textContent = panierLabelNumber;

					localStorage.removeItem(currentProduit);
					lineElt.remove();

					prixTotal -= produitTotal;
					prixTotalElt.textContent = 'Total : ' + prixTotal + ' €';

				});

							
			}
		});

	});

	var prixTotalElt = document.createElement('h3');
	prixTotalElt.textContent = 'Total : ' + prixTotal + ' €';
	prixTotalElt.id = 'prix-total';
	containerElt.appendChild(prixTotalElt);


});