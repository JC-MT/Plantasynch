const careData = (explorePlants, newPlant) => {
  const { ideal_watering, ideal_light, name } = newPlant;

  String.prototype.replaceAll = (replace, replacer) => {
    for (let idx = 0; idx < this.length; idx++) {
      if (this[idx] === replace) {
        this[idx] = replacer;
      }
    }

    return this;
  };

  const formatedName = name
    .replaceAll('-', ' ')
    .replaceAll('tree', '')
    .replaceAll('plant', '')
    .replaceAll('leaf', '')
    .replaceAll('fig', '')
    .replaceAll('flower', '')
    .split(' ')
    .filter((char) => char !== ' ' && char !== '');

  function thatIsFoundInEplorePlants(plant, formatedName) {
    for (let incommingName of formatedName) {
      const allNames = plant.common;

      for (let name of allNames) {
        if (name.toLowerCase() === incommingName.toLowerCase()) {
          return plant;
        }
        if (name.split(' ').length > 1) {
          for (let word of name.split(' ')) {
            if (word.toLowerCase() === incommingName.toLowerCase()) {
              return plant;
            }
          }
        }
      }
    }
  }
  const plantMatch = explorePlants.find((plant) =>
    thatIsFoundInEplorePlants(plant, formatedName)
  );

  if (ideal_watering.length && ideal_light.length) {
    return newPlant;
  } else {
    if (!ideal_watering.length && plantMatch) {
      newPlant.ideal_watering = plantMatch.watering;
    }
    if (!ideal_light.length && plantMatch) {
      newPlant.ideal_light = plantMatch.ideallight;
    }
    return newPlant;
  }
};

module.exports = {
  careData
};
