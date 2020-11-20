
function ajaxGet(url, callback)
{
	let req = new XMLHttpRequest();
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

            let message = document.createElement('p');
            message.textContent = 'Désolé, cette ressource n\'existe pas !';
            let containerProduit = document.getElementById('produit');
            containerProduit.appendChild(message);
		}
	});

	req.addEventListener('error', function()
	{
		console.error('Erreur réseau avec l\'URL ' + url);
	});

	req.send(null);
}

// Fonction pour détecter que le localStorage est bien supporté par le navigateur et disponible :

function storageAvailable(type)
{
    try 
    {
        let storage = window[type],
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

// Fonction pour mettre à jour l'affichage du nombre d'article dans le panier : 

function majPanier(panier)
{
    if(!panier)
    {
        let panierLabel = document.getElementsByClassName('panier-text')[0];
        panierLabel.textContent = 0;
    }

    else
    {
        let panierLabel = document.getElementsByClassName('panier-text')[0];
        panierLabel.textContent = panier;
    }
}

// Création de la fonction globale qui servira à vérifier le bon formatage du formulaire :

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



