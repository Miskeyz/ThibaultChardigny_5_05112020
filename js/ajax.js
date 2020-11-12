function ajaxGet(url, callback)
{
	var req = new XMLHttpRequest();
	req.open('GET', url);
	req.addEventListener('load', function()
	{
		if(req.status>= 200 && req.status < 400)
		{
			callback(req.responseText);
		}

		else
		{
			console.error(req.status + ' ' + req.statusText + ' ' + url);

            var message = document.createElement('p');
            message.textContent = 'Désolé, cette ressource n\'existe pas !';
            var containerProduit = document.getElementById('produit');
            containerProduit.appendChild(message);
		}
	});

	req.addEventListener('error', function()
	{
		console.error('Erreur réseau avec l\'URL ' + url);
	});

	req.send(null);
}

// Exécute un appel AJAX POST
// Prend en paramètres l'URL cible, la donnée à envoyer et la fonction callback appelée en cas de succès
// Le paramètre isJson permet d'indiquer si l'envoi concerne des données JSON

function ajaxPost(url, data, callback, isJson) 
{
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.addEventListener("load", function () 
    {
        if (req.status >= 200 && req.status < 400) 
        {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else 
        {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () 
    {
        console.error("Erreur réseau avec l'URL " + url);
    });
    if (isJson) 
    {
        // Définit le contenu de la requête comme étant du JSON
        req.setRequestHeader("Content-Type", "application/json");
        // Transforme la donnée du format JSON vers le format texte avant l'envoi
        data = JSON.stringify(data);
    }
    req.send(data);
}

// Fonction pour détecter que localeStorage est bien supporté par le navigateur et disponible :

function storageAvailable(type) 
{
    try 
    {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) 
    {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}


