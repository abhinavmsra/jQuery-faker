# jQuery-Faker

[![Code Climate](https://codeclimate.com/github/abhinavmsra/jQuery-faker/badges/gpa.svg)](https://codeclimate.com/github/abhinavmsra/jQuery-faker)

A jquery plugin that generates the fake data for the developer to use during the development time. It actually generates the test data for the developer rather than having to type to regenerate the similar data to test the same business logic.

Works with all major browsers.

## Demo

http://abhinavmsra.github.io/jQuery-faker

## Features

* **Automatic data generation for the forms**
* Detects the input type and adds random relevant values.
* Supports randomization of radio button, check box, select box
* Customized data type for user convenience
* Add new data and data types
* Restrict data to user defined values for each data types
* Generate fake data within your project right away
* Easy to use and extend :wink:

## Future Enhancements

* Add regular expression match for more magic
* Make even better internal knowledge base for even more magic
* Allow custom field to be created based on datatype only, no need to define the data itself
* Allow users to switch to bug mode where incorrect data is fed to the fields to check the vulnerabilities
* Automatic disable in production environment
* Auto detect confirmation fields
* Support minimum and maximum values for numerical/date data-types
* Match with multiple input attributes

## Why do I need this?

**Because all the other faker plugins are just fakes.** Not all plugins gave the automation we seeked, we had to map each of our input fields to the data, and some even didnt gave random data. We found some browser plugins but we needed to setup different browser extensions which is much tedious.

**Adding it wont hurt you.** You won't need any significant change. It'll just give life to those blank input fields, selects, radio buttons, check boxes,  so you dont have to type again and again each time you refresh the browser.

```javascript
$( "#myform" ).fakify();
```

_Thats the way the magic happens_



## Usage

```javascript
$( "#myform" ).fakify();
```

## Advanced usage
```javascript
$('#myform').fakify({
           "applicant[name]": "name.fullName", // map name to the fullname in our database
           "customer[district]": ["Kathmandu", "Lalitpur", "Bhaktapur"], // add new datatype district to our database
           "except": ["country", "address_2", "website"] //don't assign values to the given fields
       });
```

## Example

**Simple usage**

```html
<form action="#" method="post" id="myform">
  <input type="text" name="fname" id="fname">
  <input type="text" name="mname" id="mname">
  <input type="text" name="lname" id="lname">
  <input type="text" name="address" id="address">
  <input type="submit"
</form>
```

```javascript
$("#myform").fakify();
```

**Advanced usage**
```html
<form id="myform" name="my_form" method="post">
  <input id="customer_fname" name="customer[username]" type="text">
  <input id="customer_mname" name="customer[mname]" type="text">
  <input id="customer_lname" name="customer[lname]" type="text">
  <input id="customer_email" name="customer[email]" type="text">
  <input id="customer_nick_name" name="customer[nick_name]" type="text">
  <input id="customer_city" name="city" type="text"> <!--supports various methods of writing name-->
  <input id="customer_country" name="customer[country]" type="text">
  <input id="customer_address_1" name="customer[address_1]" type="text">
  <input type="checkbox" name="vehicle" value="Bike">I have a bike
  <input type="checkbox" name="vehicle" value="Car">I have a car
  <input type="checkbox" name="vehicle" value="Bike">I have a bus
  <input type="checkbox" name="vehicle" value="Car">I have a Radio
  <input type="radio" name="radioGroup" value="1"> One</input>
  <input type="radio" name="radioGroup" value="2"> Two</input>
  <input type="radio" name="radioGroup" value="3"> Three</input>
  <input type="radio" name="radioGroup" value="4"> Four</input>
  <select>
    <option value="default" disabled="disabled">Select one--</option>
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </select>

</form>
```

```javascript
$("#myform").fakify({
  "except": ["customer[mname]","city"], // Keep mname and city from autogenerating
  "customer[address_1]": "address.streetAddress", // Map address_1 field to street_address
  "customer[nick_name]": ["Chaure", "Dalley", "Daure", "Bhyagute", "Gole"] // add custom datatype along with the data
  "customer[country]": ["Nepal", "China"] // restrict country data type to "Nepal" and "china" only
});
```

## Generators

**Name**
```javascript
Faker.fetch('name.firstName'); // => 'Hari'
Faker.fetch('name.middleName'); // => 'Nath'
Faker.fetch('name.lastName'); // => 'Acharya'
Faker.fetch('name.fullName'); // => 'Shyam Raj Basnet'
```

**Address**

```javascript
Faker.fetch('address.country'); // => 'Nepal'
Faker.fetch('address.state'); // => 'Baglung'
Faker.fetch('address.zip'); // => '46045'
Faker.fetch('address.postCode'); // => '123'
Faker.fetch('address.streetAddress'); // => 'JANE ROE 200 E MAIN ST PHOENIX AZ 85123 USA'
Faker.fetch('address.stateAbbr'); // => 'AL'
Faker.fetch('address.city'); // => 'Pokhara'
Faker.fetch('address.buildingNumber'); // => '4297'
```

**Company**

```javascript
Faker.fetch('company.name'); // => 'Can Do Coffee Distributors'
Faker.fetch('company.website'); // => 'aliexpress.com'
Faker.fetch('company.title'); // => 'A Separate Peace'
Faker.fetch('company.department'); // => 'RoR'
```

**Personal**

```javascript
Faker.fetch('personal.academic'); // => 'MBA'
```

**Domain Name**

```javascript
Faker.fetch('domainName'); // => 'gmail.com'
```

**Business**

```javascript
Faker.fetch('business.creditCardNumbers'); // => '4111111111111111'
```

**Miscellaneous**

```javascript
Faker.fetch('phone'); // => '9842529593'
Faker.fetch('extension'); // => '0710'
Faker.fetch('faxNumber'); // => '021-837-0251'
Faker.fetch(''); // => 'The last thing I want to do is insult you. But it IS on the list.'
Faker.fetch(); // => 'Letting the cat out of the bag is a whole lot easier than putting it back in.'
```
