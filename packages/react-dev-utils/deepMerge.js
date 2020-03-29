'use strict';

/*
 * A lightweight alternative to https://www.npmjs.com/package/deepmerge
 * that doesn't try to deep-merge items that it shouldn't deep-merge.
 */

function deepMerge(item1, item2) {
  if (
    !item1 ||
    !item2 ||
    typeof item1 !== 'object' ||
    typeof item2 !== 'object'
  ) {
    return item1 || item2;
  }

  if (Array.isArray(item1)) {
    return [...item1, ...item2];
  }

  // Clone first item
  let result = { ...item1 };
  // Merge second item
  for (const key of Object.keys(item2)) {
    result[key] = deepMerge(result[key], item2[key]);
  }
  return result;
}

deepMerge.all = function(item1, ...otherItems) {
  let result = item1;
  for (const item of otherItems) {
    result = deepMerge(result, item);
  }
  return result;
};

module.exports = deepMerge;
