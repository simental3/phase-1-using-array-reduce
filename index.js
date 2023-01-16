// Using the Array Reduce Method Lab
// Global Variables
const batteryBatches = [4, 5, 3, 4, 4, 6, 5];


// Functions:
// reduce() quickly gets a single summary value from the elements in an array:
const totalBatteries = batteryBatches.reduce((accumulator, currentBattery) => accumulator + currentBattery);
console.log(totalBatteries);
// => 31

/*
// Deliverables:
1. Create a variable named totalBatteries
2. Have it store the sum of numbers of batteries in the batteryBatch array
3. Use the reduce() method to easily find the total


const totalBatteries = batteryBatches.reduce(function (accumulator, currentBattery) {
    return accumulator + currentBattery;
}, 0);
*/