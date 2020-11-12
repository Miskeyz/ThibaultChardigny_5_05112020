var containerElt = document.getElementsByClassName('commande')[0];

var products = [];

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
				for(var i = 0; i < produitQuantite; i++)
				{
					products.push(currentArticle.id);
				}
				
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

				console.log(products);

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

					for (var i = 0; i <= products.length; i++)
					{
						if(products.includes(currentArticle.id))
						{
							var index = products.indexOf(currentArticle.id);
							products.splice(index, 1);
						}					
					}

				});						
			}
		});

	});

	var prixTotalElt = document.createElement('h3');
	prixTotalElt.textContent = 'Total : ' + prixTotal + ' €';
	prixTotalElt.id = 'prix-total';
	containerElt.appendChild(prixTotalElt);
});

function Commande(contact, products)
{
	this.contact = contact;
	this.products = products;
}

var submitForm = document.getElementById('envoyer');
var formElt = document.querySelector('form');
var formContainer = document.getElementById('form-container');

submitForm. addEventListener('click', function(e)
{
	e.preventDefault();

	var contact = 
	{
		firstName: document.getElementById('prenom').value,
		lastName: document.getElementById('nom').value,
		address: document.getElementById('adresse').value,
		city: document.getElementById('ville').value,
		email: document.getElementById('mail').value
	}

	var maCommande = new Commande(contact, products);
	var maCommandeJSON = JSON.stringify(maCommande);

	var options = 
	{
		method: 'POST',
		body: maCommandeJSON,
		headers: 
		{
			'Content-Type': 'application/json'
		}
	}

	var url = 'http://localhost:3000/api/teddies/order';

	if(window.fetch)
	{
		fetch(url, options)
		.then (response => response.json())
		.then(response => 
			{

				console.log(response);

				var prixCommande = 0;

				var prixArticlesCommande = response.products;
				prixArticlesCommande.forEach(function(article)
				{
					prixCommande += article.price;
				});

				formElt.remove();

				var confirmationElt = document.createElement('h2');
				confirmationElt.textContent = 'Confirmation !';
				confirmationElt.classList = 'confirmation__heading';

				var merciElt = document.createElement('h3');
				merciElt.textContent = 'Merci pour votre commande';
				merciElt.classList = 'confirmation__subheading';

				var totalElt = document.createElement('p');
				totalElt.textContent = 'Prix total : ' + prixCommande / 100 + ' €';
				totalElt.classList = 'confirmation__prix';

				var orderElt = document.createElement('p');
				orderElt.textContent = 'Numéro de commande : ' + response.orderId;
				orderElt.classList= 'confirmation__order';

				formContainer.appendChild(confirmationElt);
				formContainer.appendChild(merciElt);
				formContainer.appendChild(totalElt);
				formContainer.appendChild(orderElt);
			})
		.then (response => 
			{
				localStorage.clear();
			});

	}

	else
	{
		console.log('Requête fetch indisponible !');
	}
	
});

