var csvjson = require('csvjson');
var fs = require('fs');

const inventoryfileorg = "inventory-org.csv";
const inventoryfile = "inventory.csv";
var csvoptions = {
    delimiter : ',' , // optional
    quote     : '"' // optional
};

/*
1. Item Name
2. Item Category
3. Sell In
4. Quality
*/
var templateItemObject = { "ItemName" : "", "ItemCategory" : "", "Sellin" : 0, "Quality" : 0 }


// Array of objects
var inventory = [];


// Loads the inventory at startup
exports.uploadInventory = function()  {
   // Convert CSV to JSON object
   const inventory_file_data = fs.readFileSync(inventoryfile, { encoding : 'utf8'});
   inventory = csvjson.toObject(inventory_file_data, csvoptions);
   console.log("inventory=", inventory);
}

// Shows the inventory
exports.showInventory = function()  {
   var strInventory = JSON.stringify(inventory, null, 2);
   console.log("strInventory=", strInventory);
   strInventory = strInventory + '\n';
   return (strInventory);
}

// Increment day and affect inventory
//1. All items have a SellIn value which denotes the number of days we have to sell the item
//2. All items have a Quality value which denotes how valuable the item is
//3. At the end of each day our system lowers both values for every item
// ADDITIONAL
//1. Once the sell by date has passed, Quality degrades twice as fast
//2. The Quality of an item is never negative
//3. "Aged Brie" actually increases in Quality the older it gets
//4. The Quality of an item is never more than 50
//5. "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
//6. "Backstage passes", like aged brie, increases in Quality as it's SellIn value approaches; 
//  Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert
//7. "Conjured" items degrade in Quality twice as fast as normal items
//8. An item can never have its Quality increase above 50, however "Sulfuras" is a legendary item and as such its Quality is 80 and it never alters.
exports.incrementDay = function()  {
   for ( var index = 0; index < inventory.length; index++ ) {
      if ( "Sulfuras" === inventory[index].ItemName ) {
         inventory[index].Quality = 80;
      }
      else if ( "Backstage passes" === inventory[index].ItemCategory ) {

         if ( inventory[index].Sellin === 0 ) {
            inventory[index].Quality = 0;
         }
         else if ( inventory[index].Quality < 50 ) {
            if ( inventory[index].Sellin <= 5 && 
               inventory[index].Quality < 48 ) {
               inventory[index].Quality++;
               inventory[index].Quality++;
            }
            if ( inventory[index].Sellin <= 10 && 
               inventory[index].Quality < 49 ) {
               inventory[index].Quality++;
            }
            inventory[index].Quality++;
         }
      }
      else if ( "Conjured" === inventory[index].ItemCategory ) {
         inventory[index].Quality = inventory[index].Quality  - 2;
      }
      else {
         if (inventory[index].quality > 0 && inventory[index].Sellin === 0) {
            inventory[index].quality = inventory[index].quality - 2;
         }
         else if (inventory[index].quality > 0 ) {
            inventory[index].quality--;
         }
      }
   
      if (inventory[index].Sellin > 0 && "Sulfuras" != inventory[index].ItemName ) {
         inventory[index].Sellin--;
      }

   }
   var strInventory = JSON.stringify(inventory, null, 2);
   console.log("strInventory=", strInventory);
   return (strInventory);
}

// Add Item to the inventory
exports.buy = function(line)  {
   var retVal = false;
   try {
      var purchasedItem = csvjson.toArray(line, csvoptions);
      var strTemplateInventory = JSON.stringify(templateItemObject, null, 2);
      var templateInventory = JSON.parse(strTemplateInventory);
      templateInventory.ItemName = purchasedItem[0];
      templateInventory.ItemCategory = purchasedItem[1];
      templateInventory.Sellin = parseInt(purchasedItem[2]);
      templateInventory.Quality = parseInt(purchasedItem[3]);
      console.log("templateInventory=", templateInventory);

      inventory[inventory.length] = templateInventory;
      console.log("inventory item=", inventory[inventory.length - 1]);  
      retVal = true;
   }
   catch (err) {
      console.log("Item most likely not added - Error:", err);   
      console.log("Error: line input not a CSV format=", line);   
   }
   return (retVal);
}

// Remove Item from the inventory
exports.sell = function(line)  {
   var retVal = false;
   try {
      var index = array.indexOf(line);
      if (index > -1) {
         inventory.splice(index, 1);
         retVal = true;
      }  	
   }
   catch (err) {
      console.log("Item most likely not sold - Error:", err);   
      console.log("Error: line input not a CSV format=", line);   
   }
   return (retVal);
}

// Shows the bad items in inventory
exports.showTrashInventory = function()  {
   // Compute a bad list.
   var trashItems = [];
   const incTrack = 0;
   for ( int inc = 0; inc < inventory.length; inc++ ) {
      if ( inventory[inc].Quality === 0 ) {
         trashItems[incTrack] = inventory[inc];
         incTrack++;
      }
   }
   var strInventory = JSON.stringify(trashItems, null, 2);
   console.log("strInventory=", strInventory);
   return (strInventory);
}



// Restart the inventory at startup
exports.restartInventory = function()  {
   // Convert CSV to JSON object
   const inventory_file_data = fs.readFileSync(inventoryfileorg, { encoding : 'utf8'});
   inventory = inventory.splice(0,inventory.length); // Remove all elements in the array
   inventory = csvjson.toObject(inventory_file_data, csvoptions);
   console.log("inventory restarted=", inventory);
}

// Loads the inventory at startup
exports.packUpInventory = function()  {
   // Convert JSON to CSV object
   var inventory_file_data = csvjson.toCSV(inventory, csvoptions);
   console.log("inventory_file_data=", inventory_file_data);

   fs.writeFile(inventoryfile, inventory_file_data, function(err) {
       if(err) {
           return console.log(err);
       }
       console.log("The " + inventoryfile + "file was saved!");
   }); 
}


