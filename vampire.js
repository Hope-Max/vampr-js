class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let number = 0;
    let currentVampire = this;

    while(currentVampire.creator) {
      number++;
      currentVampire = currentVampire.creator;
    }

    return number;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  closestCommonAncestor(vampire) {

    const compareInSameClass = function(vampireOne, vampireTwo) {

      let currentVampire = vampireOne;
      let comparedVampire = vampireTwo;
  
      // Same vampire
      if (currentVampire.name === comparedVampire.name) return currentVampire;
  
      while(true) {
        if (currentVampire.creator.name === comparedVampire.creator.name) return currentVampire.creator;
        currentVampire = currentVampire.creator;
        comparedVampire = comparedVampire.creator
      }
    };

    const numOfThis = this.numberOfVampiresFromOriginal;
    // If this is the root vampire
    if (numOfThis === 0) return this;
    const numOfVampire = vampire.numberOfVampiresFromOriginal;
    // If parameter vampire is the root vampire
    if (numOfVampire === 0) return vampire;


    let currentVampire = this;
    let comparedVampire = vampire;

    if (numOfThis === numOfVampire) {
      return compareInSameClass(this, vampire);
    } else if (numOfThis < numOfVampire) {
      
      while(true) {
        comparedVampire = comparedVampire.creator;
        if (currentVampire.numberOfVampiresFromOriginal ===  comparedVampire.numberOfVampiresFromOriginal) break;
      }
      return compareInSameClass(currentVampire, comparedVampire);

    } else {

      while(true) {
        currentVampire = currentVampire.creator;
        if (currentVampire.numberOfVampiresFromOriginal ===  comparedVampire.numberOfVampiresFromOriginal) break;
      }
      return compareInSameClass(currentVampire, comparedVampire);

    }
  }
}

module.exports = Vampire;

