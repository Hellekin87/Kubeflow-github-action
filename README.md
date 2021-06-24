# Github action to upload a kubeflow pipeline


### install  act
https://github.com/nektos/act
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash


### build index.js file:
```bash
npx ncc build .github/actions/run_in_kubeflow/index.js -o .github/actions/run_in_kubeflow/dist
```

### Trigger action:
```bash
act
```
