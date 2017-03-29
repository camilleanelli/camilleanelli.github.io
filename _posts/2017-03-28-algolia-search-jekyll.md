---
layout: article
title: Ajouter Algolia search sur un thème jekyll
---

### Algolia et l'index ###

Lorsque les articles se multiplient sur un blog, il est utile d'ajouter une search bar afin que l'utilisateur puisse retrouver ces articles par mots clés. 
Je vais donc vous expliquer les différentes étapes que j'ai effectué pour installer une search Algolia dans mon projet jekyll.

1. Nous devons d'abord créer un compte [Algolia](https://www.algolia.com). Pour ma part j'ai pris le "community plan", le plan gratuit.

2. Ensuite nous allons suivre le tutorial de base pour mieux comprendre le fonctionnement du produit. Il est simple, facile et rapide à suivre.

3. Une fois ce tutorial complété, nous pouvons aller dans le dashboard, et créer un nouvel index. 
	L'index représente la base de donnée dans laquelle se trouvera le contenu des articles que l'on souhaite afficher dans le résultat de la search:

	![index](/images/blogAlgoliaSite.png)
	Cliquer sur le lien "indice" à gauche de l'écran.

	Cliquer sur "new index" en haut à droite de la page.
	![index](/images/index-alg.png)

### Indexation des données ###

Nous allons maintenent procéder à l'indexation des données : cela consiste à importer les données sur l'index que venons de créer.
Pour commencer nous allons consulter la page [github algoliasarch-jekyll](https://github.com/algolia/algoliasearch-jekyll)

1. S'il n'y a pas de gemfile dans notre projet, nous devons en créer un, puis ajouter la bonne version de jekyll, puis la gem Algolia search jekyll.

	{% gist camilleanelli/48c95a097446ff6dad1e0763a7563feb %}


	'bundle install'
	

2. Dans le config.yml, on ajoute également la gem - algoliasearch-jekyll

	{% gist camilleanelli/9282330e021abd7905b97c604f1c9379 %}

3. Pour vérifier si l'installation s'est correctement effectuée, on exécute la commande -jekyll help. Une liste des sous-commandes Algolia doit alors s'afficher.

	```
	jekyll help
	```

	Si ce n'est pas le cas, le problème vient peu être du faite qu'il manque des gem dans notre Gemfile.

4. Avant d'aller plus loin, nous devons donc ajouter des gem manquantes dans le gemfile:
	{% gist camilleanelli/958c7bb082e69af373fa75210d5293f0 %} 

	'bundle install'

5. Une fois ces configurations terminées , il faut maintenant ajouter dans le config.yml:

	Mon application_id, situé dans l'onglet "keys api" sur la gauche.

	Mon index_name, qui correspond au nom que nous donnons à l'index lors de sa création.

6. En ligne de commande, on peu maintenant executer l'import des données: 
	Sur mon compte Algolia, j'ai 2 clès d'api, une 'read_only_key', qui concerne la search uniquement et qui peu être vue, et une 'write_api_key' qui doit restée secrète, c'est la clès d'admin.

	```
	ALGOLIA_API_KEY='write_api_key' jekyll algolia push
	```

	Je remplace 'write_api_key' par ma propre clès d'api d'admin.

### Affichage de la search ###

La dernière étape est maintenant l'affichage de la barre de search.
C'est l'étape qui m'a paru la plus compliquée.
On peu se referer à un thème [Hyde them](https://github.com/algolia/algoliasearch-jekyll-hyde).

Une fois sur ce theme nous allons récupérer le code qui va nous servir à afficher la search, tout en permettant de faire des modifications.

Dans mon cas j'ai souhaité mettre la search bar directement sur la page index et non dans une partial. Voici les étapes :

1. Inclure le css dans les assets : algolia.scss, hyde.scss, et syntaxe.scss. 

2. Inclure le fichier Algolia.js dans les assets.

4. Ne pas oublier d'ajouter le lien vers notre fichier Algolia.js.

3. Copier les scripts du footer dans notre footer. Les script inclus dans le footer sont indispensables pour faire apparaître les resultats de la recherche.

	[_includes/footer.html](https://github.com/algolia/algoliasearch-jekyll-hyde/blob/master/_includes/footer.html).

4. Récupèrer la balise < input > incluse dans _includes/sidebar.html du projet hyde theme.

	[_includes/sidebar.html](https://github.com/algolia/algoliasearch-jekyll-hyde/blob/master/_includes/sidebar.html)

5. Recupérer le contenue du layout default.html, et remplacer le content par la ligne de code < input > recupérée dans la _sidebar.html.

	{% gist camilleanelli/103696d3d32118ff20fd6301ea84dda6 %}
	

	Maintenant nous pouvons intervenir dans le css, et même le js pour modifier le design de la search. Par exemple, supprimer le scroll qui fait bouger la page vers le haut lors de la validation de la search, arrondir la forme de l'input.

6. Voici le résultat obtenu 

	![result](/images/algoliaResultblog.png)

	On a bien une search installée, qu'on pourra bien sûre améliorer en fonction de notre thème.






