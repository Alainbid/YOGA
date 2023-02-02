const objet = {
  pseudo: "ab56",
  ville: "Paris",
  direbonjour: () => {
    // console.log("bonjour je suis " + objet.pseudo);
  },
};
objet.age = 24;
// console.log(objet);
// delete objet.ville;
// console.log(objet);
// console.log("ville" in objet);

// for (const key in objet) {
//   console.log(objet[key]);
// }
// objet.direbonjour();

//************ FONCTIONS  sur les objets : Object */
// console.log(objet);
const keys = Object.keys(objet);
// console.log(keys);
const val = Object.values(objet);
// console.log(val);
const nestarray = Object.entries(objet);
// console.log(nestarray);

const objet2 = {
  poids: 45,
  taille: 1.5,
};

let objet0 = Object.assign({}, objet, objet2);
// console.log(objet0);

// empecher les modifs sur une clé
//let ob = Object.freeze(objet);
const objet3 = Object.seal(objet0);
objet3: pseudo = "gerard";
// console.log(objet3);

//*********** CONSTRUCTEUR D'OBJET */

function User(unpseudo, uneville) {
  this.pseudo = unpseudo;
  this.ville = uneville;
  this.getCity = function () {
    console.log(this.pseudo + " habite à " + this.ville);
  };
}
const user1 = new User("AB56", "Nice");
// console.log(user1);
const user2 = new User("Marine", "Lille");
// console.log(user2);
// console.log(user2.getCity());

class Utilisateur {
  constructor(pseudo, ville) {
    this.pseudo = pseudo;
    this.ville = ville;
  }
  //méthodes
  direleNom = function () {
    // console.log("mon nom est : " + this.pseudo);
  };
}

const user5 = new Utilisateur("Samia", "Lyon");
Utilisateur.prototype.sayCity = function () {
  console.log(" j'habite " + this.ville);
};
// console.log(user5);
// console.log(user5.direleNom());
// console.log(user5.sayCity());

//*************HERITAGE */
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayName = function (text) {
    console.log(this.name + " dit le " + text);
  };
}
const animal = new Animal("chat", 7);
// console.log(animal);
console.log(animal.sayName("bonjour"));

class Dogs extends Animal {
  run() {
    console.log("le chien court");
  }
}

const chien = new Dogs("levrier", 8);
console.log(chien.name + "  " + chien.run());
