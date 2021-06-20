const core = require('@actions/core')
const github = require('@actions/github')

try {
    const file = core.getInput('file')
    console.log("Processing file:" + file)
    core.setOutput("pipeline-name", "blabla")
} catch (error) {
    core.setFailed(error.message)
}
