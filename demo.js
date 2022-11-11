class demonstration {
	#privateVar; // Private variable
	publicVar; // Public variable
	get publicFinalVar() { // Public final variable
		return "this variable is public but unredefinable";
	}
	#privateFunction() { // Private function
		console.log("this function is private");
	}
	publicFunction() { // Public function (Object.publicFunction();)
		console.log("this function is public and redefinable");
	}
	get getPrivateVar() { // Public final function get #privateVar (Object.getPrivateVar();)
		return function() {
			return this.#privateVar;
		};
	}
	get setPrivateVar() { // Public final function set #privateVar (Object.setPrivateVar(value);)
		return function(value) {
			this.#privateVar = value;
		};
	}
	get runPrivateFunction() { // Public final function run #privateFunction() (Object.runPrivateFunction();)
		return  function() {
			this.#privateFunction();
		};
	}
	constructor(privateVar) { // Constructor
		this.#privateVar = privateVar;
		this.publicVar = "this variable is public and redefinable";
	}
}

const test = new demonstration(11); // Create instance of class demonstration

test.#privateVar; // Error
test.getPrivateVar(); // #privateVar is 11
test.setPrivateVar(19); // #privateVar will be redefined to 19
test.getPrivateVar(); // #privateVar is 19
test.getPrivateVar = "this function is final, it wont be redefined";
test.getPrivateVar() = "this function is final, it wont be redefined"; // Error
test.getPrivateVar(); // #privateVar is 19

test.publicVar; // publicVar is 'this variable is public and redefinable'
test.publicVar = "this variable will be redefined";
test.publicVar; // publicVar is 'this variable will be redefined'

test.publicFinalVar; // publicFinalVar is 'this variable is public but unredefinable'
test.publicFinalVar = "this variable is final, it wont be redefined";
test.publicFinalVar; // publicFinalVar is 'this variable is public but unredefinable'

test.#privateFunction(); // Error
test.runPrivateFunction(); // Console log 'this function is private'

test.publicFunction(); // Console log 'this function is public and redefinable'
test.publicFunction = function() {console.log("this function will be redefined");};
test.publicFunction(); // Console log 'this function will be redefined'
