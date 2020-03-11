const spawn = require('child_process').spawn,
const { version } = require('./package.json')

const commands = [
  `git tag -a 'v${version}' -m 'v${version}'`,
  `git push origin v${version}`
]

function spawnWithOut(command) {
  // From https://stackoverflow.com/a/10232330
  const spawned = spawn(command);

  spawned.stdout.on('data', function (data) {
    console.log(data.toString());
  });
  
  spawned.stderr.on('data', function (data) {
    console.log(data.toString());
  });
  
  spawned.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
  });
}


const command = commands.join(' && ')

if (process.argv.includes('--dryRun')) {
  console.log(command)
} else {
  spawnWithOut(command)
}
