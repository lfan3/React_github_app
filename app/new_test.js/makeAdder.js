function add(x, y){
    return (x + y);
}

function addFive(x, cb){
    return cb(x, 5)
}

function makeAdder(y, cb){
    return function(x){ 
        return cb(x, y)
    }
}
addTen = makeAdder(10, add);
let ten = addTen(5);
console.log(ten);
console.log(makeAdder(10, add)(5));