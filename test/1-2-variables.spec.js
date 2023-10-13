describe("1-2-variables", function () {
  // Reset the console log before each spec
  beforeEach(function () {
    spyOn(console, "log").and.callThrough();
  });

  it("should declare a variable with 'var' containing 'Hello'", function () {
    expect(window.greeting).toBeDefined();
    expect(window.greeting).toEqual("Hello");
  });

  it("should declare a variable containing 'World'", function () {
    expect(target).toBeDefined();
    expect(target).toEqual("World");
  });

  it("should declare a variable containing '!'", function () {
    expect(punctuation).toBeDefined();
    expect(punctuation).toEqual("!");
  });

  it("should log the three variables correctly", function () {
    logVariables(); // Call the function to trigger the log
    expect(console.log).toHaveBeenCalledWith("Hello", "World", "!");
  });
});
