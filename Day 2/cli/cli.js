var readline = require('readline');
var events = require('events');
var e = new events.EventEmitter();
var os = require('os');
const chalk = require('chalk');


var cli = {};

cli.init = () => {
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,		
		prompt: chalk.green("\n>> "),
	});
	rl.prompt();
	rl.on('line', (str) => {
		cli.processInput(str);
		rl.prompt();
	});	
	
};

cli.processInput = (str) => {
	var cmdInputs = [ "exit", "man", "date", "help", "stats", "time" ];
	var helpObj = {
		stats: 'Displays the CPU and machine statistics',
		date: 'Display current Date',
		time: 'Display current time',
		help: 'Refer the commands of CLI',
		exit: 'Close the running CLI',
	};
	cmdInputs.forEach( (val,i) => {
		if(str.includes(val)) {
			switch(val) {
				case 'exit':
					return e.emit('exit', str);				
				
				case 'date':
					return e.emit('date', str);

				case 'help':
					return e.emit('help', helpObj);

				case 'stats':
					return e.emit('stats', str);

				case 'time':
					return e.emit('time', str);
			}
		}
	});

	if(!cmdInputs.includes(str)) console.log('Command Not Found!');
}

// CLEVER PRACTICE
// cli.processInput = (str) => {
// 	cmdInputs.some( (input) => {
// 		if( str.indexOf(input) > -1) {
// 			e.emit(input, str);
// 			return true;
// 		}
// 	}
// }

e.on('exit', () => {
	process.exit(0);
})

e.on('stats', () => {
	horizontal('STATS')
	const statsObj = {
		freeMemory: Math.floor(((os.freemem()/1024)/1024)),
		model: os.cpus()[0].model,
		'CPU Count': 	os.cpus().length,
		uptime: Math.floor(os.uptime()/60),
	}

	displayObj(statsObj);
})

e.on('date', () => {
	var date = new Date();
	console.log(chalk.bgRed(date.toDateString()));
})

e.on('time', () => {
	var date = new Date();
	console.log(chalk.bgRed(date.toLocaleTimeString()));
})

e.on('help', (helpObj) => {
	horizontal('HELP');
	displayObj(helpObj);	
});

function horizontal(val) {
	let length = process.stdout.columns;
	//console.log(length);
  let line = '', bottom = '', helpName = val;
	for(var i = 0; i < length; i++) {
		line += '~';
		bottom += '-';
		if(i< (length/2)-3)
		helpName = ' ' + helpName + ' ';
		
	}
	console.log(chalk.cyan(line));
	console.log(chalk.bold.inverse(helpName));
	console.log(chalk.cyan(bottom));

	return length;
}

function displayObj(Obj) {
	let horizontalLength = process.stdout.columns;

	for (let key in Obj) {
		let str = "      " + key;		
		for(var i = 0; i < horizontalLength; i++) {
				if(i < horizontalLength * 0.30 - key.length) {
					str += " ";
				}
			}
			console.log(chalk.yellow(str),chalk.red(' : '), chalk.bgBlue(Obj[key]));
		} // end of for in
}

module.exports = cli;
