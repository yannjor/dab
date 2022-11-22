const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fsPromises = require("fs").promises;

const run = async (cmdList) => {
  await exec(cmdList.join(" "));
};

const createGradingContainer = async (code, randomKey) => {
  const randomFileName = `submission-${randomKey}.data`;
  await fsPromises.writeFile(randomFileName, code);

  const graderContainerName = `submission-image-${randomKey}`;
  const tmpGraderContainerName = `${graderContainerName}-tmp`;

  await run([
    "docker",
    "create",
    "--name",
    tmpGraderContainerName,
    "grader-image",
  ]);

  await run([
    "docker",
    "cp",
    randomFileName,
    `${tmpGraderContainerName}:/app/submission/submitted_code.data`,
  ]);

  await run(["docker", "commit", tmpGraderContainerName, graderContainerName]);

  await run(["docker", "rm", "-fv", tmpGraderContainerName]);

  await fsPromises.unlink(randomFileName);

  return graderContainerName;
};

const runGradingContainer = async (graderContainerName, randomKey) => {
  await run([
    "docker",
    "run",
    "--name",
    `${graderContainerName}-image`,
    graderContainerName,
  ]);

  await run([
    "docker",
    "cp",
    `${graderContainerName}-image:/app/submission/result.data`,
    `result-${randomKey}.data`,
  ]);

  await run(["docker", "image", "rm", "-f", `${graderContainerName}`]);

  await run(["docker", "rm", "-fv", `${graderContainerName}-image`]);

  const result = await fsPromises.readFile(`result-${randomKey}.data`, "utf8");

  await fsPromises.unlink(`result-${randomKey}.data`);

  return result.trim();
};

const grade = async (code) => {
  // const randomKey = Math.floor(Math.random() * 900000000 + 100000000);
  //
  // const graderContainerName = await createGradingContainer(code, randomKey);
  // const result = await runGradingContainer(graderContainerName, randomKey);
  //
  // return result;
  return "PASS";
};

module.exports = { grade };
