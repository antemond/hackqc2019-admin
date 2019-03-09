class Neighborhood {
  name: string;
  id: number;
  perimeter: number;
  superficie: number;
  organisations: [];
  donated: number;

  constructor({ NOM, ID, PERIMETRE, SUPERFICIE }) {
    this.name = NOM;
    this.id = ID;
    this.perimeter = PERIMETRE;
    this.superficie = SUPERFICIE;
    this.organisations = [];
  }

  update({ donated, organizations }) {
    this.organisations = organizations;
    this.donated = donated;

    return this
  }
}

export default Neighborhood