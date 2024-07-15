service MyService @(path: 'MyService') {
 
    function greetings(name:String(20)) returns String;

    function multiply(a:Int16,b:Int16) returns Int16;
 
}