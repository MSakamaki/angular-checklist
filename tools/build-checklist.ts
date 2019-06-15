import { join } from 'path';
import { buildChecklist, dumpDataToDisk, printSuccess, langages } from './utils';

const CONTENT_FOLDER = join(__dirname, '../content');
const ASSET_FOLDER = join(__dirname, '../src/assets');

buildChecklist(CONTENT_FOLDER).then(checklist => {
  if (checklist) {
    langages.forEach(lang => {
      dumpDataToDisk(`content.${lang}`, checklist[lang], ASSET_FOLDER);
    });

    printSuccess('Content was successfully compiled', 'Done');
    process.exit(0);
  }
});
