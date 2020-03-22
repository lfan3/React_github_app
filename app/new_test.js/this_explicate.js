/*function call */
/*function apply can pass an array */
/*bind, same as call but return a function*/
sayName = function(){
    console.log(this.name);
}

sayLangues = function(l1, l2, l3){
    console.log(`${this.name} can speak ${l1} , ${l2} and ${l3}`);
}

var tracy = {
    name: 'merry',
    age: 42
}
var languages = ['al', 'ang', 'fr'];
//in the context of tracy
sayLangues.call(tracy, languages[0], languages[1], languages[2]);
sayLangues.apply(tracy, languages);
var bf = sayLangues.bind(tracy, languages[0], languages[1], languages[2]);
bf();