const COLORS = ['red', 'green', 'yellow'];
const DEFAULT_BONUSES = [
  { reduction: 0, vp: 0 },
  { reduction: 1, vp: 0 },
  { reduction: 2, vp: 0 },
  { reduction: 3, vp: 1 },
  { reduction: 4, vp: 2 },
  { reduction: 5, vp: 3 },
  { reduction: 8, vp: 5 },
];

class PlayerTechnos {
  constructor(alternateTechnoBonuses = null) {
    const technoBonuses = alternateTechnoBonuses || DEFAULT_BONUSES;
    this.tracks = COLORS.map(color => ({
      color,
      technos: technoBonuses.map(tb => ({
        ...tb,
        techno: null,
      })),
    }));
  }

  getTrack(color) {
    return this.tracks.find(tr => tr.color === color);
  }

  hasTechno(technoName) {
    const containingTrack = COLORS.find(color => {
      const track = this.getTrack(color);

      return !!track.technos.find(t => t.techno && t.techno.id === technoName);
    });

    return !!containingTrack;
  }

  addTechnoAndGetReduction(color, techno) {
    const space = this.getTrack(color).technos.find(s => s.techno === null);
    if (!space) {
      throw new Error(`No space left on ${color} track`);
    }
    space.techno = techno;

    return space.reduction;
  }

  serialize() {
    return {
      tracks: this.tracks,
    };
  }

  export() {
    return this.tracks;
  }

  deserialize(data) {
    this.tracks = data.tracks;
  }
}

module.exports = PlayerTechnos;
