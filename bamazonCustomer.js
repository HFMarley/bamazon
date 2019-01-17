var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId);

    start();
});

function start() {
    connection.query ("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("\ID:" + res[i].id + " Product:" + res[i].product_name + ";" + " Price:" + "$" + res[i].price + ";" + " Quantity:" + res[i].stock_quantity);
        }
        shop()
    });
}

function shop() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Please type the ID # of the item that you would like to buy?"
        }
    ]).then(answer => {

        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;

            var goodID = [1,2,3,4,5,6,7,8,9,10];
            var choiceID = parseInt(answer.ID);
            chosenItem = res[choiceID - 1];
            console.log(chosenItem)

            if(goodID.includes(choiceID) === true) {
                quantify();
            }

            else{
                console.log("INVALID ID: Please try again");
                shop()
            }
        })
    })
}

function quantify() {
    inquirer.prompt([
        {
            name: "quantity",
            type: "input",
            message: "How many of this product would you like to buy?"
        }
    ]).then(quant => {
        choiceQuantity = parseInt(quant.quantity);
        // console.log(chosenItem)
        // console.log(choiceQuantity , chosenItem.stock_quantity)
        if (choiceQuantity <= chosenItem.stock_quantity) {
            console.log("You have selected " + chosenItem.product_name + " with a quantity of " + choiceQuantity + ".");
            console.log("Quantity: " + chosenItem.stock_quantity + " Name: " + chosenItem.product_name + " " + chosenItem.id);
            doubleCheck();
        }
        else {
            console.log("Sorry, we do not have enough stock to fulfill your order. Please try again.")
            shop();
        }
    });
}

function doubleCheck() {
    inquirer.prompt([
        {
            name: "verify",
            type: "list",
            message: "Are you sure?",
            choices: ["Yes", "No"]
        }
    ]).then(verify => {
        if (verify.verify === "Yes") {
            updateDB();
        }
        else {
            end();
        }
    })
}

function end() {
    inquirer.prompt([
        {
            name: "end",
            type: "list", 
            message: "Would you like to continue shopping?",
            choices: ["Yes", "No"]
        }
    ]).then(end => {
        if(end.end === "Yes") {
            console.log("\nGreat! Here is our selection:\n")
            start();
        }
        else {
            console.log("Okay, thank you for stopping by.")
            connection.end();
        }
    })
}

function updateDB() {
    var newQuantity = chosenItem.stock_quantity - choiceQuantity;

    connection.query("UPDATE products SET ? WHERE ?", [
        {
            stock_quantity: newQuantity
        },
        {
            id: chosenItem.id
        }
    ],
    function(err) {
        if (err) throw err;
        var total = chosenItem.price * choiceQuantity;
        console.log("Thank you! Your total is going to be $" + total + ".");
        end();
    })
}


