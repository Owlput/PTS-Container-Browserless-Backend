module.exports =  class CommandCombo {
  constructor(cmd) {
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
  getSplitted() {
    return this.splitted;
  }
  getRaw() {
    return this.rawInput;
  }
  getFlags() {
    return this.flags;
  }
  getParams() {
    return this.params;
  }
  toString() {
    let j = {
      raw: this.rawInput,
      splitted: this.splitted,
      flags: this.flags,
      params: this.params,
    };
    return JSON.stringify(j);
  }
}
