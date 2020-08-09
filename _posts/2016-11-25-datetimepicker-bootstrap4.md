---
layout: post
title: Datetimepicker with bootstrap 4
---

I wrote this article to explain how to install a datetimepicker in a rails project with bootstrap 4. Indeed, I spent a lot of time to find the solution, because it worked only with bootstrap 3.

A datetimepicker is essential to have a much better user experience in your forms.

Here, is what I did to install it :

## 1) Find the most recent project on github : ##

  [bootstrap-datetimepicker]("https://github.com/Eonasdan/bootstrap-datetimepicker")
  Don't install the gem !

## 2) Install moment-js ##

Install moment for the format of dates.

#### In your Gemfile : ####
```
gem 'momentjs-rails', '>= 2.9.0
```

#### In application.js : ####

```
//= require moment
```
Don't forget to re run your server

##  3) Add the js file in your project ##

#### In your javascripts folder : ####

Add the file **bootstrap-datetimepicker.js** and copy past the content of the file from github project src.

[bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js](https://github.com/Eonasdan/bootstrap-datetimepicker/blob/master/src/js/bootstrap-datetimepicker.js)

#### In your application.js :####

```
//= require bootstrap-datetimepicker.js
```

## 4) Add css file in your project : ##

#### In your stylesheets folder : ####

Add the file **bootstrap-datetimepicker.css** and copy past the content of build folder in github project

[bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css]("https://github.com/Eonasdan/bootstrap-datetimepicker/blob/master/build/css/bootstrap-datetimepicker.css")

#### In your application.scss ####

```
*= require bootstrap-datetimepicker
```

Now the install is done, re run your server.

## 5) Complete your view ##

If you are using simple form for, add this code in your input :

```
 as: :string, input_html: { class:"datetimepicker" }
```

The class "datetimepicker" that it will be called in the script

#### Add the basic script in your view ####

{% gist camilleanelli/38684ad8175bba4c747df9213edb200d %}
[Here the documentation]("http://eonasdan.github.io/bootstrap-datetimepicker/Options/")

Now it is work ! but the icons are not appear, indeed, because of the new version of bootstrap, you have to replace some code in your js file.

## 6) Fix the icons in js file ##

#### In javascripts/bootstrap-datetimepicker.js :##

Replace this code :

{% gist camilleanelli/b08c6990682d254879ca8e110d43843b %}

By font-awesome icons:

{% gist camilleanelli/dcba61a842e3a0f707a5cbc89b74256d %}

Great ! it is working

![Datetimepicker](/images/datetimepicker.png)

I hope my article will help you !
