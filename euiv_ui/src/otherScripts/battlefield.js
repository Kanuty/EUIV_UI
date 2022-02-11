const globalConstants = {
  battleLineLength: 40,
};

class Unit {
  type;
  name;
  techLvl;
  fireOff;
  fireDef;
  shockOff;
  shockDef;
  moraleOff;
  moraleDef;
  strength; //number of soldiers
  constructor(
    type = "infantry",
    name = "nn",
    techLvl = 0,
    fireOff = 0,
    fireDef = 0,
    shockOff = 0,
    shockDef = 0,
    moraleOff = 0,
    moraleDef = 0,
    strength = 1000
  ) {
    this.type = type;
    this.name = name;
    this.techLvl = techLvl;
    this.fireOff = fireOff;
    this.fireDef = fireDef;
    this.shockOff = shockOff;
    this.shockDef = shockDef;
    this.moraleOff = moraleOff;
    this.moraleDef = moraleDef;
    this.strength = strength; //number of soldiers
  }
}

class BattleBox {
  blocked;
  entity;
  constructor() {
    (this.blocked = true), (this.entity = null);
  }
}

class Army {
  infantryUnits;
  cavaleryUnits;
  artyleryUnits;
  constructor(infUnits = 1, cavUnits = 0, artUnits = 0) {
    this.infantryUnits = new Array(infUnits);
    this.cavaleryUnits = new Array(cavUnits);
    this.artyleryUnits = new Array(artUnits);
    for (let i = 0; i < infUnits; i++) {
      this.infantryUnits[i] = new Unit();
    }
    for (let i = 0; i < cavUnits; i++) {
      this.cavaleryUnits[i] = new Unit({ type: "cavalery" });
    }
    for (let i = 0; i < artUnits; i++) {
      this.artyleryUnits[i] = new Unit({ type: "artylery" });
    }
  }
}

const changeArrObjFromTo = (
  arr,
  sProperty,
  min,
  max,
  arrFeeder,
  sPropertyArrFeeder
) => {
  console.log(  arr,
    sProperty,
    min,
    max,
    arrFeeder,
    sPropertyArrFeeder)
  const copyOfArrFeeder = arrFeeder[sPropertyArrFeeder].map((e) => e);
  for (let i = min; i < max; i++) {
    arr[i][sProperty] = copyOfArrFeeder[copyOfArrFeeder.length - 1];
    copyOfArrFeeder.pop();
  }
  return arr;
};

const changeArrObjFromToFlat = (arr, sProperty, min, max, arrFeeder) => {
  const copyOfArrFeeder = arrFeeder.map((e) => e);
  for (let i = min; i < max; i++) {
    arr[i][sProperty] = copyOfArrFeeder[copyOfArrFeeder.length - 1];
    copyOfArrFeeder.pop();
  }
  return arr;
};

class BattleField {
  usableBattleWidth = 15;
  lineMele;
  lineRange;
  reservs = [];
  #middleOfBattleLine = Math.ceil(globalConstants.battleLineLength / 2);
  #middleMinusHalfOfBattleWidth;
  #middlePlusHalfOfBattleWidth;
  constructor(battleWidth = 15) {
    this.usableBattleWidth = battleWidth;
    this.lineMele = new Array(globalConstants.battleLineLength);
    this.lineRange = new Array(globalConstants.battleLineLength);
    for (let i = 0; i < this.lineMele.length; i++) {
      this.lineMele[i] = new BattleBox();
    }
    for (let i = 0; i < this.lineRange.length; i++) {
      this.lineRange[i] = new BattleBox();
    }
    this.#middleMinusHalfOfBattleWidth = Math.floor(
      this.#middleOfBattleLine - Math.floor(this.usableBattleWidth / 2)
    );
    this.#middlePlusHalfOfBattleWidth = Math.floor(
      this.#middleOfBattleLine + Math.floor(this.usableBattleWidth / 2)
    );
    this.SetAvailableBattleBoxes();
  }
  SetAvailableBattleBoxes() {
    for (
      let i = this.#middleMinusHalfOfBattleWidth;
      i < this.#middlePlusHalfOfBattleWidth;
      i++
    ) {
      this.lineMele[i].blocked = false;
      this.lineRange[i].blocked = false;
    }
  }

  fillBattleFieldWithUnits(army) {
    //for now ths is scenario for infantry only
    const infantryUnitsLength = army.infantryUnits.length;
    console.log(infantryUnitsLength, this.usableBattleWidth);
    if (infantryUnitsLength <= this.usableBattleWidth) {
      this.lineMele = changeArrObjFromTo(
        this.lineMele,
        "entity",
        this.#middleOfBattleLine - infantryUnitsLength / 2,
        this.#middleOfBattleLine + infantryUnitsLength / 2,
        army,
        "infantryUnits"
      );
    } else if (infantryUnitsLength * 2 > this.usableBattleWidth) {
      console.log(this.lineMele);
      this.lineMele = changeArrObjFromTo(
        this.lineMele,
        "entity",
        this.#middleOfBattleLine - Math.floor(this.usableBattleWidth / 2),
        this.#middleOfBattleLine + Math.floor(this.usableBattleWidth / 2),
        army,
        "infantryUnits"
      );
      const infantryWithoutFirstRow =
        army.infantryUnits.slice(this.usableBattleWidth);
      this.lineRange = changeArrObjFromToFlat(
        this.lineRange,
        "entity",
        this.#middleOfBattleLine - Math.floor(this.usableBattleWidth / 2),
        this.#middleOfBattleLine + Math.floor(this.usableBattleWidth / 2),
        infantryWithoutFirstRow
      );
      const infantryWithoutBothRows = army.infantryUnits.slice(
        this.usableBattleWidth * 2
      );
      infantryWithoutBothRows.forEach((e) => this.reservs.push(e));
      this.reservs.push();
      // for (
      //   let i = this.#middleMinusHalfOfBattleWidth;
      //   i < this.#middlePlusHalfOfBattleWidth;
      //   i++
      // ) {
      //   this.lineRange[i].entity = army.infantryUnits[infantryIndex];
      //   infantryIndex++;
      // }
      // for (let i = infantryIndex++; i < infantryUnitsLength; i++) {
      //   this.reservs.push(army.infantryUnits[i]);
      // }
    } else if (infantryUnitsLength > this.usableBattleWidth) {
      let infantryIndex = 0;
      for (
        let i = this.#middleMinusHalfOfBattleWidth;
        i < this.#middlePlusHalfOfBattleWidth;
        i++
      ) {
        this.lineMele[i].entity = army.infantryUnits[infantryIndex];
        infantryIndex++;
      }
      if (infantryUnitsLength * 2 <= this.usableBattleWidth) {
        for (
          let i = Math.floor(
            this.#middleOfBattleLine -
              (infantryUnitsLength / 2 - this.usableBattleWidth)
          );
          i <
          Math.floor(
            this.#middleOfBattleLine +
              (infantryUnitsLength / 2 - this.usableBattleWidth)
          );
          i++
        ) {
          this.lineRange[i].entity = army.infantryUnits[infantryIndex];
          infantryIndex++;
        }
      }
    }
  }
}
// var a3 = new Army(10, 0, 0);
// var b3 = new BattleField();
// b3.fillBattleFieldWithUnits(a3);
// console.log(b3);

//  var a1 = new Army(25, 0, 0);
//  var b1 = new BattleField();
//  b1.fillBattleFieldWithUnits(a1);
//  console.log(b1);

var a2 = new Army(50, 0, 0);
var b2 = new BattleField();
b2.fillBattleFieldWithUnits(a2);
console.log(b2);
