//Koby Brown
//Array of my products

var bats = [
    {"name" : "Louisville Slugger",
    "price" : 149.99,
    "image" : 'Louisville.jpg'},

    
     {"name" : "Marucci",
     "price" : 149.95,
     "image" : 'AlbertPujolsBat.jpg'},
 
     
     {"name" : "Rawlings",
     "price" : 89.95,
     "image" : 'Rawlings.jpg'}
]

var cleats = [
    {
        "name" : "Nike",
        "price" : 85.00,
        "image" : 'nike.jpg'
    },
    {
        "name" : "Adidas",
        "price" : 119.99,
        "image" : "adidas.jpg"
    },
    {
        "name" : "New Balance",
        "price" : 109.00,
        "image" : "newbalence.jpg"
    }
]
var gloves = [
    {
        "name" : "Rawlings",
        "price" : 119.99,
        "image" : 'rawlingsglove.jpg'
    },
    {
        "name" : "Easton",
        "price" : 199.99,
        "image" : "eastonglove.jpg"
    },
    {
        "name" : "Wilson",
        "price" : 59.99,
        "image" : "wilsonglove.jpg"
    }
]
var extra_equipment = [
    {
        "name" : "Oakley Shades",
        "price" : 205.00,
        "image" : 'oakley.jpg'
    },
    {
        "name" : "Batting Gloves",
        "price" : 34.94,
        "image" : "primal.jpg"
    },
    {
        "name" : "Evoshield Arm Sleeve",
        "price" : 29.99,
        "image" : "evoshield.jpg"
    }
]

var products =
{
    "bats" : bats,
    "cleats" : cleats,
    "gloves" : gloves,
    "extra_equipment" : extra_equipment,
}

if(typeof module != 'undefined'){
    module.exports.products = products;
}

