export default class CommandCombo {
  private rawInput: string;
  private flags: Set<string>;
  private splitted: string[];
  private params: Array<Array<string>>;
  constructor(cmd: string) {
    this.rawInput = cmd;
    this.splitted = cmd.split(/\s*\s\s*/).map((cmd) => cmd.trim());
    this.flags = new Set(
      (cmd + " ")
        .match(/\s+-[a-z]\S*\b/giu)
        ?.map((flag) => flag.trim().toLowerCase())
    );
    for (let i = 0; i < this.splitted.length; i++) {
      if (this.splitted[i].includes("--")) {
        this.params.push([this.splitted[i]]);
        for (let a = i + 1, b = 0; ; a++) {
          if (
            this.splitted[a] &&
            !this.flags.has(this.splitted[a]) &&
            !this.splitted[a].includes("--")
          ) {
            this.params[this.params.length - 1].push(this.splitted[a]);
            b++;
          } else {
            i += b;
            break;
          }
        }
      } else continue;
    }
  }
  getSplitted():number {
    return this.splitted.length;
  }
  getRaw(): string {
    return this.rawInput;
  }
  getFlags():Set<string> {
    return this.flags;
  }
  getParams():Array<Array<string>> {
    return this.params;
  }
}
