import postcss from 'postcss';
import prettier from 'prettier';
import postcssModules from 'postcss-modules';

interface ExportTokens {
  [className: string]: string;
}

interface TemplateOptions {
  exportTokens: ExportTokens;
}

interface ProcessOptions {
  css: string;
}

const tokensToStringUnion = ({ exportTokens }: TemplateOptions) =>
  Object.entries(exportTokens)
    .map(([key]) => `'${key}'`)
    .join(` | `);

const outputTemplate = (options: TemplateOptions) =>
  `export type GlobalClassNames = ${tokensToStringUnion(options)};`;

export const generateTypes = async ({ css }: ProcessOptions) => {
  let generatedCode = '';

  await postcss([
    postcssModules({
      generateScopedName: name => name,
      getJSON: (_, exportTokens) => {
        generatedCode = prettier.format(outputTemplate({ exportTokens }), {
          parser: 'typescript',
        });
      },
    }),
  ]).process(css, { from: 'src/app.css', to: 'dest/app.css' });

  return generatedCode;
};
