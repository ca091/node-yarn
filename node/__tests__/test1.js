function applyToAllFlavors(f){
    f.call(this, 'mango', 2)
}

var obj = {};


test('applying to all flavors does mango last', () => {
    const drink = jest.fn();
    applyToAllFlavors(drink);
    const mock = jest.fn();
    obj.fn = mock;
    obj.fn.call(null, '1');
    obj.fn.call(null, '1', 2);
    expect(drink).toHaveBeenLastCalledWith('mango', 2);
    expect(mock).toHaveBeenCalledWith('1');
    expect(mock).toHaveBeenCalledWith('1', 2);
});