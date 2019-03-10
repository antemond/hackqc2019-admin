class Neighborhood {
  name: string;
  id: number;
  organisations: [];
  donated: number;

  constructor({ NOM, Arrondissement, ID }) {
    this.name = NOM || Arrondissement;
    this.id = ID;
    this.organisations = [];
  }

  update({ donated, organizations, donators }) {
    this.organisations = organizations;
    this.donated = donated;
    this.donators = donators

    return this
  }
}

export default Neighborhood