
const changeArrObjFromTo = (arr, sProperty, min, max, arrFeeder, sPropertyArrFeeder) => {
  const copyOfArrFeeder = arrFeeder[sPropertyArrFeeder].map(e => e);
  for(let i = min; i < max; i++){
    arr[i][sProperty] = copyOfArrFeeder[copyOfArrFeeder.length - 1] ;
    copyOfArrFeeder.pop();
  }
  return arr
}

const changeArrObjFromToFlat = (arr, sProperty, min, max, arrFeeder) => {
  const copyOfArrFeeder = arrFeeder.map(e => e);
  for(let i = min; i < max; i++){
    arr[i][sProperty] = copyOfArrFeeder[copyOfArrFeeder.length - 1] ;
    copyOfArrFeeder.pop();
  }
  return arr
}

changeArrObjFromTo(this.lineMele, 'entity', this.#middleOfBattleLine - infantryUnitsLength / 2, this.#middleOfBattleLine + infantryUnitsLength / 2, army, 'infantryUnits' )