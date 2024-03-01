let players = [
    {
        name: "BERNARD",
        scoreGlobal: 0,
        scoreRound: 0,
        isCurrentPlayer: true
    },
    {
        name: "FRANCK",
        scoreGlobal: 0,
        scoreRound: 0,
        isCurrentPlayer: false
    },
]
let scoreCurrent = 1
const scoreWin = 500
const scores = { 1: -50, 2: -25, 4: 33, 5: 28, 6: 75 }



const play = () => {
    const rollValue = Math.floor(Math.random()*6)+1
    const player = players.filter(p => p.isCurrentPlayer)[0]

    scoreCurrent = rollValue
    
    if(rollValue == 3){
        audios("lose")
        if(player.scoreRound < 0){
            player.scoreGlobal += player.scoreRound
        }
        player.scoreRound = 0

        // changer de joueur
        changePlayer()
    }else{
        audios()
        player.scoreRound += scores[rollValue]
    }
    updatePlayer(player)

}
const changePlayer = () =>{
    players = players.map(p => {
        p.isCurrentPlayer = ! p.isCurrentPlayer
        return p
    })
    audios("change")
    updateDOM()
}
const updatePlayer = (player) =>{
    players = players.map(p =>{
        if(p.name == player.name){
            return player
        }
        return p
    })
    updateDOM()
    // console.log(players);
}
const updateDOM = () => {
    players.forEach((player, index) =>{
        const position = index + 1
        const className = ".player"+position

        if(player.isCurrentPlayer){
            document.querySelector(className).classList.add("active")
        }else{
            document.querySelector(className).classList.remove("active")
        }
        document.querySelector(className +" .score_global").innerText = player.scoreGlobal
        document.querySelector(className +" .score").innerText = player.scoreRound
    })
    const fileUrl = "/assets/images/face"+scoreCurrent+".png"
    document.querySelector(".game_option_item img").src = fileUrl
}
const hold = () =>{
    console.log("============ HOLD ==============");
    const player = players.filter(p => p.isCurrentPlayer)[0]
    player.scoreGlobal += player.scoreRound
    player.scoreRound = 0
    updatePlayer(player)
    changePlayer()
    if(player.scoreGlobal >= scoreWin){
        // win
        displayModal(player)
    }
}
const reset = () =>{
    console.log("========== reset ==============");
    players = [
        {
            name: "BERNARD",
            scoreGlobal: 0,
            scoreRound: 0,
            isCurrentPlayer: true
        },
        {
            name: "FRANCK",
            scoreGlobal: 0,
            scoreRound: 0,
            isCurrentPlayer: false
        },
    ]
    scoreCurrent = 1

    updateDOM()
    document.querySelector(".modal").classList.add("none")
}
const displayModal = (player) =>{
    document.querySelector(".modal-body").innerText = "Bravo : "+player.name+" a gagné avec "+player.scoreGlobal+" points."
    document.querySelector(".modal").classList.remove("none")
    document.querySelector(".modal button").addEventListener("click", reset)
}
const audios = (name="success")=>{
    const audio = document.createElement("audio")
    audio.src = "/assets/audios/"+name+".wav"
    audio.play()
}


updateDOM()

document.getElementById("roll").addEventListener("click", play)
document.getElementById("hold").addEventListener("click", hold)
document.getElementById("newGame").addEventListener("click", reset)