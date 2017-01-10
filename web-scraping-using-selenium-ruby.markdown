---
layout: blog
title: Inkoop | Web Scraping using Selenium in Ruby
description: Web Scraping using Selenium in Ruby
url: web-scraping-using-selenium-ruby
identifier: blog-web-scraping-using-selenium-ruby
---

# Web Scraping using Selenium in Ruby

Not every website offer an API or mechanism to access the data programmatically, web scraping will be the only way to extract the website information.

There are different tools available to scrape the information from a website and one amongst them is Selenium-webdriver. The rest of the document exclusively deals with selenium.

Before doing anything make sure the gem selenium-webdriver is installed.

```bash
gem install selenium-webdriver
bundle install
```

Now, include the gem, selenium-webdriver in the ruby app.

Let’s Get to Scraping Now...

You should be familiar with atleast the basic html tags to scrape the basic information from the website. Once you know the basics, you are good to go.

The first thing is to run a webdriver. Selenium by default supports Mozilla Firefox browser and in case you want to run the webdriver in chrome, you can simply do it in two steps:

First, download the latest version of ChromeDriver server. And then copy the chromedriver into the bin directory to run the webdriver perfectly in chrome.

Scraping in selenium is mainly about retrieving the page and finding the UI elements to display the content.

```ruby
# scraping.rb

require "selenium-webdriver"
driver = Selenium::WebDriver.for :chrome
```

The first thing is to navigate the driver to the page that you need to scrape and load the url. I will be scraping [Priyanka Chopra](https://en.wikipedia.org/wiki/Priyanka_Chopra) and will be concentrating on fetching the name, birth place and the image url of the person.

```ruby
# scraping.rb

require "selenium-webdriver"
driver = Selenium::WebDriver.for :chrome
driver.navigate.to "https://en.wikipedia.org/wiki/Priyanka_Chopra"
```

Now that we have loaded the page, the next thing is to look through the web page and start locating the elements. But, before which define the explicit wait for 20 seconds so that it waits for 20 seconds before throwing a TimeoutException.

To locate any elements of the page, find_element method can be used. The method find_element will return only one single WebElement where as find_elements method will return a list of WebElement.

The method,find_element accepts the name and the value of the selector and returns the element. The selectors can be css, class name, id, name, and others.

```ruby
# scraping.rb

require "selenium-webdriver"
driver = Selenium::WebDriver.for :chrome
driver.navigate.to "https://en.wikipedia.org/wiki/Priyanka_Chopra"
wait = Selenium::WebDriver::Wait.new(:timeout => 20)
```

The class selector will look for the class name firstHeading in the webpage and return the webelement and will be saved in the name variable. In order to get only the text then call text method on the variable to display the name Priyanka Chopra.

```ruby
# scraping.rb

require "selenium-webdriver"
driver = Selenium::WebDriver.for :chrome
driver.navigate.to "https://en.wikipedia.org/wiki/Priyanka_Chopra"
wait = Selenium::WebDriver::Wait.new(:timeout => 20)
name = wait.until {
  element_1 = driver.find_element(:class, "firstHeading")
}
puts name.text        
# Priyanka Chopra
```

In order to get the birth place the css selector can be used to match three classes, infobox class, biography class, vcard class and will be stored in element_2. Now, element_2 will have to look for class name birthplace and store it in born variable. Finally, call the text method on born to obtain the birth place.

```ruby
# scraping.rb

...
born = wait.until {
  element_2 = driver.find_element(:css, ".infobox.biography.vcard")
  element_2.find_element(:class, "birthplace")
}
puts born.text        
# Jamshedpur, Bihar, India (now Jharkhand, India)
```

The final thing is to get the image url, hence look for the class name image and call attribute method by passing href as an argument which eventually returns the url.

```ruby
# scraping.rb

...
image_url = wait.until {
  element_3 = driver.find_element(:class, "image").attribute("href")
}
puts image_url        
# https://en.wikipedia.org/wiki/File:Priyanka_nikon_camera.jpg
```

After everything is scraped, close the driver.

```ruby
# scraping.rb
...
puts image_url        
# https://en.wikipedia.org/wiki/File:Priyanka_nikon_camera.jpg
driver.quit 
```
Enjoy Scraping!!!

**~ Ameena Shad**
