const DEFAULT_INCOMES = [2, 3, 4, 6, 8, 10, 12, 15, 18, 21, 24, 28];

class PopulationTrack {
  constructor(type, alternativeIncomes = null) {
    this.type = type;
    this.cemetaryCount = 0;
    const incomes = alternativeIncomes || DEFAULT_INCOMES;

    this.populations = incomes.map((i, index) => ({
      index,
      income: i,
      present: true,
    }));
  }

  serialize() {
    return {
      type: this.type,
      cemetaryCount: this.cemetaryCount,
      populations: this.populations,
    };
  }

  deserialize(data) {
    this.sacks = data.sacks;
  }

  toPost() {
    return {
      type: this.type,
      empty: this.countEmptySpace(),
      available: this.countAvailable(),
      cemetary: this.cemetaryCount,
      populations: JSON.parse(JSON.stringify(this.populations)),
    };
  }

  /**
   * @return number|null
   */
  pickOne() {
    const lastOne = this.populations.find(p => p.present);
    if (!lastOne) {
      return null;
    }

    this.populations[lastOne.index].present = false;

    return lastOne.income;
  }

  countEmptySpace() {
    return this.populations.filter(p => !p.present).length - this.cemetaryCount;
  }

  countAvailable() {
    return this.populations.filter(p => p.present).length;
  }

  hasEmptySpace() {
    return this.countEmptySpace() > 0;
  }

  checkEmptySpace() {
    if (!this.hasEmptySpace()) {
      throw new Error(`No space left of type ${this.type}`);
    }
  }

  restoreOne() {
    this.checkEmptySpace();
    const firstEmptySpace = this.populations.find(p => !p.present);
    this.populations[firstEmptySpace.index].present = true;
  }

  addOneToCemetary() {
    this.checkEmptySpace();
    this.cemetaryCount += 1;
  }

  emptyCemetary() {
    while (this.cemetaryCount) {
      this.restoreOne();
      this.cemetaryCount -= 1;
    }
  }
}

module.exports = PopulationTrack;
