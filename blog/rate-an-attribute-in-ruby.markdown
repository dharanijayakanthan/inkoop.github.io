---
layout: blog
title: How to include rating in your Rails App | Inkoop
description: How to include rating in your Rails App
---

# How to rate an attribute in Rails

Rating is a pretty common feature in all the fields. Based on the ratings people will judge the product or field. The higher the rating, the higher is the attraction for that product or feature.

In order to work with the rating feature in the app, first install the gem ratyrate. Include the gem in the Gemfile of the app you are working on and bundle it

```bash
bundle
```

I have an app which allows the user to rate the novels and at the end any user who visits the page should be able to see the average rating on the product.

There will be two things to consider, first is to figure out which model should rate
and second is to know on which model should the rating be done. In my App, user model will be the one who will rate and on novel model rating should be added.

The generator of the gem accepts one argument which should be the one who rates which is important to mention because of the link between user and rating data. Hence, run this on terminal

```bash
rails g ratyrate user
```
The above generator will 
**~ Ameena **
