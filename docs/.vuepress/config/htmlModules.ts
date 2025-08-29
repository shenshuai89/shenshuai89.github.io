import { VdoingThemeConfig } from 'vuepress-theme-vdoing/types'

/** 插入自定义html模块 (可用于插入广告模块等)
 * {
 *   homeSidebarB: htmlString, 首页侧边栏底部
 *
 *   sidebarT: htmlString, 所有左侧边栏顶部
 *   sidebarB: htmlString, 所有左侧边栏底部
 *
 *   pageT: htmlString, 页面顶部
 *   pageB: htmlString, 页面底部
 *   pageTshowMode: string, 页面顶部-显示方式：未配置默认所有页面；'article' => 仅文章页①； 'custom' => 仅自定义页①
 *   pageBshowMode: string, 页面底部-显示方式：未配置默认所有页面；'article' => 仅文章页①； 'custom' => 仅自定义页①
 *
 *   windowLB: htmlString, 全局窗口左下角②
 *   windowRB: htmlString, 全局窗口右下角②
 * }
 *
 * ①注：在.md文件front matter配置`article: false`的页面是自定义页，未配置的默认是文章页（首页除外）。
 * ②注：windowLB 和 windowRB：1.展示区块最大宽高200px*400px。2.请给自定义元素定一个不超过200px*400px的宽高。3.在屏幕宽度小于960px时无论如何都不会显示。
 */
const htmlModule: VdoingThemeConfig['htmlModules'] = {
  homeSidebarB:
    `<div style="padding: 0.95rem">
    <p style="
      color: var(--textColor);
      opacity: 0.9;
      font-size: 20px;
      font-weight: bold;
      margin: 0 0 8px 0;
    ">公众号</p>
    <img src="https://open.weixin.qq.com/qr/code?username=shenshuaidesign"  style="width:100%;" />
    关注公众号，回复[<b>前端资源</b>]，可获取 
    </p>
    </div>,
    <!-- 纵向自适应 -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7102294115613821"
     crossorigin="anonymous"></script>
    <ins class="adsbygoogle"
      style="display:block; padding: 0.95rem;"
      data-ad-client="ca-pub-7102294115613821"
      data-ad-slot="7118228990"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
      <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
      </script>`,
  sidebarT:
    `<!--  固定100% * 150px可显示，max-height:150px 未见显示-->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7102294115613821"
     crossorigin="anonymous"></script>
    <ins class="adsbygoogle"
          style="display:inline-block;width:100%;max-height:150px"
          data-ad-client="ca-pub-7102294115613821"
          data-ad-slot="3620184722"></ins>
      <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
      </script>`,
  // sidebarB:
  //   `<!-- 正方形 -->
  //     <ins class="adsbygoogle"
  //         style="display:block"
  //         data-ad-client="ca-pub-7102294115613821"
  //         data-ad-slot="3508773082"
  //         data-ad-format="auto"
  //         data-full-width-responsive="true"></ins>
  //     <script>
  //         (adsbygoogle = window.adsbygoogle || []).push({});
  //     </script>`,
  // pageT:
  //   `<!-- 固定100% * 90px可显示，max-height:90px未见显示-->
  //    <ins class="adsbygoogle"
  //         style="display:inline-block;width:100%;max-height:90px"
  //         data-ad-client="ca-pub-7102294115613821"
  //         data-ad-slot="6625304284"></ins>
  //     <script>
  //         (adsbygoogle = window.adsbygoogle || []).push({});
  //     </script>`,
  // pageTshowMode: 'article',
  pageB:
    `<!-- 横向自适应 -->
     <div 
      style="
        width: 100%;
        background-color: #333;
        color: #ddd;
        padding: 12px 15px;
        font-size: 14px;
        text-align: center;
        box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
        position: relative;
        bottom: 0;
        left: 0;
        right: 0;
      "
    >
        本站部分内容来源网络转载，如有侵权，请联系删除；<strong style="color: #ff6b6b;">本站不负任何版权责任</strong>！
    </div>`,
  // pageBshowMode: 'article',
  // windowLB: // 会遮挡部分侧边栏
  //   `<!-- 固定200*200px -->
  //     <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  //     <ins class="adsbygoogle"
  //         style="display:inline-block;width:200px;height:200px"
  //         data-ad-client="ca-pub-7102294115613821"
  //         data-ad-slot="6625304284"></ins>
  //     <script>
  //         (adsbygoogle = window.adsbygoogle || []).push({});
  //     </script>`,
  // windowRB:
  //   `<!-- 固定160*160px -->
  //     <ins class="adsbygoogle"
  //         style="display:inline-block;max-width:160px;max-height:160px"
  //         data-ad-client="ca-pub-7102294115613821"
  //         data-ad-slot="8377369658"></ins>
  //     <script>
  //         (adsbygoogle = window.adsbygoogle || []).push({});
  //     </script>
  //     `,
}


// const htmlModule = {
//   homeSidebarB: `<div style="width:100%;height:100px;color:#333;background: #eee;">首页右侧1</div>`,
//   sidebarT: `<div style="width:100%;height:100px;color:#333;background: #eee;">左侧导航上2</div>`,
//   sidebarB: `<div style="width:100%;height:100px;color:#333;background: #eee;">左侧导航下3</div>`,
//   pageT: `<div style="width:100%;height:100px;color:#333;background: #eee;">页面上4</div>`,
//   pageB: `<div style="width:100%;height:100px;color:#333;background: #eee;">页面下5</div>`,
//   windowLB: `<div style="width:100%;height:100px;color:#333;background: #eee;">所有页面固定左6</div>`,
//   windowRB: `<div style="width:100%;height:100px;color:#333;background: #eee;">所有页面固定右7</div>`,
// }


export default htmlModule