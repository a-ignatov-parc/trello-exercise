var colors = require('colors'),
	Parser = require('./src/parser');

colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

new Parser('ttvmswxjzdgzqxotby_lslonwqaipchgqdoz_fqagixrobjtnljqzpptzfcdcjjcpjjnnvopmhyd_');
// new Parser('ttvmswxjzdgzqxotby_lslonwqaipchgqdo_yz_fqdagixyrobdjtnl_jqzpptzfcdcjjcpjjnnvopmh');