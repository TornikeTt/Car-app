$(document).ready(function(){
    let light = false;

    $("#add_New_Car").click(() => {
        if(light == false){
            $(".Take").hide("slow");
            $("body").css("backgroundColor", "rgba(0, 0, 0, 0.9)") ;
            $(".AddNewCar").animate({"top": "50%"},"slow");   
            light = true

        }else{
            $(".Take").show("slow");
            $("body").css("backgroundColor", "white")
            $(".AddNewCar").animate({"top": "-50%"}); 
            light = false
        }
    })
    
    $(".close_img").click(() => {
        $(".Take").show("slow");
        $("body").css("backgroundColor", "white");
        $(".AddNewCar").animate({"top": "-50%"}); 
        location.reload();
        light = false
    })


    $(document).on("click", ".edit",  () => {
        $(".Take").hide("slow");
        $("body").css("backgroundColor", "rgba(0, 0, 0, 0.9)");
        $(".AddNewCar").animate({"top": "50%"},"slow");   
        light = true;
    })


    //for spinner
    $( window ).load("http://localhost:3000/cars" , (responseTxt, statusTxt, xhr) => {  
        if(statusTxt == "error"){
            $(".loading").show()
            
        }else{
            $(".loading").hide()
            
        }      
    });

});



