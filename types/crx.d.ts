declare module 'crx' {
  class ChromeExtension {
    constructor(options: { privateKey: string | Buffer });
    load(path: string): Promise<any>;
    pack(): Promise<Buffer>;
  }
  export default ChromeExtension;
}