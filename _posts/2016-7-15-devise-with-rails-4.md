---
tag: [Ruby on Rails]
layout: post
title: Rails 4 and Devise authentication
---

## Devise authentication

---

It is during a course of programming social network, with an older version of Rails, that I noted it was missing some steps.
Before starting the install of devise, if you want to make your forms beautiful, (even authentication’s forms) it is better to install “simple_form”. Indeed, I did it after and it was not working.

=> [Here the very simple documentation of simple_form:](https://github.com/plataformatec/simple_form)

=> Once simple_form is installed, I can start my “devise” setup:

```ruby
gem 'devise'
```

=> Then I run :

```bash
bundle install
rails generate devise:install
```

=> Then I have to follow the instructions in the terminal.

=> Don’t forget to add **“before_action :authenticate_user!”** in controllers. In my project, I did it in “application_controllers.rb”, because all features can’t be accessible without authentication.

=> Now I can generate the model “User” (but it could be another word it depends on your project):

```bash
rails generate devise User
```

=> Then I restart the server and find the registration page to the url : /users/sign_up .

=> Now I have a model **User** in my project, I would like to add some fields such as : “last_name”, “first_name”, “profile_name” etc… :

```bash
rails g migration AddFieldsToUsers last_name: string first_name: string profile_name: string
rake db:migrate
```

=> Once the fields are added, I have to add them in my authentication’s forms, for instance, my new session’s form :

```erb
<h2 class="text-center">Sign up</h2>

<div class="col-md-6 col-md-offset-3">
  <%= simple_form_for(resource, as: resource_name, url:
  registration_path(resource_name)) do |f| %> <%= f.error_notification %>

  <div class="form-inputs">
    <%= f.input :first_name %> <%= f.input :last_name %> <%= f.input
    :profile_name %> <%= f.input :email, required: true, autofocus: true %> <%=
    f.input :password, label: "Mot de passe", required: true, hint:
    ("#{@minimum_password_length} characters minimum" if
    @minimum_password_length) %> <%= f.input :password_confirmation, label:
    "Confirmer le mot de passe", required: true %>
  </div>

  <div class="form-actions">
    <%= f.button :submit, "Validate" class:"btn btn-primary" %>
  </div>
  <% end %>
</div>
```

=> Now I can test my application, but there is a mistake: the new user that I have just created, is “nil” for the last_name, first_name, and profile_name. The reason is because of missing “strong parameters” in controller’s file, so I write this code in my application_controller.rb :

```ruby
class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

   protected

   def configure_permitted_parameters
     devise_parameter_sanitizer.for(:sign_up) << [:first_name, :last_name, :profile_name]
   end

end
```

=> Now devise is intalled correctly, I can add a new user :

![Position](/images/valider_sign_up.png)
