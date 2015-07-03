$.fakeData = {
    name: {
        firstName: [ "Bibek", "Hari", "Shyam", "Shiva", "Ram","Bibek1", "Hari1", "Shyam1", "Shiva1", "Ram1"],
        middleName: [ "Sharma", "Lal", "Raj", "Prasad", "Dip"],
        lastName: [ 'lamichhane', 'aryal','basnet','adhikari','poudyal']
        title: [ 'Mr.', 'Mrs.', 'Ms.', 'Miss', 'Dr.']
        fullname:[ 'fullname','full_name']
    },
    address: {
        country: [ "Nepal", "India", "Bhutan"],
        state: [ "Kathmandu", "Delhi", "Chennai"],
        zip: [ "009977", "12312", "43211"],
        postcode: [ "123"],
        address: [ 'Alabama', 'Alaska','Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'],
        street-address: [ 'Alabama', 'Alaska','Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'],
        state_abbr: [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT'],
        city: [ 'Ktm','Pokhara','Bhutwal'],
        phone: [ '123-456-789','546-666-888','544-666-998'],
        extension: [ '3456','1234','7890'],
        fax_number: [ '444-555-555','333-555-5577'],
        building_number: [ '123',6789,'9870'],
        email: [ 'a@a.com','b@b.com'],
        department: [ 'HR','Finance']
        }
    company: {
       name: [ 'Global IME','Everest','INvestment'],
       website: [ 'a.com','b.gov','c.net'],
       title: [ 'Lorem ipsum'],
       description: [ 'Lorem description']

      }
      personal{
       academic: [ 'MBA','BBA','SLC']
      }
    }
}

$.fakeMatch = {
    name: {
        firstName: [ 'f_name', 'fname','first_name','firstname','fstname'],
        middleName: [ 'm_name', 'mname','middle_name','middlename'],
        lastName: [ 'l_name', 'lname','last_name','lastname','lstname'],
        title: [ 'title'],
        fullname:[]
    },
    address: {
        country: [ country],
        state: [ 'state'],
        zip: [ 'zipcode','zip'],
        postcode: [ 'postcode','postcode_by_state'],
        address: [ 'address','secondary_address','primary_address'],
        street_address: [ 'street_address','street','street_name'],  
        state_abbr: [ 'state_abbr'],      
        city: [ 'city'],            
        phone: [ 'cell_phone','phone','phone_number'],
        extension: [ 'extension','ext'],
        fax_number: [ 'fax_number','fax'],
        building_number: [ 'building_number'],
        email: [ 'email','mailto','free_email','internet_email'],
        department: [ 'department'],
        }
    company: {
        name: [ 'company_name','c_name', 'organization_name', 'name'],
        website: [ 'url','website','web_address','web-address'],
        title: [ 'title'],
        description: [ 'description','desc']
          }
    personal: {
     academic: [ 'academic','education','qualification']
    }
    }
}