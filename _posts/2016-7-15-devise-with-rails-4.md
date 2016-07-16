---
layout: article
title: Devise with rails 4
---

It is during a course of programming social network, with an older version of Rails, that I noted it was missing some steps.
Before starting the install of devise, if you want to make your forms beautiful, (even authentication’s forms)  it is better to install “simple_form”. Indeed, I did it after and it was not working.



=> [Here the very simple documentation of simple_form:](https://github.com/plataformatec/simple_form)

=> Once simple_form is installed,  I can start my “devise” setup:

{% gist camilleanelli/80774ed2910b550ad4c3d52d80a3a66e %}

=> Then I run :

**$ bundle install**

**$ rails generate devise:install**

=> Then I have to follow the instructions in the terminal.

=> Don’t forget to add **“before_action :authenticate_user!”** in controllers.  In my project, I did it in “application_controllers.rb”, because all features can’t be accessible without authentication.

=>  Now I can generate the model “User” (but it could be another word it depends on your project):
**$ rails generate devise User**

=> Then I restart the server and find the registration page to the url :  “/users/sign_up .

=> Now I have a model “user” in my project, I would like to add some fields such as : “last_name”, “first_name”, “profile_name” etc… :

**$ rails g migration AddFieldsToUsers last_name: string first_name: string profile_name: string**

**$ rake db:migrate**

=> Once the fields are added, I have to add them in my authentication’s forms, for instance, my new session’s form :

{% gist camilleanelli/ab37ea22b6252a42866f8a99c7b88a19 %}

=> Now I can test my application, but there is a mistake:  the new user that I have just created, is “nil” for the last_name, first_name, and profile_name. The reason is because of missing “strong parameters” in controller’s file, so I write this code in my application_controller.rb :   

{% gist camilleanelli/5449770246ea24585d103fbc9b0eb89f %}

=> Now devise is intalled correctly,  I can add a new user :

![Position](/images/valider_sign_up.png)
