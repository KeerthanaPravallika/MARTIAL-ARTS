let c = document.getElementById("my-canvas");
let ctx = c.getContext("2d");
let audiopunch = new Audio("punch.mp3");
let audiokick = new Audio("kick.wav");
let audioforward = new Audio("forward.mp3");
let audiobackward = new Audio("backward.wav");


let loadImage = (src,callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};

let imagePath = (frameNum , animation) => {
    return "images/" + animation+"/" +frameNum+".png";
}

let frames = {
    idle: [1,2,3,4,5,6,7,8],
    kick:   [1,2,3,4,5,6,7],
    punch:   [1,2,3,4,5,6,7],
    forward:[1,2,3,4,5,6],
    backward : [1,2,3,4,5,6]
};

let loadImages = (callback) => {
    let images = {idle:[],kick:[],punch:[],forward:[],backward:[]};
    let imagesToLoad = 0;

    ["idle","kick","punch","forward","backward"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToLoad = imagesToLoad + animationFrames.length;
        animationFrames.forEach((frameNum) => {
            let path = imagePath(frameNum,animation);

            loadImage(path,(image) => {
                images[animation][frameNum-1] = image;
                imagesToLoad -= 1;
   
                if(imagesToLoad === 0)
                    callback(images);
            });
        })
    })
}; 

let animate = (ctx,images,animation,callback) => {
    images[animation].forEach((image,index) => {
        setTimeout(() => {
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,0,0,500,500);
        }, index*100);
    });
    setTimeout(callback,images[animation].length * 100);
}


loadImages((images) => {

    let queuedAnimations = [];

    
    let aux = () => {
        let selectedAnimation;

        if(queuedAnimations.length === 0){
            selectedAnimation = "idle";
        }else{
            selectedAnimation = queuedAnimations.shift();
        }
        animate(ctx,images,selectedAnimation,aux);
    };
    aux();

    document.getElementById("kick").onclick = () => {
        queuedAnimations.push("kick");
        setTimeout(audiokick.play(),2000);
        
    };
    document.getElementById("punch").onclick = () => {
        queuedAnimations.push("punch");
        setTimeout(audiopunch.play(),2000);
    };
    document.getElementById("forward").onclick = () => {
        queuedAnimations.push("forward");
        setTimeout(audioforward.play(),2000);
    };
    document.getElementById("backward").onclick = () => {
        queuedAnimations.push("backward");
        setTimeout(audiobackward.play(),2000);
    };

    document.addEventListener("keyup" , (event) => {
        const key = event.key;

        if(key === "ArrowLeft"){
            queuedAnimations.push("backward");
            setTimeout(audiobackward.play(),2000);
        } else if(key === "ArrowRight"){
            queuedAnimations.push("forward");
            setTimeout(audioforward.play(),2000);
        } else if(key === "ArrowUp"){
            queuedAnimations.push("kick");
            setTimeout(audiokick.play(),2000);
        }
        else if(key === "ArrowDown"){
            queuedAnimations.push("punch");
            setTimeout(audiopunch.play(),2000);
        }
    })

   
});

