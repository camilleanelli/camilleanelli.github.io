---
tag: [Ruby on Rails]
layout: post
title: Ruby, Datetimepicker with Bootstrap 4
---

## Ruby, Datetimepicker with Bootstrap 4

----
(this article was writen in 2016, so this can be obsolete now)

I wrote this article to explain how to install a datetimepicker in a rails project with bootstrap 4. Indeed, I spent a lot of time to find the solution, because it worked only with bootstrap 3.

A datetimepicker is essential to have a much better user experience in your forms.

Here, is what I did to install it :

### 1 Find the most recent project on github ##

  [bootstrap-datetimepicker]("https://github.com/Eonasdan/bootstrap-datetimepicker")
  Don't install the gem !

### 2 Install moment-js

Install moment for the format of dates.

#### In your Gemfile ####

```
gem 'momentjs-rails', '>= 2.9.0
```

#### In application.js ####

```
//= require moment
```

Don't forget to re run your server

### 3 Add the js file in your project

#### In your javascripts folder ####

Add the file **bootstrap-datetimepicker.js** and copy past the content of the file from github project src.

[bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js](https://github.com/Eonasdan/bootstrap-datetimepicker/blob/master/src/js/bootstrap-datetimepicker.js)

#### In your application.js ####

```
//= require bootstrap-datetimepicker.js
```

## 4 Add css file in your project

#### In your stylesheets folder ####

Add the file **bootstrap-datetimepicker.css** and copy past the content of build folder in github project

[bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css]("https://github.com/Eonasdan/bootstrap-datetimepicker/blob/master/build/css/bootstrap-datetimepicker.css")

#### In your application.scss ####

```
*= require bootstrap-datetimepicker
```

Now the install is done, re run your server.

### 5 Complete your view

If you are using simple form for, add this code in your input:

```ruby
 as: :string, input_html: { class:"datetimepicker" }
```

The class "datetimepicker" that it will be called in the script

#### Add the basic script in your view

```javascript
<script type="text/javascript">
  $('.datetimepicker').datetimepicker({
    format: "YYYY-MM-DD";
  });
  </script>
```

[Here the documentation]("http://eonasdan.github.io/bootstrap-datetimepicker/Options/")

Now it is work ! but the icons are not appear, indeed, because of the new version of bootstrap, you have to replace some code in your js file.

### 6 Fix the icons in js file ##

#### In javascripts/bootstrap-datetimepicker.js ##

Replace this code :

```javascript
  icons: {
      time: 'glyphicon glyphicon-time',
      date: 'glyphicon glyphicon-calendar',
      up: 'glyphicon glyphicon-chevron-up',
      down: 'glyphicon glyphicon-chevron-down',
      previous: 'glyphicon glyphicon-chevron-left',
      next: 'glyphicon glyphicon-chevron-right',
      today: 'glyphicon glyphicon-screenshot',
      clear: 'glyphicon glyphicon-trash',
      close: 'glyphicon glyphicon-remove'
  }
```

By font-awesome icons:

```javascript
icons: {
  time: 'fa fa-clock-o',
  date: 'fa fa-calendar',
  up: 'fa fa-chevron-up',
  down: 'fa fa-chevron-down',
  previous: 'fa fa-chevron-left',
  next: 'fa fa-chevron-right',
  today: 'glyphicon glyphicon-screenshot',
  clear: 'fa fa-trash',
  close: 'fa fa-times'
}
```

Great ! it is working

![Datetimepicker](/images/datetimepicker.png)

I hope my article will help you!
