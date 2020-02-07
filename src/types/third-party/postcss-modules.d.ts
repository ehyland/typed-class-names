declare module 'postcss-modules' {
  import { Plugin } from 'postcss';

  namespace postcssModules {
    interface ExportTokens {
      [className: string]: string;
    }

    interface PathFetcher {
      (file: string, relativeTo: string, depTrace: string): Promise<ExportTokens>;
    }

    interface Loader {
      load: (
        source: string,
        sourcePath: string,
        pathFetcher: PathFetcher
      ) => Promise<{ injectableSource: string; exportTokens: ExportTokens }>;
    }

    interface Options {
      getJSON?: (
        cssFileName: string,
        json: any,
        outputFileName: string,
        exportTokens: ExportTokens
      ) => void | Promise<void>;
      scopeBehaviour?: 'local' | 'global';
      globalModulePaths?: RegExp[];
      generateScopedName?: ((name: string, filename: string, css: string) => string) | string;
      Loader?: Loader;
    }
  }

  const theDefault: Plugin<postcssModules.Options>;

  export default theDefault;
}
