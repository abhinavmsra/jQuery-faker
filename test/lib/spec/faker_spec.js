describe('Checking the fetch function', function () {

  beforeEach(function () {
    this.testFaker = new Faker();
  });

  describe('direct mapping', function () {
    it('should return an element from firstName', function () {
      var reply = this.testFaker.fetch('name.firstName');
      var includesReply = ($.fakifyDictionary.name.firstName.indexOf(reply) > -1);
      expect(includesReply).toEqual(true);
    });

    it('should return an element from country', function () {
      var reply = this.testFaker.fetch('address.country');
      var includesReply = ($.fakifyDictionary.address.country.indexOf(reply) > -1);
      expect(includesReply).toEqual(true);
    });

    it('should return an element from phone', function () {
      var reply = this.testFaker.fetch('address.phone');
      var includesReply = ($.fakifyDictionary.address.phone.indexOf(reply) > -1);
      expect(includesReply).toEqual(true);
    });

    it('should return an element from company', function () {
      var reply = this.testFaker.fetch('company.name');
      var includesReply = ($.fakifyDictionary.company.name.indexOf(reply) > -1);
      expect(includesReply).toEqual(true);
    });

    it('should return an element from academic', function () {
      var reply = this.testFaker.fetch('personal.academic');
      var includesReply = ($.fakifyDictionary.personal.academic.indexOf(reply) > -1);
      expect(includesReply).toEqual(true);
    });

    it('should return an element from the array', function () {
      var domain = ['Abhinav', 'Bibek', 'Ojash', 'Ananta'];
      var reply = this.testFaker.fetch('name.firstName', domain);
      var includesReply = (domain.indexOf(reply) > -1);
      expect(includesReply).toEqual(true);
    });
  });

  describe('custom mapping', function () {
    it('should return full name', function () {
      var reply = this.testFaker.fetch('name.fullName');
      var components = reply.split(' ').length;
      expect(components).toEqual(3);
    });

    it('should return email', function () {
      var reply = this.testFaker.fetch('email');
      var isEmail = (reply.indexOf('@') > -1);
      expect(isEmail).toEqual(true);
    });

    it('should return data from domain', function () {
      var domain = ['Abhinav', 'Bibek', 'Ojash', 'Ananta'];
      var reply = this.testFaker.fetch(undefined, domain);
      var isFromWithinDomain = (domain.indexOf(reply) > -1);
      expect(isFromWithinDomain).toEqual(true);
    });

    it('should return empty string when no data is passed', function () {
      var reply = this.testFaker.fetch(undefined, []);
      var isBlank = (reply.length === 0);
      expect(isBlank).toEqual(true);
    });
  });
});

