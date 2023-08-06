function findLongestCommonSubstring(...args) {
  if (args.length === 0) {
    return "";
  }

  function isSubstring(str, sub) {
    return str.indexOf(sub) !== -1;
  }

  let longestCommonSubstring = "";

  for (let i = 0; i < args[0].length; i++) {
    for (let j = i + 1; j <= args[0].length; j++) {
      const substring = args[0].substring(i, j);
      if (
        substring.length > longestCommonSubstring.length &&
        args.every((arg) => isSubstring(arg, substring))
      ) {
        longestCommonSubstring = substring;
      }
    }
  }

  console.log(longestCommonSubstring);
}

findLongestCommonSubstring(...process.argv.slice(2));
