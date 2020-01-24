var expressApp = require('../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var should = chai.should();
const expect = chai.expect;


mongoose.createConnection('mongodb://catalog_admin:some_password@mongo/catalog');

chai.use(chaiHttp);


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

    /**
     * This test may fail sometimes because the target item selected can be
     * the item created temporarily.
     */
    it('get an specific item', function(done) {

        let targetItem = {};

        // Get a target item info.
        chai.request(expressApp)
            .get('/catalog')
            .end(function(error, response) {
                if ( response.body.length > 0 ) {
                    targetItem = response.body[0];
                    chai.request(expressApp)
                        .get(`/catalog/item/${targetItem.itemId}`)
                        .end(function(error, response) {
                            should.equal(200  , response.status);

                            expect(response.body).is.an('object');
                            expect(response.body.itemId).to.equal(targetItem.itemId);
                            done();
                    });
                } else {
                    throw new Error('No item exists for test');
                }
        });
    });
});


describe('/post', function() {
    it('post test(create)', function(done) {
        let item = {
            "itemId": 22,
            "itemName": "Sports Watch 10",
            "price": 100,
            "currency": "USD",
            "categories": [
                "Watches",
                "Sports Watches"
            ]
        };
    
        chai.request(expressApp)
            .post('/catalog')
            .send(item )
            .end(function(err, response){
                should.equal(response.status, 201);
                done();
        });
    });

    it('post test(update)', function(done) {
        let itemBefore = {
            "itemId": 40,
            "itemName": "Sports Watch 10",
            "price": 100,
            "currency": "USD",
            "categories": [
                "Watches",
                "Sports Watches"
            ]
        };

        let itemAfter = {
            "itemId": 40,
            "itemName": "Sports Watch 10",
            "price": 10000,
            "currency": "USD",
            "categories": [
                "Watches",
                "Sports Watches"
            ]
        };
    
        chai.request(expressApp)
            .post('/catalog')
            .send(itemBefore)
            .end(function(err, response){
                should.equal(response.status, 201);
                chai.request(expressApp)
                    .post('/catalog')
                    .send(itemAfter)
                    .end(function(err, response){
                        should.equal(response.status, 200);
                        expect(response.body).is.an('object');
                        console.log(response.body);
                        expect(response.body.itemId).to.equal(itemAfter.itemId);
                        done();
                });
        });
    });
});


describe('/put', function() {
    it('put test', function(done) {
        var item = {
            "itemId": 23,
            "itemName": "Sports Watch 10",
            "price": 100,
            "currency": "USD",
            "categories": [
                "Watches",
                "Sports Watches"
            ]
        };
    
        chai.request(expressApp)
            .put('/catalog')
            .send(item )
            .end(function(err, response){
                should.equal(201, response.status);
                done();
        });
    });
});


describe('/delete', function() {
    it('delete test', function(done) {
        var item ={
            "itemId":211,
                "itemName": "Sports Watch 10",
                "price": 10000,
                "currency": "USD",
                "categories": [
                    "Watches",
                    "Sports Watches"
                ]
            };

        chai.request(expressApp)
            .post('/catalog')
            .send(item)
            .end(function(err, response){
                should.equal(201, response.status);

                chai.request(expressApp)
                    .delete(`/catalog/item/${item.itemId}`)
                    .end(function(err, response){
                        should.equal(200, response.status);
                        done();
                });
        });
    });
});
