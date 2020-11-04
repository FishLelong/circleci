<script>
  import { _ } from "svelte-i18n";

  import images from "../config/images.json";
  import links from "../config/links.json";

  import Web3Button from "./Web3Button.svelte";
  import Language from "./Language.svelte";
  import { onMount } from 'svelte';

  let mobileMenuVisible = false;
  let logo = 'images/logo.png';


  const toggleMobileMenu = () => {
    mobileMenuVisible = !mobileMenuVisible;
  };
  let currentRoute = '';

  const deriveRoute = () => {
  try {
     const core = window.location.href.split('#')[1];

    if (!core) {
      return [];
    }

     const parts = core.split('/').filter((part) => part && part.length > 0);

    return parts;
  } catch (e) {
    return [];
  }
};


onMount(() => {
  const newRoute = deriveRoute();
  currentRoute = newRoute[0];
});
window.addEventListener('hashchange', () => {
  const newRoute = deriveRoute();
  currentRoute = newRoute[0];
});



</script>
<div class="header-container">
  <div class="left">
    <a href="#/" on:click={deriveRoute}>
    hhhh
      <!-- <img src={logo} alt={$_('general.logo')} /> -->
    </a>
  </div>
  <div class="right">
    <a class="link" href="https://balancer.exchange/#/swap/ether/0xad32A8e6220741182940c5aBF610bDE99E737b2D" target="_blank">
      <button class="{currentRoute != 'stake' && currentRoute != 'ceptoken' && currentRoute != 'earlybird' ? 'table-btn highlight-box': ''}">
        {$_('header.buyceptoken')}
      </button>
    </a>
    <span class="link">🥧</span>
    <a class="link" href="#/stake">
      <button class="{currentRoute == 'stake' ? 'table-btn highlight-box': ''}">
      { $_('general.stake')}
      </button>
    </a>
    <span class="link">🥧</span>

    <a class="link" href="#/ceptoken" rel="noopener noreferrer">
      <button class="{currentRoute == 'ceptoken' ? 'table-btn highlight-box': ''}">
        {$_('header.ceptoken')}
      </button>
    </a>

    <a class="link" href="#/earlybird">
      <button class="{currentRoute == 'earlybird' ? 'table-btn highlight-box': ''}">
        {$_('header.earlybird')}
      </button>
    </a>

    <a class="link" href={links.vision} target="_blank" rel="noopener noreferrer">
      {$_('general.vision')}
    </a>

    <a class="link" href={links.dao} target="_blank" rel="noopener noreferrer">
      {$_('piedao.aragonLink')}
    </a>
    <a class="link" href={links.docs} target="_blank" rel="noopener noreferrer">
      {$_('general.docs')}
    </a>
    
    <Web3Button />
    <Language />
    <div class="mobile-placeholder" />

    <button class="hamburger" type="button" on:click={toggleMobileMenu}>
      <img src={images.icons.hamburger} alt="hamburger icon" class="w-min-20px" />
    </button>

    {#if mobileMenuVisible}
      <div class="overlay">
        <button type="button" class="close" on:click={toggleMobileMenu}>
          {$_('general.close')}
        </button>
        <nav>
          <ul>
            <li>
              <a href={links.root} on:click={toggleMobileMenu}>{$_('general.home')}</a>
            </li>
            <li>
              <a
                class="navbar-item"
                href={links.docs}
                on:click={toggleMobileMenu}
                rel="noopener noreferrer"
                target="_blank">
                {$_('general.docs')}
              </a>
            </li>
            <li>
              <a class="navbar-item" href="#/ceptoken">
                $CEPToken
              </a>
            </li>
            <li>
              <a class="navbar-item" href="#/pie/0xad6a626ae2b43dcb1b39430ce496d2fa0365ba9c">
                DEFI+S
              </a>
            </li>
            <li>
              <a class="navbar-item" href="#/pie/0x9a48bd0ec040ea4f1d3147c025cd4076a2e71e3e">
                USD++
              </a>
            </li>
            <li>
              <a class="navbar-item" href="#/pie/0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd">
                BTC++
              </a>
            </li>
            <li>
              <a class="navbar-item" href="#/stake">
                Stake
              </a>
            </li>
            <li>
              <a class="navbar-item" href={links.vision} target="_blank" rel="noopener noreferrer">
                {$_('general.vision')}
              </a>
            </li>
            <li>
              <a class="navbar-item" href={links.dao} target="_blank" rel="noopener noreferrer">
                {$_('piedao.aragonLink')}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    {/if}
  </div>
</div>
<style>
  .header-container .left img {
    height: 50px;
  }
  .header-container .right .link {
    margin-left: 1.3rem;
  }
  button {
    outline:none;
  } 
</style>
