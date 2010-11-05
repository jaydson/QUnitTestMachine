/**
 * Manipulate QUnitTestMachine just when DOM is fully loaded
 */
$(document).ready(function(){

    // Set App that QUnitTestMachine must to run
    QUnitTestMachine.defaults.path = 'http://localhost:81/';

    // Set a file test prefix
    QUnitTestMachine.defaults.prefix = 'test_';
    
    // Just add some JS files that we must to test
    QUnitTestMachine.scripts.add({
        "scripts": [
            {name: "app/js/myscript.js"},
            {name: "app2/myscript2.js"}
		]
    });

    // Init
    QUnitTestMachine.init();
});