/**
 * QUnitTestMachine global namespace object
 */
var QUnitTestMachine = {};

/**
 * QUnitTestMachine defaults namespace object
 * Defautls properties that are public to change
 */
QUnitTestMachine.defaults = {
	prefix : 'test_'
};

/**
 * QUnitTestMachine scripts namespace object
 * Manipulate scripts that are necessary to run tests
 */
QUnitTestMachine.scripts = {
	path : null,
	list : new Array(),
	add : function(){
		var args = arguments;
		if(args.length > 0){
			var length = args.length;
			for(var i=0;i<length;i++){
				this.list.push(arguments[i]);
			}
		}
	}
};