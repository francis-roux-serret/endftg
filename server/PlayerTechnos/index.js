const COLORS = ['red', 'green', 'yellow'];
const DEFAULT_PROPS = [
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
    const technoBonuses = alternateTechnoBonuses || DEFAULT_PROPS;
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

  getReductions() {
    return this.tracks.map(track => {
      const firstFreeSquare = track.technos.find(t => t.techno === null);

      return {
        color: track.color,
        reduction: firstFreeSquare ? firstFreeSquare.reduction : null,
      };
    });
  }

  getAvailableShipParts() {
    const parts = this.tracks.reduce((a, track) => {
      track.technos
        .filter(t => t.techno !== null)
        .forEach(t => a.push(t.techno.id));

      return [...a];
    }, []);

    return [...parts, 'thr_1', 'pow_3', 'can_1', 'hul_1', 'shd_1'];
  }

  getVPs() {
    return this.tracks.reduce((a, track) => {
      const usedSquares = track.technos.filter(t => t.techno !== null);

      return a + usedSquares.length ? usedSquares.pop().vp : 0;
    }, 0);
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
