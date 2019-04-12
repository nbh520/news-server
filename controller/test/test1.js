class test {
  constructor(){
    this.a = 'asd'
    console.log(this)
  }
  test() {
    console.log(this.a)
  }
}
new test().test()