---
layout: blog
title: Testing using Cucumber in Ruby | Inkoop
description: Testing using Cucumber in Ruby
---

# Testing using Cucumber in Ruby

Cucumber focuses on behavioural aspect of the project which gives a clear understanding of what the system 
must do from the perspective of the user. So, basically it tests the UI workflow of the system than the 
implementation unlike other testing tools like rspec.

The first thing that you should be doing is to add the cucumber-rails gem to your Gemfile. Along with the cucumber-rails gem it is highly recommended to install the gem database_cleaner because it ensures the cleaning of test data after each test. Hence, include gem database_cleaner also in the Gemfile and install the gems. Also, generate cucumber which creates a folder in the project named features which should include all the cucumber files with step definitions.

```bash
bundle install
rails generate cucumber:install
```

Let's say you are currently working on a small project like bmi_calculator which accepts age,
weight, height and calculates the body mass index and returns the result. Age, weight and height are the fields and when you submit the details it should give the bmi as the result.

You need to save the test file in .feature extension and cucumber executes the .feature file which will have the instructions written in Gherkin language. Gherkin is plain-text English language which provides human readable hooks to write scenario.

Each .feature file will have one feature and many scenarios to describe. Feature begins with the keyword
Feature which is followed by the text. Each scenario begins with the keyword Scenario and every scenario
will have a set of steps which will begin with any one of the keywords Given, When, Then, But or And. For 
each step there will be a matching step definition where the logic of the steps are written in ruby language.

```Cucumber
# bmi_calculator.feature

Feature: Check the BMI for the entered details
  Test the bmi after entering the age, weight and height

Scenario: Check for BMI in the result

```

Cucumber makes no effort in distinguishing between these scenario keywords but we shouldn't commit a mistake in not differentiating. Each keyword has a significance of its own.

Let's Begin with the first keyword Given, Given step indicates the initial setup of the system. Given describes the situation that one starts with.

```Cucumber
# bmi_calculator.feature

...
Scenario: Check for BMI in the result
  Given I am on the home page

```
When step describes an action or event. It mainly should be used when the user interacts with the system. Rather than writing many Whens, And keyword can be used to replace the When keyword mainly to extend the Whens.

```Cucumber
# bmi_calculator.feature

...
Scenario: Check for BMI in the result
  Given I am on the home page
  When I enter "30" as age
  And I enter "60" as weight
  And I enter "5.6" as height
```

Then step is used for verifying the expected result.

```Cucumber
# bmi_calculator.feature

...
Scenario: Check for BMI in the result
  Given I am on the home page
  When I enter "30" as age
  And I enter "60" as weight
  And I enter "5.6" as height
  And I click on submit
  Then I should see "Your BMI is"
```

Refactoring the code...

Rather than writing 3 different step definitions for Whens we can end up writing just one if we change the Whens pattern as below

```Cucumber
# bmi_calculator.feature

...
Scenario: Check for BMI in the result
  Given I am on the home page
  When I enter "30" in "home_age"
  And I enter "60" in "home_weight"
  And I enter "5.6" in "home_height"
  And I click on submit
  Then I should see "Your BMI is"
```

Now comes the point of writing the step definitions for each step in the .feature file. Step definitions are
mainly to interpret the plain english text into ruby code.

Step definition is nothing different than method definition. The steps written in the .feature will call the step definitions written in .rb file. Step definitions can acccept 0 or more number of arguments as a varaiable($number) or regular expression(/^.*$/) or string("3").

```ruby
# step_definitions/bmi_calculator.rb

Given(/^I am on the home page$/) do
  visit root_path
end

```
Cucumber finds the matching step definition for the step and starts executing. The above definition is for 
the Given step which accepts the regular expression and executes the code present in it which is to visit 
the root page of the project.

```ruby
# step_definitions/bmi_calculator.rb

...
When(/^I enter "([^"]*)" in "([^"]*)"$/) do |value, field_id|
  fill_in field_id, :with => value, visible: false
end

When(/^I click on submit$/) do
  %{I press "submit"}
end

Then(/^I should see "([^"]*)"$/) do |arg|
  expect(page).to have_content arg
end
```

In the When step definition you can see that the strings will be passed to block. Variables value and 
field_id will have the data passed from step. Hence for all the When in step this step definition will be executed as we are writing the regex to accept the values. Likewise Then step definition is written.

After the step definitions and steps are written run the file on terminal to see the results by using the 
below command

```bash
rake cucumber
```

Get started with the cucumber!!!

**~ Ameena **
