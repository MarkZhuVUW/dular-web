import chalk from "chalk";
import dotenv from "dotenv-flow";
import { join } from "path";
import { readdir, readFile, writeFile } from "fs/promises";
import { v2 as translateV2 } from "@google-cloud/translate";

dotenv.config();

const LOCALE_PATH = "./src/locales";

const googleTranslate = new translateV2.Translate({
  projectId: process.env.REACT_APP_GOOGLE_TRANSLATE_PROJECT_ID,
  key: process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY,
});

const TARGET_MAPPINGS = {
  en_US: "en",
};

const translate = (text, target) => {
  return googleTranslate
    .translate(
      text,
      target in TARGET_MAPPINGS ? TARGET_MAPPINGS[target] : target
    )
    .then((translations) => translations[0]);
};

const getLocales = async () => {
  const locales = {};
  for await (const file of await readdir(LOCALE_PATH)) {
    if (file.endsWith(".json")) {
      locales[file.replace(/.json$/, "")] = JSON.parse(
        await readFile(join(LOCALE_PATH, file))
      );
    }
  }
  return locales;
};

const writeLocales = async (locales) => {
  for (const code of Object.keys(locales)) {
    await writeFile(
      join(LOCALE_PATH, code + ".json"),
      JSON.stringify(locales[code], null, 2)
    );
  }
};

async function lintLocales(fix = false) {
  let foundIssue = false;
  const locales = await getLocales();

  for (const x of Object.keys(locales)) {
    for (const y of Object.keys(locales)) {
      if (x !== y) {
        for (const tag of Object.keys(locales[x])) {
          if (tag in locales[y] === false) {
            foundIssue = true;
            if (fix === false) {
              console.error(chalk.red(`[error] ${y}:${tag} is undefined!`));
              locales[y][tag] = "undefined";
            } else {
              locales[y][tag] = await translate(locales[x][tag], y);
              console.log(
                chalk.blue(
                  `[fixed] ${y}:${tag}:${locales[y][tag]} is translated from ${x}:${tag}:${locales[x][tag]}.`
                )
              );
            }
          }
        }
      }
    }
  }

  if (foundIssue) {
    if (fix) {
      await writeLocales(locales);
    } else {
      process.exit(1);
    }
  }
}

export default await lintLocales(
  process.argv[process.argv.length - 1] === "--fix"
);
