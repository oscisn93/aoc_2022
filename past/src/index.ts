import { readFileSync } from "fs";

function SolutionOne() {
  const measurements = readFileSync("./input/1.txt", "utf-8")
    .split("\n")
    .map((s) => Number(s));
  let sliding_sums: number[] = [];
  while (measurements.length > 2) {
    sliding_sums.push(measurements.shift());
    sliding_sums[sliding_sums.length - 1] += measurements[0] + measurements[1];
  }
  function get_increases(list: number[]): number {
    let increases = 0;
    for (let i = 1; i < list.length; i++) {
      if (list[i] > list[i - 1]) increases++;
    }
    return increases;
  }
  return [get_increases(measurements), get_increases(sliding_sums)];
}
