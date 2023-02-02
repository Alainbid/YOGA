const main = document.querySelector("main");

let referenceArray = [
  { pic: 0, min: 1 },
  { pic: 1, min: 1 },
  { pic: 2, min: 1 },
  { pic: 3, min: 1 },
  { pic: 4, min: 1 },
  { pic: 5, min: 1 },
  { pic: 6, min: 1 },
  { pic: 7, min: 1 },
  { pic: 8, min: 1 },
  { pic: 9, min: 1 },
];
let exerciseArray = [];
let stopActif = false;

//******** function qui s'execute seule au lancement */
(() => {
  if (localStorage.elements) {
    exerciseArray = JSON.parse(localStorage.elements);
  } else {
    exerciseArray = referenceArray;
  }
})();

//************  CLASS EXERCISE  */
class Exercise {
  constructor() {
    this.index = 0;
    this.minutes = exerciseArray[this.index].min;
    this.secondes = 0;
  }
  updateCountdown() {
    let s = "0";

    const timeoutActif = setTimeout(() => {
      if (this.minutes === 0 && this.secondes === 0) {
        this.index++;
        this.ring();
        if (this.index < exerciseArray.length) {
          this.minutes = exerciseArray[this.index].min;
          this.secondes = 0;
          this.updateCountdown();
        } else {
          return page.finish();
        }
      } else if (this.secondes === 0) {
        this.minutes--;

        this.secondes = 59;

        this.updateCountdown();
      } else {
        this.secondes--;

        this.updateCountdown();
      }
    }, 1000);

    if (stopActif) {
      clearTimeout(timeoutActif);
      return page.lobby();
    }

    this.secondes < 10 ? (s = "0" + this.secondes) : (s = this.secondes);
    return (main.innerHTML = `
    <div class="exercice-container"/>
      <p> ${this.minutes}:${s} </p>
        <img src="./img/${exerciseArray[this.index].pic}.png"/>
        <p>Exercice ${this.index + 1} de ${exerciseArray.length}</p>
        </div>
    `);
  }

  ring() {
    const audio = new Audio();
    audio.src = "ring.mp3";
    audio.play();
  }
}

//********************************** */
//***********  LES FONCTIONS UTILES */
const utils = {
  //********* GESTION DU CONTENU DE LA PAGE */
  pageContent: function (tittle, content, btn) {
    document.querySelector("h1").innerHTML = tittle;
    main.innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;
  },

  //**********  GESTION DU CHANGEMENT DE MINUTES */
  handleEventMinutes: function () {
    document.querySelectorAll("input[type='number']").forEach((element) => {
      element.addEventListener("input", (e) => {
        exerciseArray.map((exo) => {
          // console.log(e);
          if (e.target.id == exo.pic) {
            exo.min = parseInt(e.target.value);
            this.store();
          }
        });
      });
    });
  },

  //***************  GESTION DE LA FLECHE */
  handleEventArrow() {
    document.querySelectorAll(".arrow").forEach((element) => {
      element.addEventListener("click", (e) => {
        let ref = 0;
        const pic = e.target.dataset.pic;

        // console.log("pic ", pic);
        // console.log(exerciseArray[ref].pic);
        if (ref < 0) {
          alert(" Vous ne pouvez pas déplacer le premier élément");
        } else {
          exerciseArray
            .map((position) => {
              if (exerciseArray[ref].pic == pic) {
                if (ref - 1 >= 0) {
                  const picBefore = exerciseArray[ref - 1];
                  exerciseArray[ref - 1] = exerciseArray[ref];
                  exerciseArray[ref] = picBefore;
                  page.lobby();
                  this.store();
                } else {
                  let n9 = exerciseArray[0];
                  for (z = 0; z <= 9; z++) {
                    exerciseArray[z] = exerciseArray[z + 1];
                  }
                  exerciseArray[9] = n9;
                  // console.log(exerciseArray);
                  page.lobby();
                  this.store();
                }
              }
              ref++;
            })
            .join("");
        }
      });
    });
  },

  //**************  SUPPRIMER UN ELEMENT */

  deleteItem: function () {
    document.querySelectorAll(".deletebtn").forEach((element) => {
      element.addEventListener("click", (e) => {
        const pic = e.target.dataset.pic;
        // console.log(pic);
        let newArray = [];
        exerciseArray.map((position) => {
          if (position.pic != pic) {
            newArray.push(position);
          }
        });
        exerciseArray = newArray;
        // console.log(exerciseArray);
        page.lobby();
        this.store();
      });
    });
  },

  //********* REBOOTER */
  rebooter: function () {
    document.getElementById("reboot").addEventListener("click", (e) => {
      // console.log(e);
      // console.log(oldArray);
      exerciseArray = referenceArray;
      page.lobby();
      this.store();
    });
  },

  store: function (params) {
    localStorage.elements = JSON.stringify(exerciseArray);
    // console.log(localStorage.elements);
  },

  commencer: function () {
    document.getElementById("start").addEventListener("click", (e) => {
      page.routine();
    });
  },
};

//*************  PAGE LOBBY */
const page = {
  lobby: function () {
    stopActif = false;
    //préparation des cards
    let mapArray = exerciseArray
      .map(
        (exo) =>
          `<li>
            <div class="card-header">
            <input type="number" id=${exo.pic} min="1" max="10" value=${exo.min}>
            <span>min    
        
          </span>
            </div>
            <img src="./img/${exo.pic}.png" alt="photo">
          <i class="fas fa-arrow-alt-circle-left arrow" data-pic=${exo.pic}></i>
          <i class="fas fa-times-circle deletebtn" data-pic=${exo.pic}></i>
            </li>`
      )
      .join("");

    utils.pageContent(
      "Paramétrage <div class='tooltip'><i id='reboot' class='fas fa-undo'/><span class='tooltiptext'>Réinitialiser les exercices</span></div>",
      "<ul>" + mapArray + "</ul>",
      // "Commencer"
      "<button id='start'>Commencer</button>"
    );
    utils.handleEventMinutes();
    utils.handleEventArrow();
    utils.deleteItem();
    utils.rebooter();
    utils.commencer();
  },

  //************* PAGE ROUTINE */
  routine: function () {
    const exercise = new Exercise();
    utils.pageContent(
      "Routine",
      exercise.updateCountdown(),
      "<button id='start' class= 'stop'>Stop</button>"
    );
    //***arret d'urgence */
    document.querySelector(".stop").addEventListener("click", (e) => {
      stopActif = true;
    });
  },

  //************  PAGE FINISH */
  finish: function () {
    utils.pageContent(
      "C'est terminé",
      "<button id='restart'>Recommencer</button>",

      // "<button id ='rereboot' class='btn-reboot'>Réinitialiser<i class = 'fas fa-play-circle'></i></button>"
      "<button id ='start' class='reBoot' >Réinitialiser<i class = 'fas fa-play-circle'></i></button>"
    );

    restart.addEventListener("click", (e) => {
      page.routine();
    });
    document.querySelector(".reBoot").addEventListener("click", () => {
      exerciseArray = referenceArray;
      localStorage.elements = JSON.stringify(exerciseArray);
      page.lobby();
    });
  },
};
// page.finish();
page.lobby();
//page.routine();
