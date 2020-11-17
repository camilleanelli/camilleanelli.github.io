---
tag: [VF, Ruby, Rails, RSpec]
layout: post
title: Stubs vs Mocks avec RSpec
resume: Ces 2 notions “stubs” et “mocks” peuvent parfois prêter à confusion.
---

## Stubs vs Mocks avec RSpec

---

Lors d'une récente mission, j'ai travaillé sur un projet comportant énormément de tests unitaires. Ces tests étaient composés essentiellements de 'stubs' et de'mocks'.

Résultat, la suite de 1300 tests ne prenait que moins d'une minute à tourner!🔥 🎉

Ces 2 notions "stubs" et "mocks" peuvent parfois prêter à confusion. Quelle est la différence ?
En plus des avantages, y a t-il aussi des inconvénients à les utiliser ?

---
Lorsqu'on entend parler de 'stubs' et de 'mocks', on pense aux tests doubles.

### Les tests doubles

Les mocks, les stubs (et les Spy) sont appelés des “test doubles”. Un “test double” est un test qui tourne le plus souvent sur de faux objets (des copies d'objets), et qui simule les comportements de ces objets.

Pour illustrer ce concept de **test double**, on pourrait penser à la doublure d’une actrice : elle est remplacée par une personne qui effectue les actions à sa place, ainsi elle est protégée de tout désagrément.

![Doublure](/assets/images/doublure.jpg)

---

### Pourquoi les utiliser

✅ Pour tester le code en isolation, par exemple, pour ne pas toucher à la base de données.

✅ Pour ne pas déclencher des appels trop couteux. Un service qui ferait appel à une API externe qui répond en 3 secondes induit mathématiquement que le test va prendre plus de 3s pour passer, ce qui est lent. Imaginez si on avait 100 tests qui appellent directement cette API…

✅ Pour ne pas à refaire la configuration dans les tests de certaines dépendances qui peuvent être compliquées. On peut retourner directement le résultat d'une méthode d'un service sans avoir à éxecuter cette méthode.

✅ Pour pouvoir écrire en TDD (Test Driven Development) : on peut simuler les comportements des futures méthodes avant de les implémenter. Par example, des dépendances dont l'objet testé aurait besoins dans le futur.

Dans la suite de cet article, je vais utiliser RSpec pour présenter ces 2 concepts. Vous pouvez ajouter la gem à votre Gemfile ou via :

```bash
gem install rspec
```

[Installation de RSpec](https://github.com/rspec/rspec)

---

### Le Stub (bouchon)

Lorsque je bouchonne une méthode, je permets à mon objet de recevoir un appel, et j’ai la possibilité de retourner une réponse de mon choix. Si je n’impose pas de valeur de retour, c’est **nil** qui est renvoyé par défaut. Dans la syntaxe la plus récente de RSpec, c’est avec la méthode **"allow"** (autoriser) que l'on créé des 'stubs' .

#### Voici un cas classique pour mieux comprendre

Tester une méthode qui dépend d’un objet, qui lui même fait appel à une API externe:

```ruby
class Actor
  def initialize(name)
    @name = name
  end

  def change_clothes
    change = ChangeClothesService.call
    "#{change} blablabla"
  end
end

RSpec.describe Actor do
  describe '#change_clothes' do
    # Je n'ai pas besoins de tester le comportement du service ChangeClothesService :
    # 1. ce n'est pas le sujet du test
    # 2. il doit etre testé ailleurs

    it 'do something' do
      actor = Actor.new(name: 'Alba Flores')
      # Néenmmoins, j'ai besoins que ce service me renvoit quelque chose
   # car ma méthode #change_clothes en dépend
      allow(ChangeClothesService).to receive(:call).and_return('whatever')

      # Maintenant que mon service est bouchonné, je peux lancer mon assertion
   # et tester ce que doit renvoyer la méthode
      expect(actor.change_clothes).to eq 'whatever blablabla'
    end
  end
end
```

Pour mieux comprendre Rspec, on peut tester le comportement en console irb

```ruby
require 'rspec/mocks/standalone'

# On crée la doublure d'une classe non implémenté
actor = double('Actor')
# => <Double "Actor">

# Ici, actor est un faux objet qui représente une instance de la future classe Actor
actor.current_movie
# RSpec::Mocks::MockExpectationError (#<Double "Actor"> received unexpected message :current_movie with (no args))
```

Je n’ai pas encore autorisé la méthode **#current_movie**, autrement dis je n’ai pas bouchonné la méthode.

```ruby
allow(actor).to receive(:current_movie).and_return('James Bond')
# <RSpec::Mocks::MessageExpectation #<Double "Actor">.current_movie(any arguments)>

# current_movie peut maintenant être appelée sur l'objet
actor.current_movie
# => "James Bond"
```

---

### Mocks

La première différence avec le 'stub' est la vérification de la méthode  qui est appelée sur l'objet.

Ensuite, je peux retourner la valeur de mon choix lorsque cette méthode est appelée.

#### Cas pratique

Utiliser des **mocks** pour tester une méthode qui déclencherait un appel à un *service object*

```ruby
class Actor
  def initialize(name)
    @name = name
  end

  def start_acting
    reponse = CurrentMovieService.call(@name)
    "do something with #{reponse}"
  end
end

RSpec.describe 'Actor' do
  it 'call the current_movie method' do
    # Ici je me base sur un objet réel
    # car je veux tester le vrai comportement de la méthode #start_acting
    # (avec un faux objet il faudrait bouchonner la méthode)
    actor = Actor.new('Norman Reedus')

    # Je vérifie que le service est bien appelé via la méthode "expect" et non plus "allow".
    # Au passage, je lui impose une valeur de retour, 'result'
    # pour qu'il ne fasse rien d'autre, autrement dis, je simule sont comportement.
    # parce que mon test n'a pas besoins de savoir ce qu'il fait réellement.
    expect(CurrentMovieService).to receive(:call).with('Emma Watson').and_return('result')

    reponse = actor.start_acting

    # Test du résultat attendu
    expect(reponse).to eq 'do something with result'
  end
end
```

Pour mieux comprendre les mocks en Rspec, on peut tester le comportement en console irb :

```ruby
require 'rspec/mocks/standalone'

#  Voici le double d'une classe non implémenté
studio = double('studio')
# => #<Double "studio">

expect(studio).to receive(:location)
# => #<RSpec::Mocks::MessageExpectation #<Double "studio">.location(any arguments)>

# On vérifie si la méthode est appelée (ce qui n'est pas le cas)
RSpec::Mocks.verify
# RSpec::Mocks::MockExpectationError ((Double "studio").location(*(any args)))
# expected: 1 time with any arguments
# received: 0 times with any arguments
```

Un mock est donc à la fois un bouchon (‘stub’), et une assertion (on vérifie que c'est appelé).

## Conclusion

Comme nous l'avons vu, les stubs et les mocks de tests peuvent simplifier et accélérer drastiquement une suite de test en bouchonnant certains appels.
Ce sont des outils utiles à maitriser dans une démarche TDD, et permettent aussi de simplifier certains tests.

Il faut cependant les utiliser avec précaution. Lorsqu'on bouchonne les appels, les comportements des méthodes ne sont pas réels, ils sont simulés et définis dans les tests. On peut se retrouver avec une suite de tests qui passe, alors que notre  code ne fonctionne pas. En principe, les tests d’intégrations comblent cet inconvénient car ils font de vrais appels sur de vrais objets, et testent donc les comportements réels.
Je n'ai pas abordé le sujet des Spy (une autre forme de test double),  car je n'ai à ce jour ni eu l'occasion de m'en servir, ni trouvé le besoins de m'en servir.
