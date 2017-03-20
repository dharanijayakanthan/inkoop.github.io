---
layout: blog
title: Generate Invoice using Quickbook App in Rails - Part 1 | Inkoop
description: Generate Invoice using Quickbook App in Rails - Part 1
---

# Generate Invoice using Quickbook App in Rails - Part 1

Quickbook is a software which is mainly used to organize the expenses of a small scale or medium scaled business.

In order to integrate to quickbook you need to install the gems omniauth and omniauth-quickbooks. These gems are used to authenticate with quickbooks.

This guide will walk you through the process of generating invoice through a gem quickbooks-ruby. Include all three gems in the Gemfile and bundle it.

By default, the gem quickbooks-ruby will be in production mode but you can make changes if you want to run it in other mode(development or testing).

Next, create a rails initializer and set the OAUTH_CONSUMER_KEY and OAUTH_CONSUMER_SECRET properly and once authenticated set the callback in the routes in order to tell rails that the request that is sent by the app should be handled in some controller's action to proceed further. We obviously do not want to connect to Quickbook often, hence you can set the OAuth access credentials with four fields access_token, access_secret, company_id, token_expires_at.

After all the important and basic setup, now its time to learn how to generate invoices for the user. Without an user generating invoices makes no sense. Hence, the first thing is to know the user for which we are generating the invoice. There are two possible cases for this:

1) If the user does not exist in quickbook, create the user and generate the invoice.

2) If the user already exists in quickbook, update the user and generate the invoice.

Case 1:

If the user does not exist then instantiate a Service object on the Customer and create it.

```ruby
...
def build_user_information
  service = Quickbooks::Service::Customer.new
  service.access_token = access_token
  service.company_id = company_id
  quickbook_customer = Quickbooks::Model::Customer.new
  quickbook_customer = set_user_information quickbook_customer
  service.create(quickbook_customer)
end

def set_user_information quickbook_customer
  # Name
    quickbook_customer.given_name = quickbook_customer.display_name = 
    quickbook_customer.print_on_check_name = 
    quickbook_customer.fully_qualified_name = "First Last"
  # Email
    quickbook_email = Quickbooks::Model::EmailAddress.new
    quickbook_email.address = "firstlast@abc.com"
    quickbook_customer.primary_email_address = quickbook_email
  # Phone Number
    quickbook_phone_number = Quickbooks::Model::TelephoneNumber.new
    quickbook_phone_number.free_form_number = 9876543210
    quickbook_customer.primary_phone = quickbook_phone_number
  # Address
  quickbook_address = Quickbooks::Model::PhysicalAddress.new
  quickbook_address.line1 = "line1"
  quickbook_address.line2 = "line2"
  quickbook_address.city = "city"
  quickbook_address.country = "country"
  quickbook_customer.billing_address = quickbook_address
  quickbook_customer
end
```
The above piece of code has two methods, the first method ultimately is used to create the user in the quickbook. The service object instantiates for the Customer as shown in the very first line. Then set the access_token and company_id for the service object and after which a new customer is created.

The second method set_user_information accepts an argument which is an object of the Quickbook's customer on which the data should be set. Methods like given_name, display_name, print_on_check_name, fully_qualified_name is called on the quickbook_customer to set the name but for setting email, phone number and address you need to create a new object of the class(EmailAddress, TelephoneNumber, PhysicalAddress) and then set the data as shown clearly in the code.

service.create(quickbook_customer) will create a new quickbook customer with an id as its primary key, say 21 in this case.

Case 2:

If the user already exists in quickbook then get the customer and update it. 

```ruby
...
def update_user_information
  service = Quickbooks::Service::Customer.new
  service.access_token = access_token
  service.company_id = company_id
  quickbook_customer = service.fetch_by_id(21)
  quickbook_customer = set_user_information quickbook_customer
  service.update(quickbook_customer)
end
```

Method update_user_information is to update the data of the existing customer. On service object call fetch_by_id and pass the id of the customer created in the quickbook and then set the data same as we did while building but instead of calling create we call an update method on the service object to update.

There are couples of things that you can play with the service object 

```ruby
users = service.all
```
users will be an array with all the objects of the service(customer in our case)

```ruby
users = service.query()
```
It will be a SQL like structure to retrieve objects.

In the next post there will be a procedure to generate the invoices for the created customer. Stay tuned !!!


**~ Ameena **
