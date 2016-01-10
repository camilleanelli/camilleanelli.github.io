---
layout: article
title: Sticky footer, the different solutions
---

When I began to work on design of websites , I  had problem with the position of my footer. Indeed, on some pages, the footer can be on the middle of the page, instead of the bottom.

![footer](/images/footer.png)


The solutions that I learned are very simple.

##The calc() value:##

  In my html, below the header, I have a <div class="container"></div> that take every content inside, without the footer.
  In my css, on this .container, I add the __100vh__ value to the __min-height__ property. It will take the entire space of the window.

  Here I can see the result:

  ![footer](/images/footertropenbas.png)

  Now I have a small problem, the footer doesn’t appear anymore, because it placed too down in the window.
  That ‘s why the calc() value is very useful. I will subtract the 100vh value - the height of the footer.

  So, in my css I add:

  {% gist camilleanelli/7d8f6e832bbf2c1351f9 %}

  100vh represent the min-height of the container.

  100px represent the height of the footer.

  Here the result:

  ![footer](/images/bonfooter.png)

  There is another way, if you enjoy using the flex box, it can do the same too.


##The flexbox solution:##

  In my css, on the container, I add this code:

  {% gist camilleanelli/133cf7791e8fa28d412e %}


  Then I can apply the flex property for each row(sections, or div), within the container:

  {% gist camilleanelli/27dbeaf7932f80acd673 %}

  The flex property with value 1, will divide the entire space between the elements and push the footer to the bottom.
  As in the first solution, we can avoid the footer too down, by using the calc() value, in the min-height property.

  Even if I appreciate using flexbox, it is still not supported by every versions of IE.
  [Here the documentation](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
