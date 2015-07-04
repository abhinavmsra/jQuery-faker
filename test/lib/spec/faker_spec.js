describe('Checking the fetch function', function () {

  describe('direct mapping', function () {
    it('should return an element from firstName', function () {
      var reply = Faker.fetch('name.firstName');
      var includesReply = ($.fakifyDictionary.name.firstName.indexOf(reply) > -1);
      expect(includesReply).toEqual(true);
    });

    it('should return an element from country', function () {
      var reply = Faker.fetch('address.country');
      var includesReply = ($.fakifyDictionary.address.country.indexOf(reply) > -1);
      expect(includesReply).toEqual(true);
    });

    it('should return an element from phone', function () {
      var reply = Faker.fetch('phone');
      expect(reply.length).toEqual(10);
    });

    it('should return an element from company', function () {
      var reply = Faker.fetch('company.name');
      var includesReply = ($.fakifyDictionary.company.name.indexOf(reply) > -1);
      expect(includesReply).toEqual(true);
    });

    it('should return an element from academic', function () {
      var reply = Faker.fetch('personal.academic');
      var includesReply = ($.fakifyDictionary.personal.academic.indexOf(reply) > -1);
      expect(includesReply).toEqual(true);
    });

    it('should return an element from the array', function () {
      var domain = ['Abhinav', 'Bibek', 'Ojash', 'Ananta'];
      var reply = Faker.fetch('name.firstName', domain);
      var includesReply = (domain.indexOf(reply) > -1);
      expect(includesReply).toEqual(true);
    });
  });

  describe('custom mapping', function () {
    it('should return full name', function () {
      var reply = Faker.fetch('name.fullName');
      var components = reply.split(' ').length;
      expect(components).toEqual(3);
    });

    it('should return email', function () {
      var reply = Faker.fetch('email');
      var isEmail = (reply.indexOf('@') > -1);
      expect(isEmail).toEqual(true);
    });

    it('should return data from domain', function () {
      var domain = ['Abhinav', 'Bibek', 'Ojash', 'Ananta'];
      var reply = Faker.fetch(undefined, domain);
      var isFromWithinDomain = (domain.indexOf(reply) > -1);
      expect(isFromWithinDomain).toEqual(true);
    });

    it('should return empty string when no data is passed', function () {
      var reply = Faker.fetch(undefined, []);
      var isBlank = (reply.length === 0);
      expect(isBlank).toEqual(true);
    });
  });
});


