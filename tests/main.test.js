test('Testing Parser on example #1', function() {
	var string = 'daccadfghd_i',
		parser = new window.Parser(string, true),
		expectedResults = [
			'daccafgh_id',
			'daafgh_idc',
			'dfgh_idca',
			'fgh_icad',
			'fgh'
		],
		count = 0;

	equal(parser.string, string, 'Parser string property should be equal to passed string');
	equal(parser.string, parser.result, 'In the beginning Parser string property should be equal to result property');

	while(parser.hasNext()) {
		parser.next();
		equal(parser.updateResult(), expectedResults[count], 'Step #' + (++count) + ' should be equalt to expected value');
	}
});

test('Testing Parser on example #2', function() {
	var string = 'abacbcbefge',
		parser = new window.Parser(string, true),
		expectedResults = [
			'aaccbefgeb',
			'aaccbfgbe',
			'aaccfgeb',
			'ccfgeba',
			'fgebac'
		],
		count = 0;

	equal(parser.string, string, 'Parser string property should be equal to passed string');
	equal(parser.string, parser.result, 'In the beginning Parser string property should be equal to result property');

	while(parser.hasNext()) {
		parser.next();
		equal(parser.updateResult(), expectedResults[count], 'Step #' + (++count) + ' should be equalt to expected value');
	}
});

test('Testing Parser on example #3', function() {
	var string = '_a_abda_',
		parser = new window.Parser(string, true),
		expectedResults = [
			'__abd_a',
			'_abda_',
			'_bd_a',
			'bda_',
			'bda'
		],
		count = 0;

	equal(parser.string, string, 'Parser string property should be equal to passed string');
	equal(parser.string, parser.result, 'In the beginning Parser string property should be equal to result property');

	while(parser.hasNext()) {
		parser.next();
		equal(parser.updateResult(), expectedResults[count], 'Step #' + (++count) + ' should be equalt to expected value');
	}
});

test('Testing Parser on example #4', function() {
	var string = 'ttvmswxjzdgzqxotby_lslonwqaipchgqdo_yz_fqdagixyrobdjtnl_jqzpptzfcdcjjcpjjnnvopmh',
		parser = new window.Parser(string, true),
		expectedResults = [
			'ttvmswxjzdgzqxotby_lslonwqaipchgqdo_z_fqdagixrobdjtnl_jqzpptzfcdcjjcpjjnnvopmhy',
			'ttvmswxjzdgzqxotby_lslonwqaipchgqdo_z_fqagixrobjtnl_jqzpptzfcdcjjcpjjnnvopmhyd',
			'ttvmswxjzdgzqxotby_lslonwqaipchgqdoz_fqagixrobjtnljqzpptzfcdcjjcpjjnnvopmhyd_',
			'ttvmswxjzdgzqxotby_lslonwaipchgqdoz_fagixrobjtnljqzpptzfcdcjjcpjjnnvopmhyd_q',
			'ttvmswxjzdgzqxotby_lslonwipchgqdoz_fgixrobjtnljqzpptzfcdcjjcpjjnnvopmhyd_qa',
			'ttvmswxjzdgzqxotby_lslnwipchgqdz_fgixrobjtnljqzpptzfcdcjjcpjjnnvopmhyd_qao',
			'ttvmswxjzdgzqxotby_lslnwipchgqdz_fgixrobjtnljqzpptzfcdcjjcpjjnnvpmhyd_qao',
			'ttvmswxjzdgzqxotby_lslnwipchqdz_fixrobjtnljqzpptzfcdcjjcpjjnnvpmhyd_qaog',
			'ttvmswxjzdgzqxotby_lslnwpchqdz_fxrobjtnljqzpptzfcdcjjcpjjnnvpmhyd_qaogi',
			'ttvmswxjzdgzqxotby_lslwpchqdz_fxrobjtljqzpptzfcdcjjcpjjnnvpmhyd_qaogin',
			'ttvmswxjzdgzqxotby_slwpchqdz_fxrobjtjqzpptzfcdcjjcpjjnnvpmhyd_qaoginl',
			'ttvmswxjzdgzqxotby_slwpchqdz_fxrobjtjqzpptzfcdcjjcpjjnvpmhyd_qaogiln',
			'ttvmswxjzdgzqxotby_slwpchqdz_fxrobjtjqzpptzfcdcjjcpjjvpmhyd_qaogiln',
			'ttvmswxjzdgzxotby_slwpchdz_fxrobjtjqzpptzfcdcjjcpjjvpmhyd_qaogilnq',
			'ttvmswxjzgzxotby_slwpchz_fxrobjtjqzpptzfcdcjjcpjjvpmhyd_qaogilnqd',
			'ttvmswxjgzxotby_slwpch_fxrobjtjqzpptzfcdcjjcpjjvpmhyd_qaogilnqdz',
			'ttvmswxjgzxotbyslwpchfxrobjtjqzpptzfcdcjjcpjjvpmhyd_qaogilnqdz_',
			'ttvmswjgzxotbyslwpchfrobjtjqzpptzfcdcjjcpjjvpmhyd_qaogilnqdz_x',
			'ttvmswjgzxtbyslwpchfrbjtjqzpptzfcdcjjcpjjvpmhyd_qaogilnqdz_xo',
			'tvmswjgzxbyslwpchfrbjtjqzpptzfcdcjjcpjjvpmhyd_qaogilnqdz_xot',
			'tvmswjgzxyslwpchfrjtjqzpptzfcdcjjcpjjvpmhyd_qaogilnqdz_xotb',
			'tvmswgzxyslwpchfrjtqzpptzfcdcjjcpjjvpmhyd_qaogilnqdz_xotbj',
			'tvmswgxyslwpchfrjtqpptzfcdcjjcpjjvpmhyd_qaogilnqdz_xotbjz',
			'tvmswgxyslwpchfrjtqpptzfcdcjjcpjjvpmhyd_qagilnqdz_xtbjzo',
			'tvmswgxyslwchfrjtqptzfcdcjjcpjjvpmhyd_qagilnqdz_xtbjzop',
			'tvmsgxyslchfrjtqptzfcdcjjcpjjvpmhyd_qagilnqdz_xtbjzopw',
			'tvmsgxyslchfrjtqptzfcdcjjcpjjvpmhyd_agilndz_xtbjzopwq',
			'tvmsgxyslchfrjtqptzfcdcjjcpjjvpmhydagilndzxtbjzopwq_',
			'tvmsgxyslchfrjtqptzfcdcjjcpjjvpmhyagilnzxtbjzopwq_d',
			'tvmsgxyslchfrjtqptzfcdcjjcpjvpmhyagilnzxtbzopwq_dj',
			'tvmgxylchfrjtqptzfcdcjjcpjvpmhyagilnzxtbzopwq_djs',
			'vmgxylchfrjtqpzfcdcjjcpjvpmhyagilnzxtbzopwq_djst',
			'vmgxylchfrjtqpzfcdcjjcpjvpmhyagilnzxbzopwq_djst',
			'vmgxylchrjtqpzcdcjjcpjvpmhyagilnzxbzopwq_djstf',
			'vmgxylhrjtqpzcdjjcpjvpmhyagilnzxbzopwq_djstfc',
			'vmgxylhrtqpzcdjcpjvpmhyagilnzxbzopwq_djstfcj',
			'vmgxylhrtqpzcdjcpjvpmhyagilnzxbzopwq_dstfcj',
			'vmgxylhrtqpzdjpjvpmhyagilnzxbzopwq_dstfcjc',
			'vmgxylhrtqzdjjvpmhyagilnzxbzopwq_dstfcjcp',
			'vmgxylhrtqzdjjvpmhyagilnxbopwq_dstfcjcpz',
			'vmgxylhrtqzdjjvmhyagilnxbowq_dstfcjcpzp',
			'vmgxylhrtqzdjvmhyagilnxbowq_dstfccpzpj',
			'vmgxylhrtzdjvmhyagilnxbow_dstfccpzpjq',
			'vmgxylhrtzjvmhyagilnxbow_stfccpzpjqd',
			'vmgxylhrzjvmhyagilnxbow_sfccpzpjqdt',
			'mgxylhrzjmhyagilnxbow_sfccpzpjqdtv',
			'gxylhrzjhyagilnxbow_sfccpzpjqdtvm',
			'gxylrzjyagilnxbow_sfccpzpjqdtvmh',
			'gxyrzjyaginxbow_sfccpzpjqdtvmhl',
			'gxrzjaginxbow_sfccpzpjqdtvmhly',
			'grzjaginbow_sfccpzpjqdtvmhlyx',
			'rzjainbow_sfccpzpjqdtvmhlyxg',
			'rzjainbow_sfcczjqdtvmhlyxgp',
			'rzjainbow_sfzjqdtvmhlyxgpc',
			'rjainbow_sfjqdtvmhlyxgpcz',
			'rainbow_sfqdtvmhlyxgpczj',
			'rainbow'
		],
		count = 0;

	equal(parser.string, string, 'Parser string property should be equal to passed string');
	equal(parser.string, parser.result, 'In the beginning Parser string property should be equal to result property');

	while(parser.hasNext()) {
		parser.next();
		equal(parser.updateResult(), expectedResults[count], 'Step #' + (++count) + ' should be equalt to expected value');
	}
});