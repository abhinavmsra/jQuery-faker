# jQuery-Faker

[![Code Climate](https://codeclimate.com/github/abhinavmsra/jQuery-faker/badges/gpa.svg)](https://codeclimate.com/github/abhinavmsra/jQuery-faker)

A jquery plugin that generates the fake data for the developer to use during the development time. It actually generates the test data for the developer rather than having to type to regenerate the similar data to test the same business logic.

Works with all major browsers.

## Demo

_add a demo site either fiddle or our github site_

## Features

* **Automatic data generation for the forms**
* Detects the input type and adds random relevant values.
* Customized data type for user convenience.
* Add new data and data type
* Easy to use and extend :wink:

## Future Enhancements

* Restrict data of the existent datatype to user defined values
* Include support for all types of inputs `eg: select, radio, checkbox`
* Add regular expression match for more magic
* Make even better internal knowledgebase for even more magic
* Allow custom field to be created based on datatype only, no need to define the data itself
* Allow users to switch to bug mode where incorrect data is fed to the fields to check the vulnerabilities
* Automatic disable in production environment
* Auto detect confirmation fields
* Support minimum and maximum values for numerical/date datatypes
* Match with multiple input attributes

## Why do I need this?

**Because all the other faker plugins are just fakes.** Not all plugins gave the automation we seeked, we had to map each of our input fields to the data, and some even didnt gave random data. We found some browser plugins but we needed to setup different browser extensions which is much tedious.

**Adding it wont hurt you.** You won't need any significant change. It'll just give life to those blank input fields so you dont have to type again and again each time you refresh the browser.
```javascript
$( "form" ).fakify();
```

_Thats the way the magic happens_



## Usage

```javascript
$( "form" ).fakify();
```

## Advanced usage
```javascript
$('#form1').fakify({
           "[applicant][name]": "fullname", // map name to the fullname in our database
           "[customer][district]": ["Kathmandu", "Lalitpur", "Bhaktpur"], // add new datatype district to our database
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
<form action="#" method="post" id="myform">
  <input type="text" name="fname" id="fname">
  <input type="text" name="mname" id="mname">
  <input type="text" name="lname" id="lname">
  <input type="text" name="nick_name" id="nname">
  <input type="submit"
</form>
```

```javascript
$("#myform").fakify({
  "except": ["mname"], // Keep mname from autogenerating
  "address": "street_address", // Map address field to street_address
  "nick_name": ["Chaure", "Dalley", "Daure", "Bhyagute", "Gole"] //add custom datatype along with the data
});
```
