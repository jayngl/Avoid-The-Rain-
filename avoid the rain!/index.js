// --------INFINATE RUNNER GAME------
//---------- AVOID THE RAIN--------
let title = document.getElementById("title");
const startbtn = document.getElementById("play")
let count = 0;
document.addEventListener("keydown",function startGame (event){
    if(event.key === "Enter" ){
        document.removeEventListener("keydown", startGame)
        // screen.removeChild(startbtn)
        startbtn.remove()
        title.remove();
            // player and obstacle from DOM
        const player = document.getElementById("player");
        const obstacle =  document.createElement("div");
        const screen = document.getElementById("screen");
        const restart = document.getElementById("restart");

        // player and obstacle moveamts
        let movementAmt = 50;
        let obmovementAmt = 10;
        // empty to store new calc value for moveamt
        let l = 0;
        let t = 0;
        let randomleft = 0;
        let obstacleRight = 0;
        let playerRight = 0;



        // player movements
        document.addEventListener("keydown", function(event) {

            if (event.key === "d" || event.key ==="ArrowRight") {
                l += movementAmt;
                playerRight = l+80
                l = Math.min(l, screen.clientWidth - player.offsetWidth); // Keep within bounds
                

            } else if (event.key === "a"|| event.key ==="ArrowLeft") {
                l -= movementAmt;
                playerRight = l+80;
                l = Math.max(l, 0); // Keep within bounds
            }
            
            player.style.left = `${l}px`;

        });

        // HANDLES SPAWNING OBSTACLES
        function spawn(){

            randomleft = Math.ceil(Math.random()* l);
            obstacleRight = randomleft+80;
        
            obstacle.style.left = `${randomleft}px`;
            
            
            screen.append(obstacle);
            obstacle.id = "obstacle";
        }

        
        // SPAWN OBSTACLE EVERY 1 SECOND
        let obspawn;
        obspawn= setInterval(() => {
            spawn();
            t=0;
            b=0;
        }, 1000);


        let obmovement;
        let b = 0;
        // OBSTACLE MOVEMENT
        obmovement =  setInterval( function () {
            
            if(t>screen.clientHeight){
                obstacle.remove();   

            }

            else{
                t += obmovementAmt;
                obstacle.style.top = `${t}px`;
                b-=obmovementAmt;
                obstacle.style.bottom = `${b}px`;
                // PLAYER DEATH AND REPLAY?
                let max;
                let min;

        
        
            if(randomleft > obstacleRight){
                max = randomleft;
                min = randomleft+110;

                

            }

            else{
                max = obstacleRight;
                min = randomleft;

                }

            let trueCollision = false
            
            if (b === -280) {
                if ((l > min && l < max && playerRight > min && playerRight < max)||
                    (l > min && l < max && playerRight > min && playerRight > max)||
                    (l < min && l < max && playerRight > min && playerRight < max )) 
                    {

                    
                    trueCollision = true;
                }
            }
                if(trueCollision != false){
                    clearInterval(obmovement);
                    clearInterval(obspawn);
                    clearInterval(scoreCount);


                    if (scorecounter > currentHighScore) {
                        // Update the high score in the DOM
                        
                        highscore.innerHTML = `HI ${scorecounter}`;
                    }
                    movementAmt = 0;
                    title.innerHTML = "YOU DIED!" ;
                    title.style.color = "red";
                    screen.append(title);
                    startbtn.textContent = "Press \"Enter\" To Play Again"
                    screen.append(startbtn)

                        if(event.key === "Enter"){
                            screen.removeChild(obstacle)
                            l = 0
                            document.addEventListener("keydown", startGame)

                            
                        }
     
                }

                
            }

    
        }, 16);


        // PLAYER SCORE
        let scorecounter=0;
        let score = document.getElementById("score");
        let highscore = document.getElementById("highscore");
        let currentHighScore = parseInt(highscore.innerHTML.replace('HI ', '') || '0', 10);
        let scoreCount;
        scoreCount = setInterval(() => {
            scorecounter++;
            score.innerHTML = `SCORE: ${scorecounter.toString().padStart(5,0)}`;
        }, 99);

             
    
    }



})

