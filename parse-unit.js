const fs = require("fs");
const xml2js = require("xml2js");

const parseJUnit = async (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");
  const result = await xml2js.parseStringPromise(data);

  if (!result.testsuites || !result.testsuites.testsuite) {
    console.error("Invalid JUnit XML format.");
    process.exit(1);
  }

  const failures = [];
  for (const suite of result.testsuites.testsuite) {
    if (suite.testcase) {
      for (const testcase of suite.testcase) {
        if (testcase.failure) {
          const errorMessage = testcase.failure[0]._ || testcase.failure[0];
          failures.push({
            classname: testcase.$.classname,
            name: testcase.$.name,
            message: errorMessage.trim(),
          });
        }
      }
    }
  }

  if (failures.length) {
    console.log("Failed Tests:");
    failures.forEach((fail, index) => {
      console.log(`${index + 1}. ${fail.classname} -> ${fail.name}`);
      console.log(`   ${fail.message}\n`);
    });
  } else {
    console.log("All tests passed!");
  }
};

if (process.argv.length !== 3) {
  console.error("Usage: node parse-junit.js <path_to_junit_xml>");
  process.exit(1);
}

parseJUnit(process.argv[2]);
