<script>
  import orderBy from 'lodash/orderBy';
  import poolsConfig from "../config/pools.json";
  import { pools } from '../stores/eth.js';
  import images from "../config/images.json";
  import { _ } from "svelte-i18n";
  import FarmerTable from "../components/FarmerTable.svelte";


  import {
    getTokenImage,
    formatFiat,
  } from "../components/helpers.js";

  $: pies = orderBy((poolsConfig.selectable.map(address => {
    return {
      ...poolsConfig[address],
      address,
      icon: getTokenImage(address),
      totalLiquidity: $pools[`${address}-usd`] ? formatFiat( $pools[`${address}-usd`].toFixed(2).toString() ) : '-',
      totalLiquidityNum: $pools[`${address}-usd`] ? $pools[`${address}-usd`].toNumber() : 0
    };
  }) || []), ['totalLiquidityNum'], ['desc']);

  const addToken = (pie) => {
    ethereum.sendAsync({
        method: 'wallet_watchAsset',
        params: {
          "type":"ERC20",
          "options":{
            "address": pie.address,
            "symbol": pie.symbol,
            "decimals": 18,
            "image": pie.icon,
          },
        },
        id: Math.round(Math.random() * 100000),
    }, (err, added) => {
      if (added) {
        console.log('Thanks for your interest!')
      } else {
        alert('Something went wrong. Is Metamask there?')
      }
    })
  };
  let banner = 'images/banner.png'
</script>

<div class="content flex flex-col spl">

  <img alt="ready to diversify?" src={banner} />
  <div class="w-99pc m-4">

    <div class="my-10">
      <h1 class="text-lg">🥧 {$_('dashboard.explore.pies')}</h1>
      <p class="font-thin">{$_('dashboard.an.entire.ortfolio.in.a.single.token')}</p>
    </div>
    
  <div class="flex flex-col w-100pc breakdown-table pt-2px">

    <div class="flex w-100pc min-w-1140px min-h-50px justify-center items-center py-3 mb-2 negativetop">
      <div class="font-thin text-left px-1pc items-stretch md:block w-15pc">
        {$_('dashboard.pie.name')}
      </div>
      <div class="font-thin text-center px-1pc block w-18pc md:block">
        {$_('dashboard.assets')}
      </div>
      <div class="font-thin text-center px-1pc w-18pc">
        {$_('dashboard.liquidity')}  
      </div>
      <div class="font-thin text-center px-1pc w-10pc">
        {$_('dashboard.market.buy')}
      </div>
      <div class="font-thin text-center px-1pc w-10pc">
        {$_('dashboard.mint.tokens')}
      </div>
      <div class="font-thin text-center px-1pc w-10pc">
        {$_('dashboard.unwrap')}
      </div>
      <div class="font-thin ext-center px-1pc w-16pc">
      </div>
    </div>

    {#each pies as pie}
      <div class="flex w-100pc min-w-1140px min-h-50px justify-between items-center py-3 negativetop thinborder">
       
        <div class="text-center thinborderight items-stretch md:block w-15pc">
            <a class="flex items-center px-2" href={`#/cep/${pie.address}`}>
              <img
                class="inline icon ml-2 mr-2"
                src={pie.icon}
                alt={pie.symbol} />
                <span class="md:block">{pie.symbol}</span>
            </a>
        </div>
       
        <div class="text-center thinborderight block w-18pc w-18pc md:block">
          <a class="" href={`#/pie/${pie.address}`}>
          {#each pie.composition as coin}
            <img
              class="close-icons inline icon"
              src={getTokenImage(coin.address)}
              alt={coin.symbol} />
          {/each}
        </a>
        </div>
       
        <div class="text-center px-4 thinborderight w-18pc">
          <a href={`#/pie/${pie.address}`}>
            {pie.totalLiquidity}
          </a>
        </div>
        
        <div class="text-center px-4 thinborderight w-10pc">
          <a target="_blank" href={`https://balancer.exchange/#/swap/ether/${pie.address}`}>
            <button class="table-btn highlight-box min-w-70px">
              {$_('dashboard.buy')}
            </button>
          </a>
        </div>
       
        <div class="text-center px-4 thinborderight w-10pc">
          <a href={`#/pools/${pie.address}`}>
            <button class="table-btn min-w-70px">
              {$_('dashboard.mint')}
            </button>
          </a>
        </div>
       
        <div class="text-center px-4 thinborderight w-10pc">
          <a href={`#/pools/${pie.address}/withdraw/multi`}>
            <button class="table-btn min-w-70px">
              {$_('dashboard.redeem')}
            </button>
          </a>
        </div>
       
        <div class="text-center px-4 w-16pc">
          <button on:click={() => addToken(pie)} class="table-btn min-w-70px">
            {$_('dashboard.add.to.metaMask')} 🦊
          </button>
        </div>
     
      </div>
    {/each}
    </div>



    <div class="mt-20 mb-0">
      <h1 class="text-lg">👨‍🌾 {$_('dashboard.honest.worker')}</h1>
      <p class="font-thin">{$_('dashboard.add.liquidity')}</p>
      <p class="font-thin">ℹ️ {$_('dashboard.apr.does')}</p>
    </div>

    
  </div>
  
</div>
<FarmerTable />
