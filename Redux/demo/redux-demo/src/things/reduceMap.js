// Map
const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const biggerNumbers = numbers.map(number => number + 1);
console.log('bigger numbers ', biggerNumbers); // [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

//Reduce
const newNumbers = [ 1, 2 ];
const sumOfNewNumbers = newNumbers.reduce((number, sum) => number + sum, 0);
console.log('Sum of new numbers: ', sumOfNewNumbers); // 3

function dispatch(action) {
  //The collection of reducers is declared somewhere
  return reducers.reduce(function (reducer, store) {
    reducer(action, store);
  } , store);
}

function reduce(action, store) {
  if (action.type === 'Attending JoziJS') {
    const newTalksHeard = store.talksHeard.concat([
      'Introducing the Entelect Challenge 2018',
      'An attempt at simplifying Redux'
    ]);
    //Use Object.assign to avoid mutating state.
    const newStore = Object.assign(
      {},
      store,
      { talksHeard : talksHeard }
    );
    console.log('Store: ', newSnore);
    // {
    //   talksHeard : [
    //     ... /*other talks*/,
    //     'Introducing the Entelect Challenge 2018',
    //     'An attempt at simplifying Redux']
    // }
    return newStore;
  }
  //I don't know what to do with this.. but I must always return store
  return store;
}
