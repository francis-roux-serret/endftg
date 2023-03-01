/**
 * Adapted from
 * @see https://stackoverflow.com/questions/40201589/serializing-an-es6-class-object-as-json
 */
class Serializer {
  /**
   * new Serializer(MyClass)
   * @param {function} type
   */
  constructor(type) {
    this.type = type;
  }

  /**
   * @param {object} object
   * @returns {string}
   */
  serialize(object) {
    return JSON.stringify(Object.entries(object));
  }

  /**
   * @param {string} jString JSON string
   * @returns {object}
   */
  deserialize(jString) {
    const entries = JSON.parse(jString);
    const ClassName = this.type;
    /** @type {Function} class name */
    const instance = new ClassName();
    entries.forEach(([prop, value]) => {
      instance[prop] = value;
    });

    return instance;
  }
}

module.exports = Serializer;
