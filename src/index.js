//          DOM
const charBar = document.getElementById("character-bar");
const Info = document.getElementById("detailed-info");
const Jina = document.getElementById("name");
const Picha = document.getElementById("image");
const vc = document.getElementById("vote-count");
const vf = document.getElementById("votes-form");
const votes = document.getElementById("votes")


//          variables
let currentID = 0;
let currentVotes = 0;


//          Display all Flatacuties
function displayFlatacuties(){
    fetch("http://localhost:3000/characters")
    .then((newValue)=>newValue.json())
    .then((flataCuties)=>{

        /*
            {
                "id": 1,
                "name": "Mr. Cute",
                "image": "https://thumbs.gfycat.com/EquatorialIckyCat-max-1mb.gif",
                "votes": 0
            }
        */


        for (x of flataCuties) {
            const name = document.createElement("span")
            name.innerText = x.name
        
            charBar.appendChild(name);
            let faltaName = x.name
            let pich = x.image
            let id = x.id
            let Vs = x.votes
            
            name.addEventListener("click", ()=>{
                
                
                Jina.innerText = faltaName;
                Picha.src = pich ;
                let votesamounts = votes.value;
                 
                vc.innerText = Vs;
                console.log(Vs);
                currentID = id;
                currentVotes = Vs;

            })
        }
    })
}

vf.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents page reload
    let update = {
        votes: parseInt(votes.value, 10) + parseInt(currentVotes, 10)
    }
    console.log("Votes entered:", votes);
    fetch(`http://localhost:3000/characters/${currentID}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(update)
    })
});



displayFlatacuties()