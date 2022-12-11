import { readFileSync } from "fs";

const input: Array<Array<string>> = readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(" "));

function getDirectorySizes() {
  let path: string[] = [];
  const sizes = new Map<string, number> ();
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    // if the line is a cd command
    if (line[1] === "cd") {
      // update the path (stack)
      let dir = line[2];
      if (dir === "/") {
        path = [];
      } else if (dir === "..") {
        path.pop();
      } else {
        path.push(dir);
      }
    } else {
      // otherwise it must be an ls command
      do {
        i++;
        if (input[i][0] === "dir") continue;
        const size = Number(input[i][0]);
        for (let end = path.length; end >=0; end--) {
          const full_path = path.slice(0, end).join("/");
          if (!sizes.has(full_path)) {
            sizes.set(full_path, size);
          } else {
            let d_size = sizes.get(full_path);
            d_size += size;
            sizes.set(full_path, d_size);
          }
        }
      } while (input[i+1] && input[i+1][0] != "$");
    }
  }
  return [...sizes.values()];
}

function firstPart() {
  const sizes = getDirectorySizes();
  console.log(sizes.filter((n) => n <= 100000).reduce((a,b) => a+b));
}

firstPart();

function secondPart() {
  const sizes = getDirectorySizes();
  const used = Math.max(...sizes);
  const free = 70000000-used;
  const required = 30000000 - free;
  console.log(Math.min(...sizes.filter(n => n >= required)));
}

secondPart();