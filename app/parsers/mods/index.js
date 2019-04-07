const modsPath =
  '/Users/rykuno/Library/Application Support/FarmingSimulator2019/mods';
const fs = require('fs');
const path = require('path');
const parseModDesc = require('./parseModDesc');

// Errors
const ERROR = {
  MOD_DIR_READ_ERR: new Error('Error reading mods directory path.')
};

const getContentsOfModsDir = () =>
  new Promise((resolve, reject) => {
    try {
      fs.readdir(modsPath, 'utf8', (err, dirs) => {
        resolve(dirs);
      });
    } catch (e) {
      reject(ERROR.MOD_DIR_READ_ERR);
    }
  });

const filterMods = modDirs => {
  const IGNORE_FILES = ['.DS_Store'];
  return modDirs.filter(mod => !IGNORE_FILES.includes(mod));
};

const addBasePaths = mods =>
  mods.map(mod => ({
    modDirName: mod,
    modDirPath: path.join(modsPath, mod)
  }));

const createPromiseList = mods =>
  mods.map(mod =>
    parseModDesc(mod).catch(err => {
      if (err instanceof Error) {
        // TODO: Implement eadditional error handling/notifications later.
        console.error('Parse Mod Desc Error: ', err.message);
      }
      return null;
    })
  );

const parseModsPromise = async mods =>
  new Promise((resolve, reject) => {
    const PROMISE_LIST = createPromiseList(mods);

    Promise.all(PROMISE_LIST)
      .then(results => {
        return resolve(results.filter(x => x));
      })
      .catch(e => {
        return reject(e);
      });
  });

const populateStoreWithMods = async () => {
  // Retrieve the contents of the mods Directiory
  const modDirs = await getContentsOfModsDir();

  // Filter out unwanted files
  const filteredMods = filterMods(modDirs);

  // Mods object array with paths/name
  const modsWithPaths = addBasePaths(filteredMods);

  // Alright lets go parse these things
  const mods = await parseModsPromise(modsWithPaths);
  console.log('--- Mods: ', mods);
};

export default populateStoreWithMods;
