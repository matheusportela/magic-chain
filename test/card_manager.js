contract('CardManager', function(accounts) {
  it('should create null card', function() {
    var cardManager = CardManager.deployed();
    assert.equal(cardManager.cards.length, 0, "null card wasn't created");
  });

  it('should create new card', function() {
    var cardManager = CardManager.deployed();
    cardManager.newCard('Test Card', accounts[0]).then(function() {
        cardManager.getCard.call(1).then(function(card) {
            // Since getCard returns two variables, they are stored in a list
            // and can be retrieved in the same order as they were returned
            name = card[0];
            owner = card[1];

            assert.equal(name, 'Test Card', "card wasn't added to cards list");
        });
    });
  });
});