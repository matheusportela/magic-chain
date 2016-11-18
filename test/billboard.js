contract('Billboard', function(accounts) {
    it('should have null trade intention at list begin', function() {
        var billboard = Billboard.deployed();
        billboard.getTradeIntention.call(0).then(function(trade) {
            owner = trade[0];
            cardOffered = trade[1];
            cardWanted = trade[2];

            assert.equal(owner, 'null', "owner is incorrect");
            assert.equal(cardOffered, 'null', "card offered is incorrect");
            assert.equal(cardWanted, 'null', "card wanted is incorrect");
        });
    });

    it('should create new trade intention', function() {
        var billboard = Billboard.deployed();
        billboard.newTradeIntention('naves', 'Lightning Bolt', 'Dark Ritual').then(function() {
            return billboard.getTradeIntention.call(1);
        }).then(function(trade) {
            owner = trade[0];
            cardOffered = trade[1];
            cardWanted = trade[2];

            assert.equal(owner, 'naves', "owner is incorrect");
            assert.equal(cardOffered, 'Lightning Bolt', "card offered is incorrect");
            assert.equal(cardWanted, 'Dark Ritual', "card wanted is incorrect");
        });
    });
});
