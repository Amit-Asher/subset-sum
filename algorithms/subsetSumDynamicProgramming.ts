interface SubsetSumItem {
    partialSum: number;
    indexes: number[];
}

function isSubsetSumFound(currentWindow: SubsetSumItem[], sumToCheck: number): boolean {
    return currentWindow[sumToCheck].indexes.length > 0;
}

function initializeWindows(target: number): [SubsetSumItem[], SubsetSumItem[]] {
    const window: SubsetSumItem[] = [];
    const nextWindow: SubsetSumItem[] = [];

    for (let i = 0; i <= target; i++) {
        window.push({ partialSum: i, indexes: [] });
        nextWindow.push({ partialSum: i, indexes: [] });
    }

    return [window, nextWindow];
}

/**
 * Time complexity: O(arr.length * target) -> we iterate over all elements in the array and for each element we iterate over all partial sums.
 * Every partial sum is calculated in O(1) time, so the total time complexity is O(arr.length * target).
 * 
 * Space complexity: O(arr.length * target) -> at every iteration we store for each partial sum
 * the indexes of the subset that sums to that partial sum. The maximum number of partial sums is target,
 * and the maximum number of indexes is arr.length. So the total space complexity is O(arr.length * target).
 */
export function subsetSumDynamicProgramming(arr: number[], target: number): number[] {
    // initialize the windows of partial sums and indexes
    const [window, nextWindow] = initializeWindows(target);

    // iterate over all elements in the array
    const indexed = arr.map((val, idx) => ({ idx, val }));
    for (const { idx, val } of indexed) {
        // iterate over all partial sums
        for (let partialSum = 1; partialSum <= target; partialSum++) {

            if (isSubsetSumFound(window, partialSum)) {
                // copy the previous indexes to the current indexes
                nextWindow[partialSum].indexes = [...window[partialSum].indexes];
                continue; 
            }

            // if the current value is equal to i, then it is the subset of i
            if (val === partialSum) {
                nextWindow[partialSum].indexes = [idx];
                continue;
            }

            // if complement sum is found, then the current subset is the complement sum subset + current idx
            const complementSum = partialSum - val;
            if (0 < complementSum && isSubsetSumFound(window, complementSum)) {
                nextWindow[partialSum].indexes = [...window[complementSum].indexes, idx];
            }
        }

        // prepare windows for the next iteration
        for (let i = 0; i <= target; i++) {
            window[i].indexes = nextWindow[i].indexes;
            nextWindow[i].indexes = [];
        }
    }

    return window[target].indexes.length > 0 ? window[target].indexes : [];
}