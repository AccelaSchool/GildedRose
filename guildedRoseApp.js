var ChatResponse = require('./includes/ChatResponse.js');
let InventoryManager = require('./includes/InventoryManager.js');

let readline = require('readline');

let promtpOutput = "";
let patronbuy = false;
let patronsell = false;
let showitem = false;

// Pull in the Inventory at startup
InventoryManager.uploadInventory();

// Create a menu prompy to interact with
let rl = readline.createInterface(process.stdin, process.stdout);

promtpOutput = ChatResponse.getIntroduction() + '\n' + ChatResponse.displayMenuOptions();
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
      promtpOutput = ChatResponse.getRandomGossip() + '\n' + '\n' + ChatResponse.displayMenuOptions();
   }
   else if ( line === "1" ) {
      // 1. Ask for the entire list of inventory
      promtpOutput = InventoryManager.showInventory() + '\n' + '\n' + ChatResponse.displayMenuOptions();
   }
   else if ( line === "2" ) {
      // 2. Ask for the details of a single item by name
	  showitem = true;
	  promtpOutput = ChatResponse.displayShowInfo();
   }
   else if ( line === "3" ) {
      // 3. Progress to the next day
      InventoryManager.incrementDay();
      promtpOutput = ChatResponse.displayMenuOptions();
   }
   else if ( line === "4" ) {
      // 4. List of trash we should throw away (Quality = 0)
      promtpOutput = InventoryManager.showTrashInventory() + '\n' + '\n' +  ChatResponse.displayMenuOptions();
   }
   else if ( line === "5" ) {
      // 5. Patron Buy"
      patronbuy = true;
      promtpOutput = ChatResponse.displayStoreSellsInfo();
   }
   else if ( line === "6" ) {
      // 6 Patron Sell
      patronsell = true;
      promtpOutput = ChatResponse.displayStoreBuysInfo();
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
   else if (showitem) {
      promtpOutput = InventoryManager.showItem(line) + '\n' + '\n' +  ChatResponse.displayMenuOptions();
      showitem =  false;
   }   
   else if (patronbuy) {
      if (InventoryManager.removeItem(line)) {
         promtpOutput = ChatResponse.patronBoughtDisplayMenuOptions(line);
      }
      else {
         promtpOutput = ChatResponse.errorDisplayMenuOptions();
      }
      patronbuy =  false;
   }
   else if (patronsell) {
      if (InventoryManager.addItem(line)) {
         promtpOutput = ChatResponse.patronSoldDisplayMenuOptions(line) ;
       }
      else {
         promtpOutput = ChatResponse.errorDisplayMenuOptions();
      }
      patronsell =  false;
   }
   else {
      promtpOutput = ChatResponse.warningDisplayMenuOptions();
   }

   rl.setPrompt(promtpOutput);
   rl.prompt();

}).on('close',function(){
    process.exit(0);
});


