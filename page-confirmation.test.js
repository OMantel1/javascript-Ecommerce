const resetLocalStorage = require('./page-confirmation');

test('Set local storage test files', () => {
    localStorage.setItem("panier", "test file");
    expect(localStorage.getItem("panier")).toMatch("test file");

})

test('Reset local storage test files', () => {
    localStorage.setItem("panier", "test file");
    resetLocalStorage()
    expect(localStorage.getItem("panier")).toBeNull();
})