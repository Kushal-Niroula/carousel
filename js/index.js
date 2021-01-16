var wrapper = document.getElementsByClassName("image-wrapper")[0];
var images = wrapper.getElementsByTagName("img");
const imgWidth=400;

const divWidth = images.length * imgWidth;
wrapper.style.width = divWidth +"px";
var marginLeft = 0;
var left = document.getElementById("left");
var right = document.getElementById("right");

var circles = document.getElementsByClassName("circles")[0];

for (var i=0 ;i<images.length;i++){
    let dots =document.createElement("i");
    dots.className = "far fa-circle";
    dots.setAttribute("id",`${i}dot`);
    dots.style.padding="2px";
    circles.appendChild(dots);
}
var arryaDots = document.getElementsByClassName("far fa-circle");
var flag=0;
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
left.addEventListener("click",function(){
    let newMargin =marginLeft;
    let slider = setInterval(function (){
        marginLeft=marginLeft+4;
        wrapper.style.marginLeft= marginLeft + "px";
        if((marginLeft-newMargin)>=imgWidth){
            clearInterval(slider)
            marginLeft=newMargin+imgWidth;
            wrapper.style.marginLeft=marginLeft+"px";
            checkVisibility();
        }
        

    },1000/60)

    checkVisibility();
  

});

right.addEventListener("click",function(){
    let newMargin =marginLeft;
    let slider = setInterval(function (){
        marginLeft=marginLeft-4;
        wrapper.style.marginLeft= marginLeft + "px";
        if((newMargin-marginLeft)>=imgWidth){
            clearInterval(slider)
            marginLeft=newMargin-imgWidth;
            wrapper.style.marginLeft = marginLeft + "px";
            checkVisibility();
        }
        

    },1000/60);

    checkVisibility();
  

});


function checkVisibility(){
    if(marginLeft===0){
        left.style.visibility = "hidden";
    }
    else{
        left.style.visibility = "visible";
    }
    if(marginLeft===(-1)*(divWidth-imgWidth)){
        right.style.visibility = "hidden";
    }
    else{
        right.style.visibility="visible";
    }
}
