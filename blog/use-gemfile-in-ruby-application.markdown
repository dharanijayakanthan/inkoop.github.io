---
layout: blog
title: How to Manage Gems in Ruby applications using Gemfile | Inkoop
description: How to Manage Gems in Ruby applications using Gemfile
---

# How to manage Gems in Ruby application using Gemfile

Lets say you are writing a simple ruby application for addition of numbers which takes n number of arguments and returns a sum of the values passed.

```ruby
# addition.rb
def addition(*numbers)
  numbers.inject(0) do |sum, number|
    sum + number
  end
end

addition(12, 32, 1, 2) # Calls the addition method which returns 47
```

Now, lets write specs for the above code using [Rspec](http://rspec.info/)

```ruby
# addition.rb
def addition(*numbers)
  numbers.inject(0) do |sum, number|
    sum + number
  end
end

addition(12, 32, 1, 2)

# spec to check if the sum is 25 for values 15 and 10
describe "Addition" do
  it "Should return the sum as 25" do
    expect(addition(15, 10)).to eq 25
  end
end
```

In order to run this spec, you need to install the gem in your system include rspec gem in the application.

```bash
gem install rspec
```

You can require the gem you need in the application via the require command.

```ruby
# addition.rb

require 'rspec'

def addition(*numbers)
  numbers.inject(0) do |sum, number|
    sum + number
  end
end

puts addition(12, 32, 1, 2)

# a spec to check if the sum is 25 for values 15, 10
describe "addition" do
  it " Should return the sum as 25" do
    expect(addition(15, 10)).to eq 25
  end
end
```

The first line "require 'rspec'" makes sure that rspec is loaded. If rspec has already been loaded, it does nothing. If rspec has not been loaded yet, then it loads immediately.

Suppose, you need more gems in your application then you can not keep adding require statements for every gem. To manage it in a better way, we will create a Gemfile.

A __Gemfile__ is a file which consists of all the gems that is needed for your application.

The first step is to run bundle init command on the terminal. What this does is, it generates a Gemfile with default rubygems into the currently working directory.

```bash
bundle init
```

Now, a Gemfile is created and the next job is to add a list of gems that you need in the Gemfile. 

```ruby
# Gemfile
source "https://rubygems.org"

gem 'byebug'
gem 'rspec'
gem 'sqlite3'
gem 'rack'
gem 'thin'
```

Run bundle install to install all the gems included in the gemfile. This generates a Gemfile.lock, as the name suggests Gemfile.lock is a locking on all the versions of all the gems that got installed.

```
bundle install
```

Now, in order to ask your ruby file to discover Gemfile and make all of the gems in your Gemfile available to the application you need to add three statements at the top of the ruby file.

```ruby
# addition.rb
require 'rubygems'
require 'bundler/setup'
Bundler.require(:default)

def addition(*numbers)
  numbers.inject(0) do |sum, number|
    byebug # to debug
    sum + number
  end
end

addition(12, 32, 1, 2)

# a spec to check if the sum is 25 for values 15,10
describe "addition" do
  it "Should return the sum as 25" do
    expect(addition(15, 10)).to eq 25
  end
end
```

Here, the first two lines will basically put all the gemfiles into loadpath successflly, without getting a LoadError: no such file to load.

Now that you have your setup ready, you can start working. Good Luck!

**~ Ameena **
