interface SubsetSumItem {
    idx: number;
    val: number;
}

interface SubsetSumRes {
    found: boolean;
    items: SubsetSumItem[];
}

function _subsetSumRecursive(arr: SubsetSumItem[], target: number): SubsetSumRes {
    // if target is 0, then we have found the subset
    if (target === 0) {
        return { found: true, items: [] };
    }

    // if we have no more items to consider, then no subset can be found
    if (arr.length === 0) {
        return { found: false, items: [] };
    }

    // extract first element and the rest of the array
    const [first, ...rest] = arr;

    // search subset without first element
    const withoutFirst = _subsetSumRecursive(rest, target);
    if (withoutFirst.found) {
        return withoutFirst;
    }

    // search subset with first element
    const withFirst = _subsetSumRecursive(rest, target - first.val);
    if (withFirst.found) {
        withFirst.items.push(first);
        return withFirst;
    }

    // if we reach here, then no subset was found
    return { found: false, items: [] };
}

/**
 * Time complexity: O(2^n) -> the worst case is when no subset is found and we have to explore all possible subsets.
 * For every item in the array, we have two choices: include it in the subset or exclude it - hence the 2^n.
 * 
 * Space complexity: O(n) -> every recursive call the array size decreases by 1, so the maximum depth of the recursion is n.
 * For every recursive call, we store the O(1) space for variables (the array is not copied, only references are passed).
 * Then final result is stored in O(n) space. the total space complexity is O(n).
 */
export function subsetSumRecursive(arr: number[], target: number): number[] {
    // convert array to array of objects with index and value
    const subsetSumItems: SubsetSumItem[] = arr.map((val, idx) => ({ idx, val }));
    // call internal recursive function
    const result = _subsetSumRecursive(subsetSumItems, target);
    // return indexes of items in the subset
    return result.found ? result.items.map(item => item.idx) : [];
}