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

// Paramétrage des variables de contrôles avec des regex :

var regexNomPrenomVille = /^[A-Za-z-áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠúÚûÛùÙüÜýÝÿŸ]+$/;
var regexAdresse = /^[0-9]+\s*[A-Za-z]*\s[A-Za-z]+\s[A-Za-z0-9\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]+$/;
var regexCp = /[0-9]{5}/;
var regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Création de la fonction globale qui servira à effectuer les tests :

function verificationForm(regex, inputValue, errorMessage)
{
	inputValue.addEventListener('input', function(e)
	{

		if(regex.test(e.target.value) === true)
		{
			inputValue.classList = 'greenBorder';
			errorMessage.textContent = ' ✔';
			errorMessage.style.color = 'green';
		}

		else
		{
			inputValue.classList = 'redBorder';
			errorMessage.textContent = ' ✗';
			errorMessage.style.color = 'red';
		}

	});
}

// Mise en application de notre fonction de test :

verificationForm(regexNomPrenomVille, prenom, errorPrenom);
verificationForm(regexNomPrenomVille, nom, errorNom);
verificationForm(regexAdresse, adresse, errorAdresse);
verificationForm(regexCp, cp, errorCp);
verificationForm(regexMail, mail, errorMail);
verificationForm(regexNomPrenomVille, ville, errorVille);










