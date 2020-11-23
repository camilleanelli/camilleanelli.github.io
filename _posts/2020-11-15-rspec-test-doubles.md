---
tag: [Ruby, RSpec, Tests]
layout: post
title: Tests doubles et vérification des objets
resume: On aimerait que les tests échouent si les méthodes testées n’existent pas
published: true
---

## RSpec, tests doubles et vérification  des objets

![gif](https://media.giphy.com/media/xT5LMNMXk8298ZgJ32/giphy.gif)

___

Dans un précédent [article](https://www.camilleanelli.fr/2020/11/01/mocks-vs-stubs.html), j’ai parlé de la notion de **stubs** et de **mocks**.

Ils permettent de bouchonner (stubber) n’importe quelle méthode (même des méthodes non implémentés). Si une méthode vient à être modifiée dans le code de mon projet, et qu'elle se trouve bouchonnée dans mes tests, alors ceux-ci peuvent continuer de passer au lieu d'échouer.

C'est très utile en TDD (test driven development), mais dans la pratique, on aimerait quand même que les tests échouent si les méthodes testées n’existent pas.

Avec les tests doubles de RSpec, il y a la possibilité de vérifier si une méthode ou un objet est vraiment définie dans le code : le terme utilisé est **verifying double**.

### Test double

Le terme **test double** est utilisé pour désigner des tests qui simulent les comportements réels des éléments testés. Cela regroupe les  **stubs**, les **mocks**, et d'autres utilisations comme les Spy.

Dans RSpec, la méthode **double()** permet de créer la copie d'un objet (une doublure) :

```ruby
objet = double('objet')
```

Exemple  :

```ruby
# Une classe quasiment vide
class Hero
  def initialize(name); end
end

#TEST
RSpec.describe Hero do
  describe '#do_something' do
    example 'renvoie quelque chose' do
      # Ici double() est une copie d'un objet Hero
      my_hero = double('Hero', name: 'WonderWoman')
      # La class Hero n'a pas besoins d'etre implémentée.

      # my_hero = double('whatever') serait possible mais rendrait incohérent le test.

      # J'autorise mon objet à recevoir un message #do_something
      # et renvoie une réponse
      allow(my_hero).to receive(:do_something).and_return('Turn around')

      expect(my_hero.do_something).to eq 'Turn around'
    end
  end
end
```

✅ Ici, le test passera toujours même si la méthode **#do_something** n'existe pas.

On peut donc bouchonner n'importe quelle méthode, car l’existence de la classe et de ses méthodes ne sera jamais vérifiée. C’est à ce moment là qu’intervient la notion de **verifying double**.

## Verifying double

### Pour les méthodes d'instance

Dans RSpec, pour faire un test double qui vérifie l'existence des méthodes testées, on utilise la méthode "instance_double()" au lieu de "double()".

Exemple :

```ruby
class Hero
  def initialize(name: name); end
end

# TEST
RSpec.describe Hero do
 describe '#non_definie' do
   it 'renvoie quelque chose' do
    # je crée la doublure d'une instance de la classe
    my_hero = instance_double('Hero', name: 'Jean Mich')

    # je bouchonne une méthode non implémentée
    allow(my_hero).to receive(:non_definie).and_return('not defined')

    expect(my_hero.non_definie).to eq 'not defined'
   end
 end
end
```

❌ Le test échoue parce que la méthode **#non_definie** qui est bouchonnée n’est pas implémentée.

On vient de vérifier l'existence des méthodes d'instance, mais il est aussi possible de faire la même chose pour les méthodes de classe.

### Les méthodes de classe

Pour cela on va utiliser la méthode **class_double()**

```ruby
class Hero
  def initialize(name: name); end

  def self.call; end
end

# UN TEST QUI PASSE
RSpec.describe Hero do
  describe ":call" do
    it 'renvoie quelque chose' do
      # on crée la doublure d'une classe
      hero = class_double('Hero')

      # je bouchonne l'appel de le méthode de classe
      allow(hero).to receive(:call).and_return('example')

      expect(Hero.call).to eq 'example'
    end
  end
end
```

✅ Le test passe parce que la classe existe, et notre méthode de classe **:call** a bien été implémenté.

**Maintenant, si je décide de changer le nom de ma classe, que se passe t-il?**

```ruby
# ici j'ai décidé de changer le nom de ma classe:
class SuperHero
  def do_something; end
end

# TEST DE FAILURE
describe '#non_definie' do
  it 'test une méthode non définie' do
    my_hero = instance_double('Hero')

  # je bouchonne une méthode non implémentée
    allow(my_hero).to receive(:non_definie).and_return('not defined')

  expect(my_hero.non_definie).to eq 'not defined'
  end
end
```

✅ Ici à notre grande surprise, le test passe. Comme la classe  `Hero`  n'existe plus, on revient au comportement initial d'un test double. L'existence de la méthode n'est pas vérifiée.

Pour contrer ce problème de classe qui n'existerait pas on peut ajouter une configuration qui lèvera une erreur dans notre cas. Ainsi le test échouera avant même d'avoir vérifié les méthodes.

```ruby
config.mock_with :rspec do |mocks|
 mocks.verify_doubled_constant_names = true
end
```

Si vous utilisez RSpec, cette configuration permet d'avoir des tests plus solides.

Le principe de vérification des méthodes s'applique aussi sur les objets réels.

### Vérifier les méthodes sur de vrai objets

Je peux être amené à faire des tests partiellement doubles. Bouchonner des méthodes et utiliser de vrai objets (par exemple, des instances).

Exemple  :

```ruby
# Une classe vide.
class Actor; end

# TEST
RSpec.describe Actor do
  describe '#non_existant' do
  # ici je définie une instance
  let(:actor) { Actor.new }
    it "renvoie quelque chose" do
      # ici je bouchonne la méthode non implémenté
      allow(actor).to receive(:non_existant).and_return('toto')

      expect(actor.non_existant).to eq 'toto'
    end
  end
end
```

✅ Le test passe même si la méthode **#non_existant** n'est pas définie.

Pour pouvoir vérifier l'existence de cette méthode, et faire échouer le test, on ajoute une configuration RSpec avec **verify_partial_doubles** :

```ruby
RSpec.configure do |config|
  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end
end
```

[Voici un lien pour le détail d'autre cas possibles]([https://relishapp.com/rspec/rspec-mocks/docs/verifying-doubles](https://relishapp.com/rspec/rspec-mocks/docs/verifying-doubles))

## Bonus : avec la gem Mocha

Si comme moi, vous êtes amené à utiliser la gem **Mocha**, (pour les stubs/mocks en Ruby), il est possible de vérifier l'existence d'une méthode et de lever une exception lorsqu'elle n'est pas définie.
La Gem [Mocha](https://github.com/freerange/mocha) apporte une syntaxe plus minimaliste et peut remplacer celle de RSpec. Voici la configuration à rajouter :

```ruby
Mocha.configure do |c|
  c.stubbing_non_existent_method = :prevent
end
```

En conclusion, en travaillant avec des tests unitaires, il est plus prudent d’utiliser des tests doubles qui apportent une vérification supplémentaire (verifying double en RSpec). Le but est avant tout de faire échouer les tests si les méthodes ne sont pas définies.
