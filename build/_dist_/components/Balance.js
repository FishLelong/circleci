/* src/components/Balance.svelte generated by Svelte v3.29.0 */
import {
	SvelteComponent,
	append,
	attr,
	component_subscribe,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	set_data,
	space,
	text
} from "../../web_modules/svelte/internal.js";

import { _ } from "../../web_modules/svelte-i18n.js";
import { isAddress } from "../../web_modules/@pie-dao/utils.js";
import images from "../config/images.json.proxy.js";
import pools from "../config/pools.json.proxy.js";
import { balanceKey, balances, eth } from "../stores/eth.js";
import { currentRoute } from "../stores/routes.js";
import { subscribeToBalance } from "./helpers.js";

function create_fragment(ctx) {
	let div2;
	let div0;
	let img;
	let img_src_value;
	let t0;
	let h1;
	let t1;
	let t2;
	let div1;
	let span;
	let t3_value = /*$_*/ ctx[5]("your") + "";
	let t3;
	let t4;
	let t5_value = /*$_*/ ctx[5]("balance") + "";
	let t5;
	let t6;
	let h5;
	let t7;

	return {
		c() {
			div2 = element("div");
			div0 = element("div");
			img = element("img");
			t0 = space();
			h1 = element("h1");
			t1 = text(/*symbol*/ ctx[3]);
			t2 = space();
			div1 = element("div");
			span = element("span");
			t3 = text(t3_value);
			t4 = space();
			t5 = text(t5_value);
			t6 = space();
			h5 = element("h5");
			t7 = text(/*balance*/ ctx[0]);
			if (img.src !== (img_src_value = /*tokenLogo*/ ctx[4])) attr(img, "src", img_src_value);
			attr(img, "alt", /*symbol*/ ctx[3]);
			attr(div0, "class", "left");
			attr(span, "class", /*yourBalanceClass*/ ctx[2]);
			attr(h5, "class", /*balanceClass*/ ctx[1]);
			attr(div1, "class", "right");
			attr(div2, "class", "balance-container");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);
			append(div0, img);
			append(div0, t0);
			append(div0, h1);
			append(h1, t1);
			append(div2, t2);
			append(div2, div1);
			append(div1, span);
			append(span, t3);
			append(span, t4);
			append(span, t5);
			append(div1, t6);
			append(div1, h5);
			append(h5, t7);
		},
		p(ctx, [dirty]) {
			if (dirty & /*tokenLogo*/ 16 && img.src !== (img_src_value = /*tokenLogo*/ ctx[4])) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*symbol*/ 8) {
				attr(img, "alt", /*symbol*/ ctx[3]);
			}

			if (dirty & /*symbol*/ 8) set_data(t1, /*symbol*/ ctx[3]);
			if (dirty & /*$_*/ 32 && t3_value !== (t3_value = /*$_*/ ctx[5]("your") + "")) set_data(t3, t3_value);
			if (dirty & /*$_*/ 32 && t5_value !== (t5_value = /*$_*/ ctx[5]("balance") + "")) set_data(t5, t5_value);

			if (dirty & /*yourBalanceClass*/ 4) {
				attr(span, "class", /*yourBalanceClass*/ ctx[2]);
			}

			if (dirty & /*balance*/ 1) set_data(t7, /*balance*/ ctx[0]);

			if (dirty & /*balanceClass*/ 2) {
				attr(h5, "class", /*balanceClass*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div2);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $eth;
	let $balances;
	let $_;
	component_subscribe($$self, eth, $$value => $$invalidate(8, $eth = $$value));
	component_subscribe($$self, balances, $$value => $$invalidate(9, $balances = $$value));
	component_subscribe($$self, _, $$value => $$invalidate(5, $_ = $$value));
	let { token } = $$props;
	let balance = "loading...";
	let key;
	let balanceClass = "blur-heavy";
	let yourBalanceClass = "blur-light";

	$$self.$$set = $$props => {
		if ("token" in $$props) $$invalidate(6, token = $$props.token);
	};

	let symbol;
	let tokenLogo;

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*token*/ 64) {
			$: $$invalidate(3, symbol = (pools[token] || {}).symbol);
		}

		if ($$self.$$.dirty & /*token*/ 64) {
			$: $$invalidate(4, tokenLogo = images.logos[token]);
		}

		if ($$self.$$.dirty & /*token, $eth*/ 320) {
			$: if (isAddress(token) && isAddress($eth.address)) {
				$$invalidate(1, balanceClass = "");
				$$invalidate(2, yourBalanceClass = "");
				$$invalidate(7, key = balanceKey(token, $eth.address));
				subscribeToBalance(token, $eth.address);
			}
		}

		if ($$self.$$.dirty & /*$balances, key, $_*/ 672) {
			$: if ($balances[key]) {
				$$invalidate(0, balance = $balances[key].dp(9).toString());
			} else {
				$$invalidate(0, balance = `${$_("general.loading")}...`);
			}
		}
	};

	return [balance, balanceClass, yourBalanceClass, symbol, tokenLogo, $_, token];
}

class Balance extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { token: 6 });
	}
}

export default Balance;