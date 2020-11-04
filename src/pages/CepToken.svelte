<script>
    import images from "../config/images.json"
    import FarmerTable from "../components/FarmerTable.svelte";
    import {
        formatFiat,
        toFixed,
        subscribeToBalance,
    } from "../components/helpers.js";
import { _ } from "svelte-i18n";

    let circulatingSupply = 0
    let doughStaked = 0
    let price = 'n/a'

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
</script>
<div class="content flex flex-col spl">
   <img class="w-100pc h-auto md:w-100pc h-auto"src={'images/dough_hero.png'} alt="Ceproject Hero" />

   <div class="text-center font-thin text-xs mt-8 md:mt-20 md:text-lg">
    <strong>{$_('dough.governance.strong')}</strong>{$_('dough.governance.word')} <br/>
   </div>

   <div class="flex justify-around my-2">
      <div class="bg-black text-white p-2 rounded-sm text-center">{$_('dough.circulating.supply')}: <strong>{formatFiat(circulatingSupply, ',', '.', '')} CEPToken</strong></div>
      <div class="bg-black text-white p-2 mx-5 rounded-sm text-center">{$_('dough.staked')}: <strong>{formatFiat(doughStaked, ',', '.', '')} CEPToken</strong></div>
    </div>

   <div class="rounded-sm p-8 flex flex-col justify-between content-center items-center flex-wrap mt-4 md:mt-4">
     <div class="text-center p-4 text-2xl md:text-xl">{$_('general.price')}: <strong>{price}$ / CEPToken</strong></div>
     <a href="#/earlybird">
      <button class="btn m-0 mt-4 rounded-8px p-15px min-w-200px w-800px">
        {$_('header.earlybird')}
      </button>
    </a>

    <button on:click={() => addToken()} class="table-btn mt-4">
      Add to MetaMask 🦊
    </button>
   </div>

   <div class="bg-grey-243 rounded-sm pt-8 pb-8 flex justify-between flex-wrap w-full mt-4 md:mt-8">
    <div class="p-0 md:w-1/4">
      <div class="text-center font-thin text-xs md:text-base">{$_('dough.cep')}</div>
      <div class="text-center text-2xl md:text-xl font-black">Governance</div>
    </div>
    <div class="p-0 md:w-1/4">
      <div class="text-center font-thin text-xs md:text-base">Value accrual</div>
      <div class="text-center text-2xl md:text-xl font-black">Fees</div>
    </div>
    <div class="p-0 md:w-1/4">
        <div class="text-center font-thin text-xs md:text-base">Liquidity</div>
        <div class="text-center text-2xl md:text-xl font-black">Mining</div>
      </div>
    <div class="p-0 md:w-1/4">
      <div class="text-center font-thin text-xs md:text-base">DAOs Meta</div>
      <div class="text-center text-2xl md:text-xl font-black">Governance</div>
    </div>
  </div>

  <a class="singleTag font-bold mt-4 md:mt-4" target="_blank" href={`https://cepproject8.medium.com`}>Learn more on Medium</a>

  
  <!-- <img class="w-20pc h-auto mt-8 l md:mt-12 md:w-20pc"src={images.tokenmigration} alt="DOUGH Migration" />
  <h1 class="text-center text-lg  mt-8 md:text-xl md:mt-12">Token Migration</h1>
  <div class="text-center font-thin text-xs mt-2 md:mt-4 md:text-lg">
    CEP is entering the next phase of its mission to democratize the access to wealth allocation strategies by migrating the currently non-transferable token (CEPTokenv1) to a transferable one (CEPTokenv2).<br/>
    To further develop the community and to incentivize early adopters through the liquidity mining program the community believes the time is right to start the migration of CEPToken to CEPToken v2.<br/>
  </div>
  <a class="singleTag font-bold mt-4 md:mt-4" target="_blank" href={`https://cepproject8.medium.com`}>CEPToken Migration on Medium</a>
   -->

  <div class="bg-grey-243 rounded-sm p-8 flex justify-between flex-wrap w-full mt-8 md:mt-20">
    <div class="p-4 flex justify-center items-center content-center flex-wrap md:w-2/3">
        <h1 class="text-lg md:text-xl">{$_('dough.distribution.title')}</h1>
        <div class="font-thin text-xs mt-2 md:mt-4 md:text-base">
            {$_('dough.distribution.content1')}
            <strong>
              <ul class="list-disc list-inside mt-2 md:mt-4">
                <li>{$_('dough.distribution.content2')}</li>
                <li>{$_('dough.distribution.content3')}</li>
                <li>{$_('dough.distribution.content4')}</li>
                <li>{$_('dough.distribution.content5')}</li>
              </ul>
          </strong>
        </div>
    </div>
    <div class="p-4 flex justify-center w-full flex-wrap md:w-1/3 p-16"><img class="w-100pc h-full md:h-auto md:w-100pc"src={'images/vestingperiod.png'} alt="PieDAO Hero" /></div>
  </div>
  <!-- <div class="bg-grey-243 rounded-sm p-8 flex justify-between flex-wrap w-full mt-4 md:mt-8">
    <div class="p-4 flex justify-center w-full flex-wrap md:w-1/3 p-16"><img class="w-100pc h-full h-auto md:w-100pc"src={images.howtomigrate} alt="PieDAO Hero" /></div>
    <div class="p-4 flex justify-center items-center content-center flex-wrap md:w-2/3">
        <h1 class="text-lg md:text-xl">How to Migrate</h1>
        <div class="font-thin text-xs mt-2 md:mt-4 md:text-base">
            To make the process as simple as possible an Aragon app will be installed which allows you to migrate your tokens.<br/>
            By visiting the Aragon interface of CEP and opening the migration app you can easily migrate your already vested tokens to CEPToken v2.
            The interface will automatically fill in the maximum amount you are able to migrate.<br/>
            <a class="font-bold mt-4 md:mt-4" target="_blank" href={`https://medium.com/piedao/dough-farming-season-7329ea5e84dd`}>Migration Tutorial</a><br/>
            <a class="font-bold mt-4 md:mt-4" target="_blank" href={`https://client.aragon.org/?#/piedao/0x968986e7ab9d05b4f6334efdc6c4c5efd89d4119/`}>Migrate Now</a>


        </div>
    </div>
  </div> -->



  <img class="w-25pc h-auto mt-8 l md:mt-16 md:w-25pc h-auto"src={'images/farming.png'} alt="PieDAO Hero" />
  <h1 class="text-center text-lg  mt-8 md:text-xl md:mt-12">{ $_('dough.mining.title') }</h1>
  <div class="text-left font-thin text-xs mt-2 md:mt-4 md:text-lg">
    {$_('dough.mining.content1')}
  </div>
    <div class="text-left font-thin text-xs mt-2 md:mt-4 md:text-lg">
    <strong>{$_('dough.mining.content2.strong')} </strong>
    {$_('dough.mining.content2.word')} 
</div>
    <div class="text-left font-thin text-xs mt-2 md:mt-4 md:text-lg">
    <strong>{$_('dough.mining.content3.strong')} </strong>
    {$_('dough.mining.content3.word')} 
</div>
<div class="text-left font-thin text-xs mt-2 md:mt-4 md:text-lg">
    <strong>{$_('dough.mining.content3.strong')} </strong>
    {$_('dough.mining.content3.word')} 
</div>

  <a class="singleTag font-bold mt-4 md:mt-4" target="_blank" href={`https://cepproject8.medium.com/`}>Farming Season on Medium</a>
  <h1 class="text-center text-lg  mt-8 md:text-xl md:mt-12">{$_('dough.available.pools')}</h1>
  <div class="liquidity-container flex flex-col align-center bg-grey-243 rounded-4px p-4 my-4 md:p-0 w-full">
      <FarmerTable />
  </div>
</div>