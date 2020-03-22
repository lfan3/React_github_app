/*this inside of an Object*/
var me = {
    name: 'Tyler',
    age:25,
    sayNameA: function(){
        console.log(this.name);
    }
}
me.sayNameA();

/*this inside the function */
var sayNameMixin = function(ob){
    ob.sayName = function(){
        console.log(this.name)
    }
    console.log('ok')
}

var he = {
    name:'james',
    age: 24
}

sayNameMixin(he);
he.sayName();

/*this inside a function returning an object */
var Person = function(name, age){
    return{
        name: name,
        age: age,
        sayName:function(){
            console.log(this.name);
        },
        mother:{
        //    name: 'Sophie',
            sayName: function(){
                console.log(this.name);
            }
        }
    }
}

var she = Person('marie', 25);
she.sayName();
she.mother.sayName();