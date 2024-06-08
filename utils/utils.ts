function arrToStr(arr: number[]) {
    return arr.length === 0 ? '[]' : `[${arr.join(', ')}]`;
}

export interface Test {
    name: string;
    arr: number[];
    target: number;
    expected: number[];
}

export function printTest(testcase: Test, solution: number[]) {
    solution.sort((a, b) => a - b); // sort to make comparison easier
    const testResult = arrToStr(solution) === arrToStr(testcase.expected) ? 'PASS' : 'FAIL';
    console.log(`* ${testResult}: ${testcase.name}`);
    console.log(`subsetSumRecursive(${arrToStr(testcase.arr)}, ${testcase.target}) => ${arrToStr(solution)} (expected ${arrToStr(testcase.expected)})`);
}