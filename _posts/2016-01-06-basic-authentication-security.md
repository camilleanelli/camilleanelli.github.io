---
layout: article
title: Http Basic authentication and environment variables
---

## Http Basic authentication

When I worked on my website using ruby on rails (a backpack list for digital nomads), I had to find a solution for a simple way to secure the access of some pages . As it was a static application, I didn’t need  login or signup in my project. In order to protect the access to the actions like updating or adding categories and items, I choose the “http basic authentication”:

[ Here the documentation ](http://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Basic.html)

**First, to use this kind of authentication, I add this method in my file controllers/categories_controller.rb:**

class CategoriesController < ApplicationController

  http_basic_authenticate_with name: “my name”, password: “my password”, except: [:index, :show] (_to allow access at the index and show views_)

end


**As a result, when I clic to add a new category I can see in my browser:**

![Popup](/images/popup.png)


When I finished to install my basic authentication, I didn’t push my work on github, because of my password writing directly inside the code. Indeed, it is dangerous to put your secret informations inside the code, as anybody can see your code in your github account, mostly if it is a public project.
To resolve this issue, I used the environment variables.

##Secure the confidential data with environment variables:##

1. First, I Install the [ gem dotenv ](https://github.com/bkeepers/dotenv).
2. In the root of the application, I create a file **.env**.
3. In this file, I create my environment variables  by using uppercases.

   For example:  MY_NAME = “name” My_PASSWORD = “password”.

4. Then I replace my personal informations (name and password) by the variables in the categories_controller.rb.

   http_basic_authenticate_with name: “your name”, password: “your password”, except: [:index, :show].

   **Replaced by:**

   **http_basic_authenticate_with name: ENV['MY_NAME’], password: ENV[“MY_PASSWORD”], except: [:index, :show]**

5. The last step is very important,  I add the .env file in the **.gitignore file**.

    Now I can push the work on my repository.

The environment variables can be used in many other cases.
I did this authentication, because they will be only one or two administrators.
In The next step, I will add an administrator area, and the http authentication inside the admin/controllers.rb , instead of controller.rb.
