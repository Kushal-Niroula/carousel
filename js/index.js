/* getting dom element and declaring margins and widths*/
var wrapper = document.getElementsByClassName("image-wrapper")[0];
var images = wrapper.getElementsByTagName("img");
const imgWidth=400;
const divWidth = images.length * imgWidth;
wrapper.style.width = divWidth +"px";
var marginLeft = 0;
var left = document.getElementById("left");
var right = document.getElementById("right");
var circles = document.getElementsByClassName("circles")[0];

/*declaring parameters for animation */

const frameRate = 1000/60;
const animationTime = 600;
const step = -1 * (imgWidth*frameRate/animationTime);

/*navigation dots */
for (var i=0 ;i<images.length;i++){
    let dots =document.createElement("i");
    dots.className = "far fa-circle";
    dots.setAttribute("id",`${i}dot`);
    dots.style.padding="2px";
    circles.appendChild(dots);
}
var arryaDots = document.getElementsByClassName("far fa-circle");

/*navigation through dots */
Array.from(arryaDots).forEach(function(dots){
    dots.addEventListener("mouseover",function(){
        dots.style.backgroundColor="blue";
    })
    dots.addEventListener("mouseleave",function(){
        dots.style.backgroundColor="inherit"
    
    })
    dots.addEventListener("click",function(){
        let id =parseInt(dots.id);
        dots.style.backgroundColor="red";
        marginLeft = (-1)* id * imgWidth;
        wrapper.style.marginLeft = marginLeft + "px";
        checkVisibility();

    })
    
    
})

checkVisibility();


/* event listeners for left and right sliders */
left.addEventListener("click",function(){
    let newMargin =marginLeft;
    if (marginLeft%imgWidth == 0){
    let slider = setInterval(function (){
        marginLeft=marginLeft-step;
        wrapper.style.marginLeft= marginLeft + "px";
        if((marginLeft-newMargin)>=imgWidth){
            clearInterval(slider)
            marginLeft=newMargin+imgWidth;
            wrapper.style.marginLeft=marginLeft+"px";
            checkVisibility();
        }
        

    },1000/60)}

    checkVisibility();
  

});


right.addEventListener("click",function(){
    let newMargin =marginLeft;
    if (marginLeft % 400 ==0){
    let slider = setInterval(function (){
        marginLeft=marginLeft+step;
        wrapper.style.marginLeft= marginLeft + "px";
        if((newMargin-marginLeft)>=imgWidth){
            clearInterval(slider)
            marginLeft=newMargin-imgWidth;
            wrapper.style.marginLeft = marginLeft + "px";
            checkVisibility();
        }
        

    },1000/60);}

    checkVisibility();
  

});


let nstep = 0;
setInterval(autoslide,4000);


/* this function performs autosliding */
/* parameters none */
/* uses animation time  , framerate , holdtime to animate */
function autoslide(){
   
   let newMargin=marginLeft;
    if(marginLeft % imgWidth == 0){
       switch(marginLeft){
           case (-1*(images.length-1)*imgWidth):
            nstep= -1*step;
               break;
            case (0):
             nstep = step;
            
            default:
                break;
       }

        let slider = setInterval(function (){
            marginLeft=marginLeft + nstep;
            wrapper.style.marginLeft= marginLeft + "px";
            if((newMargin-marginLeft)>=imgWidth || (marginLeft-newMargin)>=imgWidth){
                if (nstep>0){
                    marginLeft = newMargin +imgWidth;
                }
                else{
                    marginLeft = newMargin-imgWidth;
                }
                wrapper.style.marginLeft = marginLeft + "px";
                clearInterval(slider)

                checkVisibility();
            }
        
    },1000/60)
}}









/* this function checks if the right and left sliders should be visible */
/* if we reach the end of the image list , respective slider sign isnt visible */
function checkVisibility(){
    if(marginLeft>=0){
        left.style.visibility = "hidden";
    }
    else{
        left.style.visibility = "visible";
    }
    if(marginLeft<=(-1)*(divWidth-imgWidth)){
        right.style.visibility = "hidden";
    }
    else{
        right.style.visibility="visible";
    }
}
