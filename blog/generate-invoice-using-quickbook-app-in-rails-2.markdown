---
layout: blog
title: Generate Invoice using Quickbook App in Rails - Part 2 | Inkoop
description: Generate Invoice using Quickbook App in Rails - Part 2
---

# Generate Invoice using Quickbook App in Rails - Part 2

Check the previous [blog](http://www.inkoop.in/blog/generate-invoice-using-quickbook-app-in-rails-1/) for creating the quickbook customer, once the quickbook customer creation is clear invoice can be generated for that customer.

Like quickbook customer creation, invoice generation also has two cases:

1) If there is no invoice for the quickbook customer, generate the invoice.

2) If there is already an invoice on which you need to make changes, update the invoice.

Case 1:

The invoice should obviously be generated for the user. If you don't have the customer and you say you need an invoice, it makes no sense. In the previous [blog](http://www.inkoop.in/blog/generate-invoice-using-quickbook-app-in-rails-1/) we have created a customer whose id is 21. So, for the customer 21 a new invoice should be generated.

```ruby
def build_invoice
  service = Quickbooks::Service::Invoice.new
  service.access_token = access_token
  service.company_id = company_id
  quickbook_invoice = Quickbooks::Model::Invoice.new
  quickbook_invoice = set_invoice_data quickbook_invoice
  service.create(quickbook_invoice)
end

def set_invoice_data quickbook_invoice
  quickbook_invoice.customer_id = 21
  quickbook_invoice.txn_date = Date.civil(2017, 3, 29)
  quickbook_invoice.doc_number = 11
  line_item = Quickbooks::Model::InvoiceLineItem.new
  line_item.amount = 300
  line_item.description = "Item"
  line_item.sales_item! do |detail|
    detail.unit_price = 50
    detail.quantity = 6
    detail.item_id = 1
  end
  quickbook_invoice.line_items << line_item
  quickbook_invoice
end
```

In the method build_invoice, a service object is instantiated on Invoice and later is set to the access_token and company_id of the quickbook account. Set the data for the quickbook's invoice object and then create it. Consider, the id of the invoice that is created as 130.

For setting the invoice data, first set the customer_id on the quickbook's invoice object so that invoice gets to know on which customer the invoice should be generated. Each invoice need not necessarily have only one item hence an invoice line item object is created. Make sure the amount specified will be quantity * unit_price.

Case 2:

Consider you already have an invoice say 130 and you want to change the invoice by either adding items or deleting the items or completely change the items present in the invoice. To do so first get the invoice you want to change and then make changes and call update to see the changes in quickbook invoice.

```ruby
def update_invoice
  service = Quickbooks::Service::Invoice.new
  service.access_token = access_token
  service.company_id = company_id
  quickbook_invoice = service.fetch_by_id(130)
  quickbook_invoice = set_invoice_data quickbook_invoice
  service.update(quickbook_invoice)
end
```
One word of warning before you get started with Quickbook is to remember about refreshing the access token. Because the access credentials will be valid only for 180 days once created. But, it can be renewed 30 days prior to its expiry. Keeping track of renewal and managing the renewal process should be done manually by the user.

Hence, instantiate service object on AccessToken and call renewal on the service object which will be a new token.

```ruby
def refresh_token
  service = Quickbooks::Service::AccessToken.new
  service.access_token = access_token
  service.company_id = company_id
  new_token = service.renew
  case new_token.error_code
  when "0"
    # Update the values on success
    record.update_attributes!(
      access_token: new_token.token,
      access_secret: new_token.secret,
      token_expires_at: 180.days.from_now.utc,
    )
  when "270"
    # Discard any saved credentials or call destroy on the object when access token is expired.
    record.update_attributes!(
      access_token: nil,
      access_secret: nil,
      token_expires_at: nil,
    )
  when "212"
    # Tried to renew it more than 30 days before expiration
    puts "Renewal ignored, tried too soon"
  else
    puts "Renewal failed, code: #{new_token.error_code} message: #{new_token.error_message}"
  end
end
```

I hope generating invoice through quickbook will be less scary after this blog.

**~ Ameena **
