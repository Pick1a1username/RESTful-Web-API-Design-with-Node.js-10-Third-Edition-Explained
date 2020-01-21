var expressApp = require('../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var should = chai.should();
const expect = chai.expect;


mongoose.createConnection('mongodb://catalog_admin:some_password@mongo/catalog');

chai.use(chaiHttp);


// Work in progress
describe('/get', function() {
    it('get all items', function(done) {
        chai.request(expressApp)
            .get('/catalog')
            .end(function(error, response) {
                should.equal(200  , response.status);
                done();
        });
    });

    it('get all items under a specific category', function(done) {
        chai.request(expressApp)
            .get('/catalog/Sports Watches')
            .end(function(error, response) {
                should.equal(200  , response.status);

                const categories = response.body.map( item => item.categories.includes('Sports Watches') );
                expect(categories).to.not.include(false);
            
                done();
        });
    });

    // Work in progress
    it('get an specific item', function(done) {

        let targetItem = {};

        // Get a target item info.
        chai.request(expressApp)
            .get('/catalog')
            .end(function(error, response) {
                if ( response.body.length > 0 ) {
                    targetItem = response.body[0];
                    console.log(targetItem);
                }
        });

        chai.request(expressApp)
            .get(`/catalog/item/${targetItem.itemId}`)
            .end(function(error, response) {
                // This callback should be executed after getting targetItem!!!
                should.equal(200  , response.status);
                expect(response.body).is.an('array').with.lengthOf(1);
                expect(response.body[0].itemId).to.equal(targetItem.itemId);
                done();
        });
    });
});


describe('/post', function() {
    it('post test', function(done) {
        var item = {
            "itemId":19,
            "itemName": "Sports Watch 10",
            "price": 100,
            "currency": "USD",
            "__v": 0,
            "categories": [
                "Watches",
                "Sports Watches"
            ]
        };
    
    chai.request(expressApp)
        .post('/catalog')
        .send(item )
        .end(function(err, response){
            should.equal(201, response.status);
            done();
        });
    });
});

// Work in progress
describe('/delete', function() {
    it('delete test', function(done) {
        var item ={
        "itemId":19,
            "itemName": "Sports Watch 10",
            "price": 100,
            "currency": "USD",
            "__v": 0,
            "categories": [
                "Watches",
                "Sports Watches"
            ]
        };

        chai.request(expressApp)
            .delete('/catalog/item/19')
            .send(item )
            .end(function(err, response){
                should.equal(200, response.status)
            done();
        });
    });
});
