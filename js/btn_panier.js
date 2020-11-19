// On interroge le local storage pour connaitre le nombre d'article présent dans le panier : 

let panierLabelNumber = localStorage.getItem('panier');

// On utilise la fonction de mise à jour du panier :

majPanier(panierLabelNumber);
