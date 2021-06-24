const core = require('@actions/core')
const github = require('@actions/github')
const axios = require('axios')
var fs = require('fs');
var FormData = require('form-data');

try {
    const file = core.getInput('file')
    const piplineServiceEndpoint = core.getInput('pipline-service-endpoint')
    const inputName = core.getInput('pipline-name')

    console.log("Processing file: " + file)
    console.log("Api-Server url: " + piplineServiceEndpoint)
    console.log("Api-Server url: " + inputName)

    const time = (new Date()).toTimeString();
    const piplineName = inputName + "_" + time

    const formData = new FormData()
    formData.append('uploadfile', fs.createReadStream(file));

    const params = new URLSearchParams({
        "name": piplineName,
        "description": "Pipeline create by github action" 
    }).toString();

    var url = `${piplineServiceEndpoint}/apis/v1beta1/pipelines/upload?` + params
    const config = { headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` } };

    response = axios.post(url, formData, config)
    .then(response => {
        console.log("id:", response.data.default_version)
        let piplineData = response.data.default_version
        console.log("piplineData:", piplineData)
    })
    .catch(errors => console.log(errors)); 

    core.setOutput("pipeline-name", piplineName)

} catch (error) {
    core.setFailed(error.message)
}
