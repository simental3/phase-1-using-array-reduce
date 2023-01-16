// Using the Array Reduce Method Lab Notes


const batteryBatches = [4, 5, 3, 4, 4, 6, 5];

// Code your solution here


/*
// Deliverables:
1. Create a variable named totalBatteries
2. Have it store the sum of numbers of batteries in the batteryBatch array
3. Use the reduce() method to easily find the total
*/


// Learn How the reduce() Method Works
const products = [
    { name: 'Pizza dough', price: 3.99 },
    { name: 'Pepperoni', price: 5.00 },
    { name: 'Cheese', price: 4.99 },
    { name: 'Mozzarella sauce', price: 2.49 }
];

// Basic way to manually add together the prices of the products we want to buy (only works in this situation):
function getTotalAmountForProducts(products) {
    let totalPrice = 0;                             // 1st declare a totalPrice variable & set its initial value to 0

    for (const product of products) {               // iterate through the products in the basket 
        totalPrice += product.price;                // & add the price of each to the total
    };

    return `$ ${totalPrice}`;                       // after the loop has finished, we return the totalPrice
}
console.log(getTotalAmountForProducts(products));   // LOG: $ 16.47

/*
We could make our solution more abstract by writing a generalized function that accepts 2 additional arguments:
an initial value & a callback function that implements the reduce functionality we want
Let's see what this looks, let's count the number of coupons we have around the house:
*/
const couponLocations = [
    { room: 'Living room', amount: 5 },
    { room: 'Kitchen', amount: 7 },
    { room: 'Garage', amount: 3 },
    { room: 'Bedroom', amount: 1 }
];

// reducer = currentValue    element = currentValue    accumulator = initialValue
function ourReduce(array, reducer, initialValue) {          // accepts 3 arguments: the ARRAY we want to reduce, the callback function or REDUCER, & the initial value for our ACCUMULATOR variable
    let accumulator = initialValue;
    for (const element of array) {                          // It then iterates over the array,
        accumulator = reducer(accumulator, element);        // calling the reducer function each time, which returns the updated value of the accumulator
    };
    return accumulator;                                     // The final value of the accumulator is returned at the end
}

function couponCounter(totalAmount, location) {
    return totalAmount + location.amount;
}

console.log(ourReduce(couponLocations, couponCounter, 0));  // LOG: 16

console.log(ourReduce(couponLocations, couponCounter, 3));  // LOG: 19
/*
Note: ourReduce() is generalized: the specifics (the callback function & initial value) have been abstracted out, making
our code more flexible. For ex: If we already have 3 coupons in our hand, we can easily account for that without having
to change any code by adjusting the initial value when we called ourReduce()
*/


// Demonstrate using reduce() with a Primitive Return Value
console.log(couponLocations.reduce(couponCounter, 0));  // also logs 16
// Another simple numerical example:
const doubledAndSummed = [1, 2, 3].reduce(function (accumulator, element){ return element * 2 + accumulator }, 0)    // => 12
// .reduce() with arrow function
const doubledAndSummed2 = [1, 2, 3].reduce((accumulator, initialValue) => initialValue * 2 + accumulator, 0)      // => 12
/*
Just like in the previous example, we are calling .reduce() on our input array & passing it 2 arguments: the callback function, & an optional
start value for the accumulator (0 in this example). reduce() executes the callback for each element in turn, passing in the current value of
the accumulator & the current element each time. The callback updates the value of the accumulator in each iteration, & that updated value is
then passed as the 1st argument to the callback in the next iteration. When there's nothing left to iterate, the final value of the
accumulator (the total) is returned

The initiliazation value is optional, but leaving it out might lead to a real surprise. If no initial value is supplied, the 1ST ELEMENT IN
THE ARRAY is used as the starting value. reduce() then executes the callback function, passing this starting value & the 2ND element of the
array as the 2 arguments. In other words, the code inside the callback IS NEVER EXECUTED for the 1st element in the array. This can lead to
unexpected results:
*/
const doubledAndSummed3 = [1, 2, 3].reduce(function (accumulator, initialValue) { return initialValue * 2 + accumulator })    // => 11
/*
In some cases, it won't matter (e.g, if our reducer is simply summing the elements of the input array). However, to be safe, it is best to
always pass a start value when calling reduce(). Of course, the initial value can be anything we like:
*/
const doubledAndSummedFromTen = [1, 2, 3].reduce(function (accumulator, initialValue) { return initialValue * 2 + accumulator }, 10)     // => 22

array = [2, 4, 10]
const doubledAndSummedFromOneHundred = array.reduce(function (accumulator, initialValue) {
    return initialValue * 2 + accumulator
}, 100)     // => 132

const doubledAndSummedFromOneHundred2 = array.reduce((accumulator, initialValue) => initialValue * 2 + accumulator, 100)      // => 132


// Demonstrate using reduce() with an Object as the Return Value
/*
The output of the reduce() method does not need to be a primitive value like a Number or String. Examples that accumulates array values into an Object.

1st let's look at an example where we take an array of letters & return an object with letters as keys & their count in the array as values
*/
const letters = ['a', 'b', 'c', 'b', 'a', 'a'];

const lettersCount = letters.reduce(function (countObj, currentLetter) {
    if (currentLetter in countObj) {
        countObj[currentLetter]++;      // the callback method increments the current letter's count in the countObj if it already exists
    } else {                            // otherwise,
        countObj[currentLetter] = 1;    // initializes it to 1.
    }
    return countObj;
}, {});                                 // we initiliaze the countObj as an empty objectby passing {} as the 2nd argument to the reduce method.
console.log(lettersCount);      // { a: 3, b: 2, c:1 }

const lettersCount2 = letters.reduce(function (accumulator, currentValue) {
    if (currentValue in accumulator) {
        accumulator[currentValue]++;
    } else {
        accumulator[currentValue] = 1;
    }
    return accumulator;
}, {});
console.log(lettersCount2);      // { a: 3, b: 2, c:1 }
/*
More complex example: We want to create a roster of student artists based on their discipline of art for their final showcase. Our start value
might look like this:
*/
const artsShowcases = {
    "Dance": [],
    "Visual": [],
    "Music": [],
    "Theater": [],
    "Writing": []
}
/*
Imagine we also have a studentSorter object that includes a showcaseAssign() method. That method takes the name of a student as its 1st argument
& returns the name of the showcase the student should be assigned to. Note that we have not coded out the showcaseAssign() method - the details
of how it would work are not important for our purposes. What's important to remember is that the method takes the name of a student as an
argument & returns 1 of the 5 showcases: "Dance", "Visual", "Music", "Theater", or "Writing". We want to call the method for each element in our
input array (each student's name), get the value of the showcase that's returned, & add the student's name to the array for that showcase in the
artsShowcases object.
To do that, we'll call reduce on our input array, incomingStudents, which contains the names of all incoming students, passing a callback function
& the start value of artsShowcases as the arguments. The callback is where we'll push each student name into the appropriate showcase:
*/
incomingStudents.reduce(function(showcases, student) {      // .reduce() executes the callback for each student name in turn
    showcases[studentSorter.showcaseAssign(student)].push(student)     // Inside the callback, the studentSorter.showcaseAssign() method is called with the current student name as its argument. showcaseAssign() returns the name of an Arts Showcase, which is then used as the key to access the correct array in the artsShowcases object and push the student's name into it. The iteration then continues to the next element in the array, passing the next student name and the updated value of artsShowcases as the arguments.
}, artsShowcases)                                                      // Once reduce() has iterated through all the students in incomingStudents, it returns the final value of artsShowcases. 
// Then we can then access the list of students in any Arts Showcase:
artsShowcases["Visual"]     // => [yishayGarbasz, wuTsang, mickaleneThomas]

// Lab: Use reduce() to Create a Single Aggregate of All Times in a List