This file explains how Visual Studio created the project.

The following tools were used to generate this project:
- create-vite

The following steps were used to generate this project:
- Create react project with create-vite: `npm init --yes vite@latest bghelper.client -- --template=react-ts  --no-rolldown --no-immediate`.
- Update `vite.config.ts` to set up local HTTPS certificates and PWA support.
- Add `@type/node` for `vite.config.js` typing.
- Create the Board Game Helper app shell.
- Create project file (`bghelper.client.esproj`).
- Create `launch.json` to enable debugging.
- Add project to solution.
- Add project to the startup projects list.
- Write this file.
