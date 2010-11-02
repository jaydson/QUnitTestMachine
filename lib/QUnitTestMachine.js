/**
 * QUnitTestMachine global namespace object
 */
var QUnitTestMachine = {

    /**
     * Init function, just call a function that load necessary scripts
     */
    init : function(){
        this.loadScripts();
    },


    /**
     * Scan a list of necessary scripts and load them
     */
    loadScripts : function(){
        
        var scripts = this.scripts.list;
        var scriptsLength = scripts.length;
        var path = this.defaults.path;
        var prefix = this.defaults.prefix;
        
        if(scriptsLength > 0){
            for(var i=0;i<scriptsLength;i++){
                $.ajax({
                  url: path+scripts[i],
                  dataType: 'script',
                  async: false,
                  success: function(){
                     $.ajax({
                      url: path + prefix + scripts[i],
                      dataType: 'script',
                      async: false,
                      success: function(){
                      },
                      error: function(XMLHttpRequest){
                        $('#qunit_test_machine').css('display','block');
                        document.getElementById('qunit_test_machine_error').innerHTML+= 'Error loading '+ prefix + scripts[i] +
                            ' (' + XMLHttpRequest.status + ' - ' + XMLHttpRequest.statusText +
                            ') Make sure that you created a test file.' +'<br>';
                      }
                    });
                  },
                  error: function(XMLHttpRequest){
                    $('#qunit_test_machine').css('display','block');
                    document.getElementById('qunit_test_machine_error').innerHTML+= 'Error loading '+scripts[i] +
                        ' : ' + XMLHttpRequest.status + ' - ' + XMLHttpRequest.statusText + '<br>';
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
