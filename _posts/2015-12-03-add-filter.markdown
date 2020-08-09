---
layout: post
title:  "How to add a filter with opacity, above a background??"
categories: jekyll update
---

I’m not ashamed to tell that I spend so many times to find a solution with this filter, because when I gave an opacity to it, every child elements had the same opacity, so that’s why I would like to right this, even if it is simple for lot of people:

###In my html:

{% gist camilleanelli/2c5c6db8613afa035ef7 %}

###In my CSS:

####I add css to the .banner class:

{% gist camilleanelli/4900db44ceb122f489ac %}

=> If I don’t give a position like __absolute, relative or fixed__, to the element, the z-index property will not work.

=> All elements have the __z-index value of 0__ by default.

=> The element that has __the largest value of z-index__, will be positioned above the others.

####I add css in the .filter class:

{% gist camilleanelli/b8262e02f59e378c42dc %}

=> I apply the same size of the .banner element.

=> Then, I add the value of 0,5 inside curly braces of __rgba value__, because I don't want to apply the opacity to the child elements, like the title for example.


I hope it will help you.
