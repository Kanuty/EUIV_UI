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
      this.cavaleryUnits[i] = new Unit({type: "cavalery"});
    }
    for (let i = 0; i < artUnits; i++) {
      this.artyleryUnits[i] = new Unit({type: "artylery"});
    }
  }
}

class BattleField {
  usableBattleWidth;
  lineMele;
  lineRange;
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
    this.SetAvailableBattleBoxes();
  }
  SetAvailableBattleBoxes() {
    const middleMinusHalfOfBattleWidth = Math.floor(
      globalConstants.battleLineLength / 2 -
        Math.floor(this.usableBattleWidth / 2)
    );
    const middlePlusHalfOfBattleWidth = Math.floor(
      globalConstants.battleLineLength / 2 +
        Math.floor(this.usableBattleWidth / 2)
    );
    //  console.log(middleMinusHalfOfBattleWidth, middlePlusHalfOfBattleWidth)
    for (
      let i = middleMinusHalfOfBattleWidth;
      i < middlePlusHalfOfBattleWidth;
      i++
    ) {
      this.lineMele[i].blocked = false;
      this.lineRange[i].blocked = false;
    }
  }

  fillBattleFieldWithUnits() {}
}
