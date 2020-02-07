import program from 'commander';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { generateTypes } from '../lib';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

type Optons = {
  input: string;
  output: string;
};

const parsePath = (inputPath: string) => path.resolve(inputPath);

program
  .requiredOption('-i, --input <path>', 'input css file path', parsePath)
  .requiredOption('-o, --output <path>', 'output file path', parsePath)
  .parse(process.argv);

const { input, output } = program.opts() as Optons;

(async () => {
  const css = await readFile(input, 'utf8');
  const generatedCode = await generateTypes({ css });
  await writeFile(output, generatedCode, 'utf8');
})();
