<script>
  import { _ } from "svelte-i18n";
  import links from "../config/links.json";
  let aragonImg = 'images/aragon.png'

</script>
<div class="content flex flex-col spl">
  <div class="bg-grey-243 rounded-sm p-8 flex justify-between flex-wrap w-full mt-8 md:mt-20">
    <div class="p-4 flex items-center content-center flex-wrap md:w-2/3">
        <h1 class="text-lg md:text-xl">{$_('marketbuy.title')}</h1>
        <div class="font-thin text-xs mt-2 md:mt-4 md:text-base">
            <strong>
              <ul class="list-disc items-center list-inside mt-2 md:mt-4">
                <li class="flex items-center"><i class="iconfont icon-Twitterletterlogo1"></i>: <a class="pl-2" target="_blank" href={'https://twitter.com/CEP_project_'}> twitter</a></li>
                <li class="flex items-center"><i class="iconfont icon-medium1"></i>&nbsp;: <a class="pl-2" target="_blank" href={'https://cepproject8.medium.com'}>medium</a></li>
                <li class="flex items-center"><i class="iconfont icon-discord"></i>: <a class="pl-2" target="_blank" href={'https://discord.gg/NqGR3M'}>discord</a></li>
                <li class="flex items-center"><i class="iconfont icon-github"></i>: <a class="pl-2" target="_blank" href={'https://github.com/Crypto-ETF-Protocol'}>github</a></li>
                <li class="flex items-center"><i class="iconfont icon-Paper"></i>: <a class="pl-2" target="_blank" href={'https://github.com/Crypto-ETF-Protocol/Docs'}>CEP_whitepaper</a></li>
                <li class="flex items-center"><i class="iconfont icon-youtube"></i>: <a class="pl-2" target="_blank" href={'https://studio.youtube.com/channel/UCMhT-VEYL9yXX5RwN4N7DAg/videos/upload?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D'}>youtube</a></li>
                <li  class="flex items-center"> 
                  <img src={aragonImg} class="aragon" alt={$_('brands.aragon')} />:
                  <a class="pl-2" href={links.dao} target="_blank" rel="noopener noreferrer">aragon</a>
              </li>
              </ul>
          </strong>
        </div>
    </div>
    <div class="p-6 flex justify-center items-center w-full flex-wrap md:w-1/3 p-16"><img class="w-100pc h-full md:h-70pc md:w-100pc"src={'images/vestingperiod.png'} alt="PieDAO Hero" /></div>
  </div>
</div>
<style>
  .aragon {
    height: 30px;
  }
</style>