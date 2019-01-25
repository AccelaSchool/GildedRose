let ChatResponse = require('incldes/ChatResponse.js');
let InventoryManager = require('incldes/InventoryManager.js');

let readline = require('readline');

let promtpOutput = "";
let buy = false;
let sell = false;

// Create a menu prompy to interact with
let rl = readline.createInterface(process.stdin, process.stdout);

promtpOutput = ChatResponse.getIntroduction + '\n' + ChatResponse.displayMenuOptions();
rl.setPrompt(promtpOutput);
rl.prompt();

/*
const menu = [ "0. Tell me some local gossip",
   "1. Ask for the entire list of inventory",
	"2. Ask for the details of a single item by name",
	"3. Progress to the next day",
	"4. List of trash we should throw away (Quality = 0)",
	"5. Buy",
	"6. Sell",
	"7. Restart inventory",
   "8. Never Come Back"]
   */
rl.on('line', function(line) {
   if (line === "0" ) { 
      // Get local drama
      promtpOutput = ChatResponse.getRandomGossip();
   }
   else if ( line === "1" ) {
      // 1. Ask for the entire list of inventory
      promtpOutput = InventoryManager.showInventory();
   }
   else if ( line === "2" ) {
      // 2. Ask for the details of a single item by name
      promtpOutput = InventoryManager.getRandomGossip();
   }
   else if ( line === "3" ) {
      // 3. Progress to the next day
      InventoryManager.incrementDay();
      promtpOutput = ChatResponse.displayMenuOptions();
   }
   else if ( line === "4" ) {
      // 4. List of trash we should throw away (Quality = 0)
      promtpOutput = InventoryManager.showTrashInventory();
   }
   else if ( line === "5" ) {
      // 5. Buy"
      buy = true;
      promtpOutput = ChatResponse.displayBuyInfo();
   }
   else if ( line === "6" ) {
      // 6 Sell
      sell = true;
      promtpOutput = ChatResponse.displaySellInfo();
   }
   else if ( line === "7" ) {
      // 7. Restart program
      InventoryManager.restartInventory();
      promtpOutput = InventoryManager.showInventory() + '\n' + ChatResponse.displayMenuOptions();
   }
   else if ( line === "8" ) {
      // 8. Never Come Back
      // Store inventory for next time
      InventoryManager.packUpInventory();
      rl.close();
   }
   else if (buy) {
      if (InventoryManager.buy(line)) {
         promtpOutput = ChatResponse.boughtGoodDisplayMenuOptions();
       }
      else {
         promtpOutput = ChatResponse.errorDisplayMenuOptions();
      }
      buy =  false;
   }
   else if (sell) {
      if (InventoryManager.sell(line)) {
         promtpOutput = ChatResponse.soldGoodDisplayMenuOptions();
      }
      else {
         promtpOutput = ChatResponse.errorDisplayMenuOptions();
      }
      sell =  false;
   }
   else {
      promtpOutput = ChatResponse.warningDisplayMenuOptions();
   }

   rl.setPrompt(promtpOutput);
   rl.prompt();

}).on('close',function(){
    process.exit(0);
});


