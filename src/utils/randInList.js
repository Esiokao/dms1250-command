eval(Include('utils/randInteger.js'))

/**
 * get the random element in array
 * @date 3/19/2024 - 8:52:20 PM
 *
 * @param {*} List
 * @returns {*}
 */
function randInList(List) {
  if (!List | (typeof List !== 'object')) return undefined
  return List[randInteger(0, List.length)]
}

// This subroutine must be pasted into any JScript that calls 'Include'.
// NOTE: you may need to update your script engines and scripting runtime
// in order to successfully create the 'Scripting.FileSystemObject'.
//
function Include(file) {
  var fso, f
  fso = new ActiveXObject('Scripting.FileSystemObject')
  f = fso.OpenTextFile(file, 1)
  str = f.ReadAll()
  f.Close()
  return str
}
