interface Style {
  prefix: string;
  suffix: string;
}

const chars: Set<string> = new Set(['&', '§']);
const styles: Map<string, Style> = new Map();
{
  styles.set("0", {prefix: '<span class="mc-0">', suffix: "</span>"});
  styles.set("1", {prefix: '<span class="mc-1">', suffix: "</span>"});
  styles.set("2", {prefix: '<span class="mc-2">', suffix: "</span>"});
  styles.set("3", {prefix: '<span class="mc-3">', suffix: "</span>"});
  styles.set("4", {prefix: '<span class="mc-4">', suffix: "</span>"});
  styles.set("5", {prefix: '<span class="mc-5">', suffix: "</span>"});
  styles.set("6", {prefix: '<span class="mc-6">', suffix: "</span>"});
  styles.set("7", {prefix: '<span class="mc-7">', suffix: "</span>"});
  styles.set("8", {prefix: '<span class="mc-8">', suffix: "</span>"});
  styles.set("9", {prefix: '<span class="mc-9">', suffix: "</span>"});
  styles.set("a", {prefix: '<span class="mc-a">', suffix: "</span>"});
  styles.set("b", {prefix: '<span class="mc-b">', suffix: "</span>"});
  styles.set("c", {prefix: '<span class="mc-c">', suffix: "</span>"});
  styles.set("d", {prefix: '<span class="mc-d">', suffix: "</span>"});
  styles.set("e", {prefix: '<span class="mc-e">', suffix: "</span>"});
  styles.set("f", {prefix: '<span class="mc-f">', suffix: "</span>"});
  styles.set("k", {prefix: '<span class="mc-k">', suffix: "</span>"});
  styles.set("l", {prefix: '<span class="mc-l">', suffix: "</span>"});
  styles.set("m", {prefix: '<span class="mc-m">', suffix: "</span>"});
  styles.set("n", {prefix: '<span class="mc-n">', suffix: "</span>"});
  styles.set("o", {prefix: '<span class="mc-o">', suffix: "</span>"});
  styles.set("r", {prefix: '<span class="mc-r">', suffix: "</span>"});
}

export function renderColors(value: string): string {
  let res = "";
  let suffix = "";

  for (let i: number = 0; i < value.length; i++) {
    let cur = value[i];
    let next = i < value.length ? value[i+1] : null;

    if (cur === ' ') {
      cur = "_";
    }

    if (!chars.has(cur) || next === null) {
      res += cur;
      continue;
    }

    let style: Style = styles.get(next);

    res += style.prefix + '§';
    suffix += style.suffix;
  }

  return res + suffix;
}

export class RenderColorsValueConverter {

  toView(value: string): string {
    return renderColors(value);
  }
}
