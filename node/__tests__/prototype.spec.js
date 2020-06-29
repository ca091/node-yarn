function Person(name) {
  this.name = name
}

Person.prototype.getName = function () {
  console.log(this.name)
  return this.name
}

//继承
function Student(name, age) {
  Person.call(this, name)
  this.age = age
}

Student.prototype = Object.create(new Person())
Student.prototype.constructor = Student

describe('prototype & extend', () => {
  let jack = new Person('jack')
  let ming = new Student('ming', 12)
  test('prototype', () => {
    expect(jack.constructor === Person).toBeTruthy()
    expect(Person.prototype.constructor === Person).toBeTruthy()
    expect(jack === Person.prototype).toBeFalsy()
    expect(jack.__proto__ === Person.prototype).toBeTruthy()
    expect(Person.__proto__ === Function.prototype).toBeTruthy()
    expect(Person.prototype.__proto__ === Object.prototype).toBeTruthy()
    expect(typeof Function.prototype).toBe('function')
  })

  test('extend', () => {
    expect(ming instanceof Person).toBeTruthy()
  })
})
