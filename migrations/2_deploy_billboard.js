var owners = [
  187521367,
  932801432,
  937422134,
  234873464,
  843647832
]

var cards = [
  "Gideon, Ally of Zendikar",
  "Archangel Avacyn",
  "Eldrazi Displacer",
  "Linvala, the Preserver",
  "Selfless Spirit",
  "Thalia, Heretic Cathar",
  "Thraben Inspector",
  "Spatial Contortion",
  "Skysovereign, Consul Flagship",
  "Smuggler's Copter",
  "Stasis Snare",
  "Aether Hub",
  "Evolving Wilds",
  "Wastes",
  "Westvale Abbey"
]

module.exports = function(deployer) {
  deployer.deploy(Billboard).then(function() {
    billboard = Billboard.deployed();
    billboard.newTradeIntention(owners[0], cards[0], cards[1]).then(function() {
      return billboard.takeTradeIntention(1, owners[2]);
    });
    billboard.newTradeIntention(owners[1], cards[2], cards[3]).then(function() {
      return billboard.cancelTradeIntention(2, owners[1]);
    });
    billboard.newTradeIntention(owners[2], cards[4], cards[5]).then(function() {
      return billboard.takeTradeIntention(3, owners[4]);
    });
    billboard.newTradeIntention(owners[3], cards[6], cards[7]);
    billboard.newTradeIntention(owners[4], cards[8], cards[9]);
  });
};
