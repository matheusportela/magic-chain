TradeStatus = {
    OPEN : 0,
    CLOSED : 1,
    CANCELLED : 2
}

contract('Billboard', function(accounts) {
    it('should have null trade intention at list begin', function() {
        var billboard = Billboard.deployed();
        billboard.getTradeIntention.call(0).then(function(trade) {
            owner = trade[0];
            cardOffered = trade[1];
            cardWanted = trade[2];
            status = trade[3];

            assert.equal(owner, 0, "owner is incorrect");
            assert.notEqual(owner, 1, "owner is incorrect");
            assert.deepEqual(cardOffered, 'null', "card offered is incorrect");
            assert.deepEqual(cardWanted, 'null', "card wanted is incorrect");
            assert.equal(status, TradeStatus.OPEN, "trade status is incorrect");
            assert.notEqual(status, TradeStatus.CLOSED, "trade status is incorrect");
        });
    });
});

contract('Billboard 2', function(accounts) {
    it('trade intentions list should have size of 1', function() {
        var billboard = Billboard.deployed();
        return billboard.getTradeIntentionListSize.call().then(function(size) {
            assert.deepEqual(size.toNumber(), 1, 'trade intentions array has wrong size');
        });
    });
});

contract('Billboard 3', function(accounts) {
    it('trade intentions list should have size of 2', function() {
        var billboard = Billboard.deployed();
        billboard.newTradeIntention(1, 'a', 'b').then(function() {
            return billboard.getTradeIntentionListSize.call();
        }).then(function(size) {
            assert.deepEqual(size.toNumber(), 2, 'trade intentions array has wrong size');
        });
    });
});

contract('Billboard 4', function(accounts) {
    it('should create new trade intention', function() {
        var billboard = Billboard.deployed();
        billboard.newTradeIntention(2, 'Lightning Bolt', 'Dark Ritual').then(function() {
            return billboard.getTradeIntention.call(1);
        }).then(function(trade) {
            owner = trade[0];
            cardOffered = trade[1];
            cardWanted = trade[2];
            status = trade[3];

            assert.equal(owner, 2, "owner is incorrect");
            assert.notEqual(owner, 0, "owner is incorrect");
            assert.equal(cardOffered, 'Lightning Bolt', "card offered is incorrect");
            assert.equal(cardWanted, 'Dark Ritual', "card wanted is incorrect");
            assert.equal(status, TradeStatus.OPEN, "trade status is incorrect");
            assert.notEqual(status, TradeStatus.CLOSED, "trade status is incorrect");
        });
    });
});

    /*it('should not cancel trade intention if not owner', function() {
        var billboard = Billboard.deployed();
        billboard.newTradeIntention(1234, 'Lightning Bolt', 'Dark Ritual').then(function() {
            billboard.cancelTradeIntention(1, 123);
            return billboard.getTradeIntention.call(1);
        }).then(function(trade) {
            owner = trade[0];
            cardOffered = trade[1];
            cardWanted = trade[2];
            status = trade[3];

            assert.equal(owner, 1234, "owner is incorrect");
            assert.equal(cardOffered, 'Lightning Bolt', "card offered is incorrect");
            assert.equal(cardWanted, 'Dark Ritual', "card wanted is incorrect");
            assert.notEqual(status, TradeStatus.CANCELLED, "trade status is incorrect");
        });
    });*/

    // it('should cancel trade intention', function() {
    //     var billboard = Billboard.deployed();
    //     billboard.newTradeIntention(1234, 'Lightning Bolt', 'Dark Ritual').then(function() {
    //         billboard.cancelTradeIntention(1, 1234);
    //     }).then(function() {
    //         return billboard.getTradeIntention.call(1);
    //     }).then(function(trade) {
    //         owner = trade[0];
    //         cardOffered = trade[1];
    //         cardWanted = trade[2];
    //         status = trade[3];

    //         assert.equal(owner, 1234, "owner is incorrect");
    //         assert.equal(cardOffered, 'Lightning Bolt', "card offered is incorrect");
    //         assert.equal(cardWanted, 'Dark Ritual', "card wanted is incorrect");
    //         assert.equal(status, TradeStatus.CANCELLED, "trade status is incorrect");
    //     });
    // });
