/**
 * Manipulate QUnitTestMachine just when DOM is fully loaded
 */
$(document).ready(function(){

    // Set App that QUnitTestMachine must to run
    QUnitTestMachine.defaults.path = 'http://localhost/Javascript/appteste/';

    // Just add some JS files that we must to test
    QUnitTestMachine.scripts.add('script1.js','script2.js','script3.js','script4.js');

    // Init
    QUnitTestMachine.init();
});