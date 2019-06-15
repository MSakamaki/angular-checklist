import chalk from 'chalk';
import { existsSync, mkdirSync, readFileSync, readdir, writeFileSync } from 'fs';
import { dirname, join, parse, extname } from 'path';
import { convertHeadingsPlugin, markdown } from './markdown';
import { FrontMatter } from './models';
import matter = require('gray-matter');
import hash = require('shorthash');

markdown.use(convertHeadingsPlugin);

export interface CompiledItems {
  content: string;
  title: string;
  summary?: string;
  description?: string;
  id: string;
  slug: string;
  lang: string;
  category: string;
}

export const defaultLocale = 'en-US';
export const langages = [defaultLocale, 'ja'];

const transrateHash = (compiledItems: CompiledItems[], compiledItemsEn: CompiledItems[], lang: string) =>
  compiledItemsEn
    .map(itemEn => ({
      [itemEn.id]: compiledItems.find(item => item.lang === lang && item.slug === itemEn.slug) || itemEn
    }))
    .reduce((pre, cur) => ({ ...pre, ...cur }), {});

export const buildChecklist = async contentFolder => {
  const checklistTransrate = langages
    .map(lang => ({
      [lang]: {
        categories: {},
        items: {}
      }
    }))
    .reduce((pre, cur) => ({ ...pre, ...cur }), {});

  try {
    const categories = await readdirAsync(contentFolder);

    for (const category of categories) {
      const categoryPath = join(contentFolder, category);
      const files = await readdirAsync(categoryPath);

      const META_DATA_FILE = '.category';
      const categoryInfo = lang =>
        files.find(file => file === `${META_DATA_FILE}${lang === defaultLocale ? '' : `.${lang}`}`);
      const items = files.filter(file => file !== META_DATA_FILE);

      if (!categoryInfo) {
        throwError(`No metadata found for category ${category}. Please create a .category file.`);
      }

      const compiledItems = compileFilesForCategory(items, category, categoryPath);
      const compiledItemsEn = compiledItems.filter(item => item.lang === defaultLocale);

      langages.forEach(lang => {
        const { data: frontMatter } = (() => {
          try {
            return extractFrontMatter(join(categoryPath, categoryInfo(lang)));
          } catch {
            return extractFrontMatter(join(categoryPath, categoryInfo(defaultLocale)));
          }
        })();
        if (!frontMatter.title || !frontMatter.summary) {
          throwError(`No title or summary defined for category ${category} ${lang}.`);
        }

        const transrateItems = transrateHash(compiledItems, compiledItemsEn, lang);

        checklistTransrate[lang].categories[category] = {
          ...frontMatter,
          slug: category,
          items: compiledItemsEn.map(item => item.id)
        };

        checklistTransrate[lang].items = {
          ...checklistTransrate[lang].items,
          ...compiledItemsEn.reduce((acc, item) => {
            acc[item.id] = transrateItems[item.id];
            acc[item.id].id = item.id;
            return acc;
          }, {})
        };
      });
    }
  } catch (error) {
    console.log(error);
    return null;
  }
  return checklistTransrate;
};

export const extractFrontMatter = (filePath: string): FrontMatter => {
  return matter(readFileSync(filePath)) as FrontMatter;
};

export const compileFilesForCategory = (files: Array<string>, category: string, categoryPath: string) => {
  return files.map(file => {
    const { data: frontMatter, content } = extractFrontMatter(join(categoryPath, file));

    if (!Object.keys(frontMatter).length || !frontMatter.title) {
      throwError(`No metadata defined for ${category}/${file}. You must define at least a title.`);
    }

    const langExt = extname(file.replace(/.md$/, ''));
    const originFile = langExt ? file.slice(0, -langExt.length) : file;

    const id = hash.unique(file);
    const slug = cleanFileName(originFile);

    return {
      id,
      slug,
      lang: langExt.slice(1) || defaultLocale,
      category,
      ...frontMatter,
      content: markdown.render(content)
    };
  });
};

export const dumpDataToDisk = (filename: string, data: any, dest: string) => {
  const dir = dirname(dest);

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  try {
    writeFileSync(join(dest, `${filename}.json`), generateJSON(data));
    printSuccess(`${filename}.json created`);
  } catch (error) {
    console.log(error);
  }
};

export const cleanFileName = (fileName: string) => {
  return parse(fileName).name;
};

export const generateJSON = (data: any) => {
  return JSON.stringify(data, null, 2);
};

export const readdirAsync = (path: string): Promise<Array<string>> => {
  return new Promise((resolve, reject) => {
    readdir(path, (error, files) => {
      error ? reject(error) : resolve(files);
    });
  });
};

export const printSuccess = (message: string, type = 'Sucess', addNewLine = false) => {
  console.log(`${addNewLine ? '\n' : ''}${chalk.green(`[${type}]`)} ${message}`);
};

export const throwError = (message: string) => {
  throw chalk.red(`[Error] ${message}`);
};

export const logWarning = (message: string) => {
  console.log(`${chalk.yellow(message)}`);
};
