/**
 * QUnitTestMachine global namespace object
 */
var QUnitTestMachine = {

    /**
     * Init function, just call a function that load necessary scripts
     */
    init : function(){
        this.loadScripts();
		
		// Bind event to button that show log
        $('#qunit_test_machine_button').bind('click',function(){
             $('#qunit_test_machine').toggle('fast');
        });
    },


    /**
     * Scan a list of necessary scripts and load them
     */
    loadScripts : function(){
		
        var scripts = this.scripts.list,
        scriptsLength = scripts.length,
        path = this.defaults.path,
        prefix = this.defaults.prefix,
        elem = document.getElementById('qunit_test_machine_error');
        
        if(scriptsLength > 0){
            
            // Start to load scripts
            for(var i=0;i<scriptsLength;i++){
			
				// Get script name
				var fileName = scripts[i];
				
                $.ajax({
                    url: path+fileName,
                    dataType: 'script',
                    async: false,
                    
                    // Ok, script loaded, so run to get the test script
                    success: function(){

                        // Show which script was loaded
                        var loadeds = document.getElementById('qunit_test_machine_loaded');
                        loadeds.innerHTML += '<span style="color:#5E740B"><b>Ok</b> - ' + path + fileName + '</span><br>';
                        $.ajax({
                            url: path + QUnitTestMachine.util.getPath(fileName) + prefix + QUnitTestMachine.util.getFileName(fileName),
                            dataType: 'script',
                            async: false,
                            
                            // Show which script was loaded
                            success : function(){
                                 loadeds.innerHTML += '<span style="color:#5E740B"><b>Ok</b> - ' + path + prefix + QUnitTestMachine.util.getFileName(fileName) + '</span><br>';
                            },
                            
                            // Some trouble loading test file, show it
                            error: function(xhr){
                                var message = 'Error loading <a href="'+  path + prefix + QUnitTestMachine.util.getFileName(fileName) +'">'+
                                               prefix + fileName + '</a> (' + xhr.status + ' - ' + xhr.statusText +
                                              ') Make sure that you created a test file.' +'<br>';

                                elem.innerHTML+= message;
                                $('#qunit_test_machine').css('display','block');
                            }
                        });
                    },
                    
                    // Some trouble loading script, show it
                    error: function(xhr){
                        var message = 'Error loading <a href="'+  path + fileName +'">' +
                                       fileName + '</a> (' + xhr.status + ' - ' + xhr.statusText + ')<br>';
                        elem.innerHTML+= message;
                        $('#qunit_test_machine').css('display','block');
                    }
                });
            }
        }	
    }
};

/**
 * QUnitTestMachine defaults namespace object
 * Defautls properties that are public to change
 */
QUnitTestMachine.defaults = {
    path : null,
    prefix : 'test_'
};

/**
 * QUnitTestMachine scripts namespace object
 * Manipulate scripts that are necessary to run tests
 */
QUnitTestMachine.scripts = {

    /**
    * Scripts to load
    */
    list : new Array(),

    /**
    * Add scripts to list
    * Two formats are suported:
    * - A simple String, like this-> add('script1.js','script2.js')
    * - An simple Json object like this->
    * {"scripts": [
    *    {name: "script4.js"},
    *    {name: "script5.js"}]
    * }
    */
    add : function(){
        var args = arguments;
        if(args.length == 1 && typeof args[0] == "object"){
            var obj = args[0].scripts;
            for(var i=0;i<obj.length;i++){
                this.list.push(obj[i].name);
            }
        }else{
            var length = args.length;
            for(var i=0;i<length;i++){
                this.list.push(arguments[i]);
            }
        }
    }
};

/**
 * QUnitTestMachine util namespace object
 * Some useful methods
 */
QUnitTestMachine.util = {
	
	/**
	 * Pattern to get path and file name
	 * Credits: http://lawrence.ecorp.net
	 */
	script_pattern : /(.*)[\/\\]([^\/\\]+\.\w+)$/,
	
	/**
	 * Get file name
	 * Credits: http://lawrence.ecorp.net
	 */
	getFileName : function(str){
		var m = str.match(this.script_pattern);
		return m ? m[2] : str;
	},

	/**
	 * Get path
	 * Credits: http://lawrence.ecorp.net
	 */	
	getPath : function(str){
		var m = str.match(this.script_pattern);
		return m ? m[1]+'/' : str;
	}
}
