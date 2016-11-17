contract('Billboard', function(accounts) {
    it('should have null trade intention at list begin', function() {
        var billboard = Billboard.deployed();
        billboard.getTradeIntention.call(0).then(function(trade) {
            owner = trade[0];
            cardOffered = trade[1];
            cardWanted = trade[2];

            assert.equal(owner, 0, "owner is incorrect");
            assert.equal(cardOffered, 'null', "card offered is incorrect");
            assert.equal(cardWanted, 'null', "card wanted is incorrect");
        });
    });

    it('should create new trade intention', function() {
        var billboard = Billboard.deployed();
        billboard.newTradeIntention(accounts[0], 'Lightning Bolt', 'Dark Ritual').then(function() {
            return billboard.getTradeIntention.call(1);
        }).then(function(trade) {
            owner = trade[0];
            cardOffered = trade[1];
            cardWanted = trade[2];

            assert.equal(owner, accounts[0], "owner is incorrect");
            assert.equal(cardOffered, 'Lightning Bolt', "card offered is incorrect");
            assert.equal(cardWanted, 'Dark Ritual', "card wanted is incorrect");
        });
    });
});
