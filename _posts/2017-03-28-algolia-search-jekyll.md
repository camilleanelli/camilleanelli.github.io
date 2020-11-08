---
tag: [french-article, ruby, jekyll, algolia]
layout: post
title: Jekyll, ajouter Algolia search
---

## Jekyll, ajouter Algolia search

___

(Cet article date de 2017 et est possiblement obsolète).

Lorsque les articles se multiplient sur un blog, il est utile d'ajouter une barre de recherches, pour une meilleurs expérience utilisateur.
Je vais donc vous expliquer les différentes étapes que j'ai effectué pour installer une search Algolia sur un projet de blog avec Jekyll.
Avant cela, quelques pré-requis sont nécessaires:

- Créer un compte [Algolia](https://www.algolia.com). Pour ma part j'ai pris le "community plan", le plan gratuit.
- Suivre le tutorial de base pour mieux comprendre le fonctionnement du produit. Il est simple, facile et rapide à suivre.
- Aller dans le dashboard, et créer un nouvel index.
 L'index représente la base de donnée dans laquelle se trouvera le contenu des articles que l'on souhaite afficher dans le résultat de la search:

 Cliquer sur le lien _indice_ à gauche de l'écran.
 ![index](/images/blogAlgoliaSite.png)

 Cliquer sur _new index_ en haut à droite de la page.
 ![index](/images/index-alg.png)

### Indexation des données ###

Nous allons maintenant procéder à l'indexation des données: cela consiste à importer les données sur l'index qui vient d'être crée.
Pour commencer, il faut se rendre sur [github algoliasarch-jekyll](https://github.com/algolia/algoliasearch-jekyll).

- Dans le Gemfile, on ajoute la gem jekyll-algolia.

```ruby
group :jekyll_plugins do
  gem 'jekyll-algolia', '~> 1.0'
end
```

```
bundle install
```

- Pour vérifier si l'installation s'est correctement effectuée, on exécute la commande _jekyll help_. Une liste des sous-commandes Algolia doit alors s'afficher.

 ```
 jekyll help
 ```

Si ce n'est pas le cas, le problème vient peu-être du faite qu'il manque des dépendances dans notre Gemfile.

- Avant d'aller plus loin, nous devons ajouter des gem manquantes dans le gemfile, sans oublier de lancer bundle.

 ```ruby
  gem 'jekyll-sitemap'
  gem 'jekyll-gist'
  gem 'jemoji'
```

- Une fois ces configurations terminées, il faut maintenant ajouter dans le _config.yml_:

  -- **application_id**, situé dans l'onglet **keys api** sur la gauche.
  -- **index_name**, qui correspond au nom que nous donnons à l'index lors de sa création.

- En ligne de commande, on exécute l'import des données:

Sur mon compte Algolia, j'ai 2 clès d'api:

- **read_only_key**, qui concerne la search uniquement et qui peu être vue.
- **write_api_key** qui doit restée secrète, c'est la clès d'admin.

 Ici, je remplace _write_api_key_ par ma propre clès d'api d'admin.

 ```
 ALGOLIA_API_KEY='write_api_key' jekyll algolia push
 ```

Maintenant, la prochaine étape sera l'affichage de la search.

### Affichage de la Search

C'est l'étape qui m'a paru la plus compliquée.
Il est possible de se référer à un thème [Hyde them](https://github.com/algolia/algoliasearch-jekyll-hyde).

Une fois sur ce theme nous allons récupérer le code qui va nous servir à afficher la search, tout en permettant de faire des modifications.

Dans mon cas j'ai souhaité mettre la 'search bar' directement sur la page index.html, et non dans une partial. Voici les étapes :

- Inclure le css dans les assets : algolia.scss, hyde.scss, et syntaxe.scss.

- Inclure le fichier Algolia.js dans les assets.

- Ne pas oublier d'ajouter le lien vers notre fichier Algolia.js.

- Copier les scripts du footer dans notre footer. Les script inclus dans le footer sont indispensables pour faire apparaître les resultats de la recherche.
[Scripts à inclure dans le footer](https://github.com/algolia/algoliasearch-jekyll-hyde/blob/master/_includes/footer.html).

- On récupèrer la balise `<input>` du fichier _includes/sidebar.html du projet hyde theme, qu'on place à l'endroit désiré.

{% highlight html %}
<input type="text" class="algolia__input js-algolia__input" autocomplete="off" name="query" placeholder="Search in this site..." />

{% endhighlight %}

- Recupérer le contenue du layout **default.html**, et le remplacer par notre propre code, censé afficher les articles sur la page index.html.

```html
<div class="algolia__initial-content js-algolia__initial-content">
  <div class="posts">
      <!-- loop on posts -->
      <div class="col-sm-4 padding-boxe">
      <a href="url post">
        <div class="card-post">
          <h3 class="post-title">
            <!-- # display post -->
          </h3>
        </div>
      </a>
      </div>
      <!-- end -->
    </div>
  </div>
```

 Maintenant nous pouvons intervenir dans le css, et même le js pour modifier le design de la search. Par exemple, supprimer le scroll qui fait bouger la page vers le haut lors de la validation de la search, arrondir la forme de l'input.

#### Voici le résultat obtenu

 ![result](/images/algoliaResultblog.png)
 On a bien une search installée, qui pourra bien sûre êter améliorer en fonction de notre thème.
