# GitHub Action - Read Version From File

This GitHub action reads the version information from a given file with a well known JSON structure.
If the file does not exist, it will return the default version of **1.0.0**.

## Pre requisites

node <= 12
yarn
git

## Usage

Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#example-workflow) is available below.

For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file)

### Inputs

- `path`: The path to the file within the repository.

### Outputs

- `current-version`: The current version read from the file.

### Example Workflow

```yaml
on:
  push:
    branches:
    - '**'
  pull_request:
    types: [closed]

name: GitHub action workflow name

jobs:
  context:
    name: Job name
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Get current version
        uses: woksin-org/read-version-from-file-action@v2
        with:
          path: ./Source/version.json
```

## Contributing

We're always open for contributions and bug fixes!
