const Department = require('../department.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Department', () => {

    before(async () => {

        try {
          const fakeDB = new MongoMemoryServer();
      
          const uri = await fakeDB.getConnectionString();
      
          mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      
        } catch(err) {
          console.log(err);
        }
      
      });

      describe('Reading data', () => {

        before(async () => {
          const testDepOne = new Department({ name: 'Department #1' });
          await testDepOne.save();
      
          const testDepTwo = new Department({ name: 'Department #2' });
          await testDepTwo.save();
        });
      
        it('should return all the data with "find" method', async () => {
            const departments = await Department.find();
            const expectedLength = 2;
            expect(departments.length).to.be.equal(expectedLength);
          });      

          it('should return a proper document by "name" with "findOne" method', async () => {
            const department = await Department.findOne({ name: 'Department #1' });
            const expectedName = 'Department #1';
            expect(department.name).to.be.equal('Department #1');
          });

          after(async () => {
            await Department.deleteMany();
          });

      });

    after(() => {
        mongoose.models = {};
      });

});
