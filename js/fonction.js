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


