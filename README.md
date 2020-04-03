<img src="https://app.omniboard.dev/assets/logo_email.png" height="50">

# @omniboard/analyzer

## Getting started

### Create account, get API key and define checks

1. Create account for [Omniboard.dev](https://www.omniboard.dev)
2. Generate API key in the [Omniboard.dev](https://app.omniboard.dev/app/api-keys) ([docs](https://www.omniboard.dev/docs#api-key))
3. Set API key as an `OMNIBOARD_API_KEY` environment variable (or pass it in using `--api-key` flag when running `omniboard` command, never commit your API key to the version control system)
4. (optional) test your API key using `npx omniboard test-connection --api-key <your-api-key>` (same as `omniboard tc --ak <your-api-key>`)
5. Define checks in the [Omniboard.dev](https://app.omniboard.dev/app/checks) app

### Run in projects

Make sure that you have already set `OMNIBOARD_API_KEY` environment variable in the given environment

1. `npm i -D @omniboard/analyzer` in the project we want to analyze (dev dependency)
2. run `npx omniboard` (or run `omniboard` as a npm script, eg `"postbuild": "omniboard""`)

## Options

Run `omniboard --help` for list of all supported commands and options (`omniboard <command> --help`, provides even more details)

- `--help` - prints help
- `--verbose` - print debug log statements
- `--api-key` - pass in API key when not set as an environment variable

## How it works

1. retrieve current checks defined in the Omniboard.dev app
2. run retrieved checks for the current project (skip checks that are disabled or if project name does not match provided pattern)
3. upload checks results to the Omniboard.dev app (if `OMNIBOARD_API_KEY` env variable or `--api-key` flag is present)
4. (Optional) store check results locally (when `--json` flag was present)
5. Explore results in the Omniboard.dev app using projects, results or dashboards overview

## FAQ

#### Is this uploading my source to the cloud?

No. The `@omniboard/analyzer` runs checks against your source code (or even generated artifacts) 
and uploads results of these checks to the cloud service for further processing. 
The uploaded content is then just metadata describing the projects and results but NOT the projects themselves.

In theory, a check which matches everything could be constructed but such result will 
be rejected as it would be of unreasonable size...
