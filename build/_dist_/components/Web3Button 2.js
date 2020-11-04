/* src/components/Web3Button 2.svelte generated by Svelte v3.29.0 */
import {
	SvelteComponent,
	append,
	attr,
	component_subscribe,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_data,
	space,
	text
} from "../../web_modules/svelte/internal.js";

import { connectWeb3, eth, connectWeb3Cached } from "../stores/eth.js";
import { shortenAddress } from "../../web_modules/@pie-dao/utils.js";

function create_else_block(ctx) {
	let t;

	return {
		c() {
			t = text("Connect Web3");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (25:4) {#if address}
function create_if_block_1(ctx) {
	let p;
	let t1;

	return {
		c() {
			p = element("p");
			p.textContent = `${/*shortAddress*/ ctx[1]}`;
			t1 = text("\n      🔌");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			insert(target, t1, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(p);
			if (detaching) detach(t1);
		}
	};
}

// (17:2) {#if $eth.address}
function create_if_block(ctx) {
	let p;
	let t0_value = /*$eth*/ ctx[0].shortAddress + "";
	let t0;
	let t1;
	let div1;
	let div0;
	let raw_value = /*$eth*/ ctx[0].icon + "";

	return {
		c() {
			p = element("p");
			t0 = text(t0_value);
			t1 = space();
			div1 = element("div");
			div0 = element("div");
			attr(div0, "class", "image-container");
			attr(div1, "class", "icon-container");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t0);
			insert(target, t1, anchor);
			insert(target, div1, anchor);
			append(div1, div0);
			div0.innerHTML = raw_value;
		},
		p(ctx, dirty) {
			if (dirty & /*$eth*/ 1 && t0_value !== (t0_value = /*$eth*/ ctx[0].shortAddress + "")) set_data(t0, t0_value);
			if (dirty & /*$eth*/ 1 && raw_value !== (raw_value = /*$eth*/ ctx[0].icon + "")) div0.innerHTML = raw_value;;
		},
		d(detaching) {
			if (detaching) detach(p);
			if (detaching) detach(t1);
			if (detaching) detach(div1);
		}
	};
}

function create_fragment(ctx) {
	let button;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*$eth*/ ctx[0].address) return create_if_block;
		if (address) return create_if_block_1;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	return {
		c() {
			button = element("button");
			if_block.c();
			attr(button, "class", "btn connect-button-container");
			attr(button, "role", "button");
			attr(button, "tabindex", "-100");
		},
		m(target, anchor) {
			insert(target, button, anchor);
			if_block.m(button, null);

			if (!mounted) {
				dispose = listen(button, "click", connectWeb3);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(button, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(button);
			if_block.d();
			mounted = false;
			dispose();
		}
	};
}

const address = null;

function instance($$self, $$props, $$invalidate) {
	let $eth;
	component_subscribe($$self, eth, $$value => $$invalidate(0, $eth = $$value));

	if (window.localStorage.getItem("address")) {
		connectWeb3Cached();
	}

	const shortAddress = address ? shortenAddress(address) : "";
	return [$eth, shortAddress];
}

class Web3Buttonu202 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Web3Buttonu202;