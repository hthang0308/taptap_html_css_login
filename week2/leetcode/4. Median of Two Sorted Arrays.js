// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

// The overall run time complexity should be O(log (m+n)).
var findMedianSortedArrays = function (nums1, nums2) {
  let merged = [...nums1, ...nums2].sort((a, b) => a - b);
  let mid = Math.floor(merged.length / 2);
  if (merged.length % 2 === 0) {
    return (merged[mid - 1] + merged[mid]) / 2;
  } else {
    return merged[mid];
  }
};
let nums1 = [1, 3];
let nums2 = [2];
console.log(findMedianSortedArrays(nums1, nums2));
