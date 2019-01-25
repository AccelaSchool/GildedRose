// Allison's verbal responses

const introduction = "Hi and welcome to the Gilded Rose. Welcome to our small inn within our prominent city.  " +
   "I am Allison. We buy and sell only the finest goods."

// 15 gossip drama sayings 
const drama = [ "Beware of Leeroy Jenkins.  He isn't a team player",
   "Orcs seem to buy the most potions.",
   "I heard that a dragon stole a dwarvens king gold and kingdom.  And sits on top of a huge pile of dwarvens gold, valuables and relics.",
   "Did you know that the king came by my shop last month and said I was sweet?  I sure hope he comes by again soon.",
   "I heard the king pulled his sword from a stone",
   "The best healing potion to buy is Gothrog's flesh rejuvenation, you will see the hole in you regenerate by placing it around the wound",
   "The bad thing about Gothrog's flesh rejuvenation potion where to you get these ingredients: Phoenix fire, elder vampire blood, Jelly from Gothrog's Ooze Monster, Ender Apple Cider vinegar", 
   "Serious Gothrog where and how do you get a Phoenix, elder vampires are over 1000 years old, and you literally created your own ooze monster",
   "I heard to create Gothrog's ooze monster he pulls the essence of life from a gaint acidic toad tadpole and puts it in an oozing soul stone",
   "I heard that Gothrog's ooze monsters are spell summoned into battles",
   "I heard the dark shogans and ether demegorgons are hunting Gothrog for his inifinty kane spear, the spear is a jeweled relic from the civilation before the demon wars",
   "The only reason Gothrog's healing portions are even around is because he left 100s chests full of them on the during the last battle of the Rose War",
   "The different kingdoms, guilds, mercs and heros took those chests after the last Rose War battle",
   "No one has seen Gothrog since the last Rose battle.  Probably better that way has he is cheered by many, but hated just as much.",
   "I'm only a 1377 years old elf, a little flightly and I care to gossip about what I want" ]

const instructions = "Type the number of the following option";

const menu = [ "0. Tell me some local gossip",
   "1. Ask for the entire list of inventory",
	"2. Ask for the details of a single item by name",
	"3. Progress to the next day",
	"4. List of trash we should throw away (Quality = 0)",
	"5. Buy",
	"6. Sell",
   "7. Stop going to the store(end program)" ]

const seeYouTomorrow = "I'll see you tomorrow"; 

function randomIntFromInterval(min,max) { // min and max included
    return Math.floor(Math.random()*(max-min+1)+min);
}

exports.getIntroduction = function()  {
   return (introduction);
}

exports.getRandomGossip = function()  {
   const randomSelection = randomIntFromInterval(0,drama.length);
   return (drama[randomSelection]);
}

exports.displayMenuOptions = function()  {
   var retVal = instructions + 'n';
   for ( var index = 0; index < menu.length; index++ ) {
      retVal =  retVal + '\n';
   }
   retVal = retVal + seeYouTomorrow;
   return (retVal);
}


exports.displayBuyInfo = function()  {
   var retVal = "In csv form enter the item name, category, selling time (integer), quality(integer)" + '\n' +
      "(example: Roast Rat Burgers,Food,7,14);
   return (retVal);
}

exports.displaySellInfo = function()  {
   var retVal = "Enter in the exact item name to purchase";
   return (retVal);
}

exports.boughtGoodDisplayMenuOptions = function()  {
   var retVal = "You bought the item." + '\n' + instructions + 'n';
   for ( var index = 0; index < menu.length; index++ ) {
      retVal =  retVal + '\n';
   }
   retVal = retVal + seeYouTomorrow;
   return (retVal);
}

exports.soldGoodDisplayMenuOptions = function()  {
   var retVal = "You sold the item." + '\n' + instructions + 'n';
   for ( var index = 0; index < menu.length; index++ ) {
      retVal =  retVal + '\n';
   }
   retVal = retVal + seeYouTomorrow;
   return (retVal);
}

exports.errorDisplayMenuOptions = function()  {
   var retVal = "That didn't work try again." + '\n' + instructions + 'n';
   for ( var index = 0; index < menu.length; index++ ) {
      retVal =  retVal + '\n';
   }
   return (retVal);
}
