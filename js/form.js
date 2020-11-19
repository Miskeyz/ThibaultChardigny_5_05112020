// Vérification des données saisies dans le formulaire :

// Récupération des différents champs à contrôler : 

var form = document.getElementsByTagName('form')[0];

var prenom = document.getElementById('prenom');
var errorPrenom = document.getElementById('errorPrenom');

var adresse = document.getElementById('adresse');
var errorAdresse = document.getElementById('errorAdresse');

var cp = document.getElementById('cp');
var errorCp = document.getElementById('errorCp');

var ville = document.getElementById('ville');
var errorVille = document.getElementById('errorVille');

var mail = document.getElementById('mail');
var errorMail = document.getElementById('errorMail');

let submitElt = document.getElementById('envoyer');

let validate = false;

// Paramétrage des variables de contrôles avec des regex :

let regexNomPrenomVille = /^[A-Za-z-áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠúÚûÛùÙüÜýÝÿŸ]+$/;
let regexAdresse = /^[0-9]+\s*[A-Za-z]*\s[A-Za-z]+\s[A-Za-z0-9\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]+$/;
let regexCp = /[0-9]{5}/;
let regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Mise en application de notre fonction de test :

verificationForm(regexNomPrenomVille, prenom, errorPrenom);
verificationForm(regexNomPrenomVille, nom, errorNom);
verificationForm(regexAdresse, adresse, errorAdresse);
verificationForm(regexCp, cp, errorCp);
verificationForm(regexMail, mail, errorMail);
verificationForm(regexNomPrenomVille, ville, errorVille);

// Vérification que tous les champs du formulaire sont valide :

form.addEventListener('input', function()
{
	let errorSearch = document.getElementsByClassName('greenBorder');

	// Si c'est bien le cas on réactive le bouton pour envoyer :
	if(errorSearch.length === 6)
	{
		submitElt.removeAttribute('disabled');
	}


	// Sinon le bouton reste inactif :
	else
	{
		submitElt.setAttribute('disabled', 'true')
	}
});











