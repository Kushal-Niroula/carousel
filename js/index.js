/* getting dom element and declaring margins and widths*/

var wrapper = document.getElementsByClassName("image-wrapper")[0];
var images = wrapper.getElementsByTagName("img");
const imgWidth = 400;
const divWidth = images.length * imgWidth;
wrapper.style.width = divWidth +"px";
var marginLeft = 0;
var left = document.getElementById("left");
var right = document.getElementById("right");
var circles = document.getElementsByClassName("circles")[0];

/*declaring parameters for animation */

const frameRate = 1000/60;
const animationTime = 600;
const step = -1 * (imgWidth * frameRate / animationTime);
const HOLD = 4000;
let nstep = step;

/*navigation dots */
for (var i = 0 ;i < images.length; i++){
    let dots = document.createElement("i");
    dots.className = "far fa-circle";
    dots.setAttribute("id",`${i}dot`);
    dots.style.padding = "2px";
    circles.appendChild(dots);
}


var arryaDots = document.getElementsByClassName("far fa-circle");
var arrayDots = [];


/*navigation through dots */
Array.from(arryaDots).forEach(function(dots){

    arrayDots.push(dots);
    dots.addEventListener("mouseover",function(){
        dots.style.color="blue";
    });
    dots.addEventListener("mouseleave",function(){
        if(dots.style.color !="red"){
            dots.style.color="black";
    }
    
    });
    dots.addEventListener("click",function(){
        let id = parseInt(dots.id);
        dots.style.color = "red";
        marginLeft = (-1) * id * imgWidth;
        wrapper.style.marginLeft = marginLeft + "px";
        checkActive();
        checkVisibility();
        

    });
    
    
});




checkVisibility();
checkActive();


/* event listeners for left and right sliders */
left.addEventListener("click",function(){


    let newMargin = marginLeft;
    if (marginLeft % imgWidth == 0){
    let sliderL = setInterval(function (){
        marginLeft = marginLeft-step;
        wrapper.style.marginLeft = marginLeft + "px";
        if((marginLeft - newMargin) >= imgWidth){
            clearInterval(sliderL)
            marginLeft = newMargin + imgWidth;
            wrapper.style.marginLeft = marginLeft + "px";
            checkVisibility();
            checkActive();
        }
        

    },1000/60)}

    checkVisibility();
    checkActive();
  

});




right.addEventListener("click",function(){

    let newMargin = marginLeft;
    if (marginLeft % 400 == 0){
    let sliderR = setInterval(function (){
        marginLeft = marginLeft + step;
        wrapper.style.marginLeft = marginLeft + "px";
        if((newMargin-marginLeft) >= imgWidth){
            clearInterval(sliderR);
            marginLeft=newMargin - imgWidth;
            wrapper.style.marginLeft = marginLeft + "px";
            checkVisibility();
            checkActive();
        }
        

    },1000/60);}

    
  

});





setInterval(autoSlide,HOLD);


/* this function performs autosliding */
/* parameters none */
/* uses animation time  , framerate , holdtime to animate */
function autoSlide(){
   
   let newMargin = marginLeft;
    if(marginLeft % imgWidth == 0){
       switch(marginLeft){
           case (-1 * (images.length - 1) * imgWidth):
            nstep= -1 * step;
               break;
            case (0):
             nstep = step;
            
            default:
                break;
       }

        let slider = setInterval(function (){
            marginLeft = marginLeft + nstep;
            wrapper.style.marginLeft = marginLeft + "px";
            if((newMargin - marginLeft) >= imgWidth || (marginLeft - newMargin) >= imgWidth){
                if (nstep > 0){
                    marginLeft = newMargin + imgWidth;
                }
                else{
                    marginLeft = newMargin-imgWidth;
                }
                wrapper.style.marginLeft = marginLeft + "px";
                clearInterval(slider);

                checkVisibility();
                checkActive();
            }
        
    },1000/60)
}}









/* this function checks if the right and left sliders should be visible */
/* if we reach the end of the image list , respective slider sign isnt visible */
function checkVisibility(){

    if(marginLeft >= 0){
        left.style.visibility = "hidden";
    }
    else{
        left.style.visibility = "visible";
    }
    if(marginLeft <= (-1) * (divWidth-imgWidth)){
        right.style.visibility = "hidden";
    }
    else{
        right.style.visibility = "visible";
    }

}


/* this functions highlights the  currently active navigation dots */ 
function checkActive(){

    let rem = marginLeft / 400;
    arrayDots.forEach(function(dots){
        dots.style.color = "inherit";
    })
    arrayDots[-rem].style.color = "red";

}

