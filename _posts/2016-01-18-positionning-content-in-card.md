---
tag: CSS
layout: post
title: Position a content inside a card
---
In my last project, I searched  to position some text inside cards, in a simple way.

Here an example:

![Position](/images/position.png)

To have this result, I learned to position the elements by using basic layouts:

### Position a text  inside a card: ###

1) In my index.html, I have 3 <div> tags, with <h2> .title-card inside.

{% gist camilleanelli/b7c70d8eaec9efcf4e88 %}

2) In my css, I use the positions relative for the container, and absolute for the title.

{% gist camilleanelli/db37aae258444e31a8f8 %}

=> The absolute position depends on the first parent container that has the relative position. If no parent with relative position, the element will depend on the body.

=> As you can see, I add the __relative position__ to the container .img1.

=> Then I add the __absolute position__ to the content .title-card.

=> With the absolute position, I can position my title everywhere I want, with properties __top, right, bottom and left__.

=> Now I can even position an element outside of the card, for example, a trash icon:

### Position an icon on a card: ###

1) Inside my cards, I add <div class=".trash"> that contain the icon:

{% gist camilleanelli/96bf018dd7e4b21a7aee %}

2) In my css, I add some properties to the .trash class:

{% gist camilleanelli/82dae4e06767000d48c9 %}

=> As for my title, in order to position the icon everywhere I want, I add the absolute position.

=> Then I use some negative values to go outside of the card.

=> In my case, and with a small negative  value of -5px, the icon stay inside and outside of the card.

=> Now I  have some cards with icon trash ( to remove cards for example).

Here the result I have:

![position](/images/articleposition2.png)

Even if we can use some margins and padding, for me the best way to position is by using absolute and relative positions.

If I would only want to center an element inside a card, I think the flex position would be very useful. [How to center with flex-box]({% post_url 2015-12-16-simple-way-to-center %})
