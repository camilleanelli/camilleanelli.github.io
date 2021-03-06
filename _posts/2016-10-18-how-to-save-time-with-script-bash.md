---
tag: [Shell]
layout: post
title: Save time with shell scripts
---

## Save time with shell scripts

In a rails project, I had to repeat the same steps very frequently, for example :

```bash
gco master
```

```bash
git pull
```

It was boring because I often forget some important steps for my project.
I started to use shell scripts.
A shell script allows us to automate series of command lines that we must repeat every times in a day of work.

Here the basic configuration I made :

#### 1) Create a file.sh, inside the folder /bin, and add a line in the top of the page

```bash
cd bin
```

```bash
➜  bin git: touch name_of_the_file.sh
```

#### 2) Inside the file, I write the command line LS to see all files inside /bin

```bash
#!bin/bash

ls
```

#### 3) Test the script by running it inside the /bin folder

```bash
➜  bin git: ./name_of_the_file.sh
```

Unfortunately, we can see the file is not executable. To resolve it, run the command :

```bash
chmod +x name_of_the_file.sh
```

#### 4) Great ! Add command lines you want to run, inside your shell file, for example

```bash
#!bin/bash

git checkout master
git pull

git push staging master:master
heroku run rake db:migrate --my_app
```

#### 5) Execute the file with this syntax

In command line :

```bash
./bin/name_of_your_file.sh
```

Why using shell scripts can make us save time ?

- Execute lot of commands in only one time.
- Avoid to forget some important steps, as migrations.
- Automate the repetition
- Simplify the work in a project team. (You don’t need to explain all steps to do inside the README )
