import { subsetSumDynamicProgramming } from "./algorithms/subsetSumDynamicProgramming";
import { subsetSumRecursive } from "./algorithms/subsetSumRecursive";
import { printTest, Test } from "./utils/utils";

/**
 * given an array of numbers and a target number,
 * find a subset of the array that sums to the target
 * and return the indexes of the subset
 */
const testcases: Test[] = [
    { name: 'normal case', arr: [1, 3, 5, 7, 100, 13], target: 12, expected: [2, 3] },
    { name: 'empty array passes', arr: [], target: 0, expected: [] },
    { name: 'empty array failed', arr: [], target: 2, expected: [] },
    { name: 'subset of all elements', arr: [1, 2, 3], target: 6, expected: [0, 1, 2] },
    { name: 'multiple solutions', arr: [1, 4, 3], target: 4, expected: [1] },
    { name: 'ascensing array', arr: [1, 3, 8], target: 11, expected: [1, 2] },
    { name: 'descensing array', arr: [12, 6, 2], target: 14, expected: [0, 2] },
];

// test recursive subset sum
console.log('SUBSET SUM RECURSIVE TESTS');
for (const testcase of testcases) {
    const { arr, target } = testcase;
    const solution = subsetSumRecursive(arr, target);
    printTest(testcase, solution);
}
console.log('============================\n');

// test dynamic programming subset sum
console.log('SUBSET SUM DYNAMIC PROGRAMMING TESTS');
for (const testcase of testcases) {
    const { arr, target } = testcase;
    const solution = subsetSumDynamicProgramming(arr, target);
    printTest(testcase, solution);
}
console.log('============================\n');