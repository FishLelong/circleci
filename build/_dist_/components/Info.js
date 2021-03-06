/* src/components/Info.svelte generated by Svelte v3.29.0 */
import {
	SvelteComponent,
	append,
	attr,
	component_subscribe,
	destroy_each,
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
import pools from "../config/pools.json.proxy.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[3] = list[i];
	return child_ctx;
}

// (36:4) {#each links as link}
function create_each_block(ctx) {
	let li;
	let a;
	let t0_value = /*link*/ ctx[3].text + "";
	let t0;
	let a_href_value;
	let a_alt_value;
	let t1;

	return {
		c() {
			li = element("li");
			a = element("a");
			t0 = text(t0_value);
			t1 = space();
			attr(a, "href", a_href_value = /*link*/ ctx[3].href);
			attr(a, "alt", a_alt_value = /*link*/ ctx[3].text);
			attr(a, "target", "_blank");
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, a);
			append(a, t0);
			append(li, t1);
		},
		p(ctx, dirty) {
			if (dirty & /*links*/ 1 && t0_value !== (t0_value = /*link*/ ctx[3].text + "")) set_data(t0, t0_value);

			if (dirty & /*links*/ 1 && a_href_value !== (a_href_value = /*link*/ ctx[3].href)) {
				attr(a, "href", a_href_value);
			}

			if (dirty & /*links*/ 1 && a_alt_value !== (a_alt_value = /*link*/ ctx[3].text)) {
				attr(a, "alt", a_alt_value);
			}
		},
		d(detaching) {
			if (detaching) detach(li);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let h1;
	let t0_value = /*$_*/ ctx[1]("general.info") + "";
	let t0;
	let t1;
	let ul;
	let each_value = /*links*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div = element("div");
			h1 = element("h1");
			t0 = text(t0_value);
			t1 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "info-container");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h1);
			append(h1, t0);
			append(div, t1);
			append(div, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*$_*/ 2 && t0_value !== (t0_value = /*$_*/ ctx[1]("general.info") + "")) set_data(t0, t0_value);

			if (dirty & /*links*/ 1) {
				each_value = /*links*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $_;
	component_subscribe($$self, _, $$value => $$invalidate(1, $_ = $$value));
	let { token } = $$props;

	// TODO: pull this from the markdown
	let links = [{ href: "#", text: "Loading..." }];

	$$self.$$set = $$props => {
		if ("token" in $$props) $$invalidate(2, token = $$props.token);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*token*/ 4) {
			$: (async () => {
				const response = await fetch(pools[token].docs);
				const markdown = await response.text();
				const data = markdown.toString().split("## Marketing Info")[1];
				const parts = data.split("{% endhint %}");

				$$invalidate(0, links = parts[1].split("\n").filter(link => link.match(/  */g)).map(raw => {
					return {
						href: raw.match(/\((.*)\)/)[1],
						text: raw.match(/\[(.*)\]/)[1]
					};
				}));
			})();
		}
	};

	return [links, $_, token];
}

class Info extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { token: 2 });
	}
}

export default Info;