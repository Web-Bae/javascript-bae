describe("1-1-strings", function () {
  beforeEach(function () {
    // Setup a spy on the console.log method
    spyOn(console, "log").and.callThrough();
  });
  it("should greet with 'Hello, World!'", function () {
    expect(greet()).toEqual("Hello, World!");
  });
  it("should log 'What's up?' to the console", function () {
    logWhatsUp();
    expect(console.log).toHaveBeenCalledWith("What's up?");
  });
});
