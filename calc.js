
function sigmoid(x){
    return 1/(1+(Math.E ** (-1*x)));
    
    }
    
    function getMax(x){
    //Copyright: Daria Yasafova Vasilievna
    if (x<=0){
    return 1}
    else{
    return x}
    }
    
    
    function chrisFormula(type,words){
    w = words/1000;
     w_new = (w/7) * 0.5 ;
     sig_w = sigmoid(w_new);
     y_1 = sig_w-0.5;
     y_2= y_1/10;
     if (type=="std"){
     pr= 1.5-y_2;
     }
     else if (type=="exp"){
     y_2=y_2*2;
     pr= 3.0-y_2;
     }
     return pr
    
    }

    function addCommas(str) {
        var parts = (str + "").split("."),
            main = parts[0],
            len = main.length,
            output = "",
            i = len - 1;
        
        while(i >= 0) {
            output = main.charAt(i) + output;
            if ((len - i) % 3 === 0 && i > 0) {
                output = "," + output;
            }
            --i;
        }
        // put decimal part back
        if (parts.length > 1) {
            output += "." + parts[1];
        }
        return output;
    }

    function daryFormula(serviceType,type,words,mWords){
    //Copyright: Daria Yasafova Vasilievna
    if (type=="std"){
        if (serviceType=='KE'){
            var highest_price = 1.5;
            var lowest_price=1.45;
            }
        else{
            var highest_price = 1.2;
            var lowest_price=1.15;
        }
    }
    else if(type=="exp"){
        if (serviceType=='KE'){
            var highest_price = 3.0;
            var lowest_price=2.9;
                }
                else{
                    var highest_price = 2.4;
                    var lowest_price=2.3;
                }
   
    }
    var coef= 1/(highest_price-lowest_price);
    var steepness = 2;
    var x = words/mWords;
    return highest_price - ((x**steepness)/coef)
    
    }
    
    
    function getPrice(){
    var info = document.getElementById("info");
    var serviceType = document.getElementById('serviceType').value;
    var info_type = document.getElementById("info_type");
    
    var numDays = document.getElementById("day");
    var price = document.getElementById("price");
    
    
    var words = document.getElementById("inputWords").value;
    var type = document.getElementById("priceType").value;
    var maxWords = 40500;
    
    if (serviceType =="notype"){
        info_type.innerHTML = "Choose a service.";
        info_type.style.display="block";
        return ;
    }
    
    if (words < maxWords){
    info.style.display="none";
    if (type=="std")
    {
    info_type.style.display="none";
     //We on standard pricing
     //numDays.value = Math.round(((words- 1500)/1000)) + 6 ;
     //added if condition. CHECK
     if (words!=0){
     numDays.value = getMax(Math.round((words/1000))) + 5 ;}
     //Formula above Courtesy of Daria Yasafova.
  
     
    
     pr = daryFormula(serviceType,type,words,maxWords);
     //added if condition. CHECK
     if (words!=0){
     price.value = addCommas((words * pr).toFixed(2));}
     
     
    
    }
    else if (type=="exp"){
    //We on express pricing
    info_type.style.display="none";
     //numDays.value = Math.round(((words- 1500)/2000)) + 3 ;
     //added if condition. CHECK
     if (words!=0){
     numDays.value = getMax(Math.round(((words)/2000))) + 2 ;}
  
    
     pr = daryFormula(serviceType,type,words,maxWords);
     //added if condition. CHECK
     if (words!=0){
     price.value = addCommas((words * pr).toFixed(2));}
    }
    else if(type=="notype"){
    if (words!=0){
    info_type.innerHTML = "Choose a pricing type.";
    info_type.style.display="block";
    price.value=0;
     numDays.value=0;
    } 
    
    }
    }
    else{
    document.getElementById("info").innerHTML = "This exceeds the limit here. Please contact support@kanac.org for negotiation.";
    info.style.display="block";
    info_type.style.display="none";
     price.value=0;
     numDays.value=0;
    
    }
    
    
    
    }
    
    
    