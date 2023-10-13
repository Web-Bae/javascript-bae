const fs = require("fs");
const xml2js = require("xml2js");

const parseJUnit = async (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");
  const result = await xml2js.parseStringPromise(data);

  const failures = [];
  if (result.testsuites) {
    const testsuites = Array.isArray(result.testsuites.testsuite)
      ? result.testsuites.testsuite
      : [result.testsuites.testsuite];

    for (const suite of testsuites) {
      const testcases = Array.isArray(suite.testcase)
        ? suite.testcase
        : [suite.testcase];

      for (const testcase of testcases) {
        if (testcase.failure) {
          const errorMessage =
            testcase.failure[0]._ ||
            testcase.failure[0].$.message ||
            "Unknown error";
          failures.push({
            classname: testcase.$.classname,
            name: testcase.$.name,
            message: errorMessage.trim(),
          });
        }
      }
    }
  }

  return failures;
};

if (process.argv.length !== 3) {
  console.error("Usage: node parse-junit.js <path_to_junit_xml>");
  process.exit(1);
}

parseJUnit(process.argv[2]).then((failures) => {
  if (failures.length) {
    console.log("Failed Tests:");
    failures.forEach((fail, index) => {
      console.log(`${index + 1}. ${fail.classname} -> ${fail.name}`);
      console.log(`   ${fail.message}\n`);
    });
  } else {
    console.log("All tests passed!");
  }
});
