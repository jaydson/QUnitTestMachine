/**
 * Manipulate QUnitTestMachine just when DOM is fully loaded
 */
$(document).ready(function(){

    // Set App that QUnitTestMachine must to run
    QUnitTestMachine.defaults.path = 'http://localhost/Javascript/appteste/';

    // Set a file test prefix
    QUnitTestMachine.defaults.prefix = 'test_';
    
    // Just add some JS files that we must to test
    QUnitTestMachine.scripts.add('script1.js','script2.js');
    /*QUnitTestMachine.scripts.add({
        "scripts": [
            {name: "script4.js"},
            {name: "script5.js"},
            {name: "script6.js"},
            {name: "script7.js"},
            {name: "script8.js"},
            {name: "script9.js"},
            {name: "script10.js"},
            {name: "script11.js"},
            {name: "script12.js"},
            {name: "script13.js"}]
    });*/

    // Init
    QUnitTestMachine.init();
});