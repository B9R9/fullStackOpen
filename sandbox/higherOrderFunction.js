var animals = [
    { name: "Joe", species:"dog" },
    { name: "bob", species:"turtle" },
    { name: "doe", species:"cat" },
    { name: "loe", species:"dog" },
    { name: "moe", species:"monkey" },
    { name: "koe", species:"dog" }
]


var isDog = function(animal) {
    return animal.species === 'dog'
}

var dogs =  animals.filter(isDog)

/*
var isDog = animals.filter(function(animal){
    console.log(animal)
    return animal.species === 'dog'
})
*/


var test = animals.map(function(animal) {
    return (animal.name)
})

var orders = [
    { amount: 5 },
    { amount: 10}
]





console.log(test)