const { exec } = require('child_process')
const { version } = require('./package.json')

const commands = [
  `git tag -a 'v${version}' -m 'v${version}'`,
  `git push origin v${version}`
]

const command = commands.join(' && ')

if (process.argv.includes('--dryRun')) {
  console.log(command)
} else {
  exec(command, () => console.log(`Added tag v${version}`))
}
