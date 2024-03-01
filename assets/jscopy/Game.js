import { Player, scor_value } from "./Player.js"

var hold = document.querySelector("#hold")
var roll = document.querySelector("#roll")
var reset = document.querySelector("#newGame")



export class Game {
    constructor(p1 = null, p2 = null) {

        this.firstPlayer = p1 ? p1 : new Player("bob")
        this.secondPlayer = p2 ? p2 : new Player("alain")
        this.firstPlayer.addSecondPlayer(this.secondPlayer)
        this.players = [this.firstPlayer, this.secondPlayer]
        this.initDOM()
    }


    updateDOM() {
        this.players.forEach((player, index) => {
            const position = index + 1
            const className = ".player" + position
            if (player.isCurrentPlayer) {
                document.querySelector(className).classList.add("active")
            } else {
                document.querySelector(className).classList.remove("active")
            }
            document.querySelector(className + " .score_global").innerText = player.globalScore
            document.querySelector(className + " h2").innerText = player.name
            document.querySelector(className + " .score").innerText = player.currentScore
        })
        const fileUrl = "/assets/images/face" + scor_value + ".png"
        document.querySelector(".game_option_item img").src = fileUrl

    }

    initDOM() {
        this.updateDOM()
        this.initEvent()
    }
    getCurrentPlayer() {
        if (this.firstPlayer.isCurrentPlayer) {
            return this.firstPlayer
        }
        if (this.secondPlayer.isCurrentPlayer) {
            return this.secondPlayer
        }
        return null
    }
    playGame() {
        this.getCurrentPlayer().roll()
        this.updateDOM()


        // console.log(this.getCurrentPlayer());
        // let index = 0
        // while(!this.firstPlayer.isWin() && !this.secondPlayer.isWin()){
        //    if(index % 6){
        //     this.getCurrentPlayer()?.hold()
        //    }else{
        //     this.getCurrentPlayer()?.roll()
        //    }

        //     index++
        // }

        this.winner = this.firstPlayer.isWin() ? this.firstPlayer : this.secondPlayer

        console.log(`${this.winner.name} a gagné avec ${this.winner.globalScore} point(s)`)


    }

    getWinner() {
        if (this.firstPlayer.isWin()) {
            return this.firstPlayer
        }
        if (this.secondPlayer.isWin()) {
            return this.secondPlayer
        }
        return null
    }

    showModal() {
        const winner = this.getWinner()
        if (winner) {
            document.querySelector(".modal-body").innerText = `Bravo : ${winner.name} a gagné avec ${winner.globalScore} point(s)`
            document.querySelector(".modal").classList.remove("none")
            document.querySelector(".modal button").addEventListener("click",this.initRound.bind(this))
        }

    }


    initRound() {
        this.players.forEach((player) => {
            player.currentScore = 0
            player.globalScore = 0
            document.querySelector(".modal").classList.add("none")
        })
    }
    initEvent() {
        hold.onclick = () => {
            this.getCurrentPlayer().hold()
            this.updateDOM()
            this.showModal()

        }
        roll.onclick = () => {
            this.getCurrentPlayer().roll()
            this.updateDOM()
        }
        reset.onclick = () => {
            this.players.forEach((player) => {
                player.resetScore()
            })
            this.updateDOM()
        }


    }
}