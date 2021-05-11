//Koby Brown
//Array of my products

var products = [
    {"name" : "Louisville Slugger",
    "price" : 149.99,
    "image" : 'Louisville.jpg'},

    
     {"name" : "Marucci",
     "price" : 149.95,
     "image" : 'AlbertPujolsBat.jpg'},
 
     
     {"name" : "Rawlings",
     "price" : 89.95,
     "image" : 'Rawlings.jpg'},

     
     {"name" : "Axe Pro",
     "price" : 159.99,
     "image" : 'AxePro.jpg'},

     
     {"name" : "DeMarini",
     "price" : 199.99,
     "image" : 'Demarini.jpg'},
];

if(typeof module != 'undefined'){
    module.exports.products = products;
}

