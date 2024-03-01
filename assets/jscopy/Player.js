import { lose_score, scores, winScore } from "../constantes/constantes.js"

export var scor_value = 1


export class Player {
    constructor(name, secondPlayer = null) {
        this.name = name
        this.currentScore = 0
        this.globalScore = 0
        this.secondPlayer = secondPlayer
        this.isCurrentPlayer = false
        
    }
    
    hold() {
        
        console.log("maaec");
        this.globalScore += this.currentScore
        this.currentScore = 0
        if(!this.isWin())
            this.changePlayer()
    }
    isWin() {
        return this.globalScore >= winScore
    }
    addSecondPlayer(player) {
        this.secondPlayer = player
        player.secondPlayer = this
        if (!this.isCurrentPlayer && !player.isCurrentPlayer) {
            this.isCurrentPlayer = true
        }

    }
    resetScore() {
        this.globalScore = 0
        this.currentScore = 0
        document.querySelector(".modal").classList.add("none")
    }
    roll() {
        console.log("start");
        if (this.isCurrentPlayer) {
            let rollValue = Math.ceil(Math.random() * 6)
            scor_value = rollValue
            console.log(`${this.name} a joué ${rollValue}`);


            if (lose_score.includes(rollValue)) {
                // perdu 
                if (this.currentScore < 0) {
                    this.globalScore += this.currentScore
                }

                this.currentScore = 0
                this.changePlayer()
                console.log(`${this.name} a perdu avec ${this.globalScore}`);

            } else {
                //peux continuer - gagne ou perdu des points 
                this.currentScore += scores[rollValue]
                console.log(`${this.name} a gagné ${scores[rollValue]} point(s)`);
            }
        }
        

    }
    changePlayer() {
        // console.log( { [this.name]: this.globalScore, [this.secondPlayer.name]: this.secondPlayer.globalScore })
       
        this.isCurrentPlayer = false
        if (this.secondPlayer) {

            this.secondPlayer.isCurrentPlayer = true
        }
    }
   
}

