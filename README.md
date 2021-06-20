PIPELINE_URL=https://raw.githubusercontent.com/kubeflow/pipelines/master/samples/core/sequential/sequential.py
PIPELINE_FILE=${PIPELINE_URL##*/}
PIPELINE_NAME=${PIPELINE_FILE%.*}

wget -O ${PIPELINE_FILE} ${PIPELINE_URL}
dsl-compile --py ${PIPELINE_FILE} --output ${PIPELINE_NAME}.tar.gz

SVC=192.168.188.231:8888
PIPELINE_ID=$(curl -F "uploadfile=@${PIPELINE_NAME}.tar.gz" ${SVC}/apis/v1beta1/pipelines/upload | jq -r .id)



## install  act
https://github.com/nektos/act
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# build index.js file
npx ncc build .github/actions/run_in_kubeflow/index.js -o .github/actions/run_in_kubeflow/dist

