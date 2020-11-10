// On interroge le local storage pour connaitre le nombre d'article présent dans le panier : 

var panierLabelNumber = localStorage.getItem('panier');

if(!panierLabelNumber)
{
	var panierLabel = document.getElementsByClassName('panier-text')[0];
	panierLabel.textContent = 0;
}

else
{
	var panierLabel = document.getElementsByClassName('panier-text')[0];
	panierLabel.textContent = panierLabelNumber;
}
