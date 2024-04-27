---
title: 基于React搭建threejs[最流行的3D库]环境
date: 2024-04-27 11:00:17
permalink: /pages/56adf2/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---

> 基于Create React App 环境体验three.js库。

threejs 是一个 3D JavaScript库，用于在网页上呈现3D内容。它是一个开源项目，旨在创建一个易于使用、轻量级、跨浏览器、通用的3D库。

当前版本包括WebGL（Web图形库）渲染器和JavaScript API，可无需插件用在任何兼容渲染交互式2D和3D图形的Web浏览器中。现代浏览器广泛支持WebGL。

WebGL是一个绘制点、线和三角形的底册API。要使用WebGL做任何有用的事情，它需要相当多的代码，这时产生了threejs。它处理高级功能，如场景、灯光、阴影、材质、纹理、3D数学等。

threejs还支持其他**渲染器**，如WebGPU、SVG和CSS3D。[官方示例](https://threejs.org/examples/)显示了高级用法。

作为一篇入门threejs的文章，我们快速了解它是什么以及如何使用它。

## 官方立方体旋转动画

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b9f52a5738f4a5c9ddfc12ffd7b2dfa~tplv-k3u1fbpfcp-zoom-1.image)

上面的图像由官方动画立方体代码渲染，该代码列在threejs的README文件中。下面是代码：

```
import * as THREE from 'three';

// init
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.z = 2;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

// animation
function animation(time) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}
```

接下来分析它是如何工作的：

在上面代码第一行， THREE 被导入；

```
import * as THREE from 'three';
```

在代码第4行， `PerspectiveCamera` 【透视摄像机】被创建

```
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
```

`PerspectiveCamera`的构造函数需要4个参数，具体如下：

```
export class PerspectiveCamera extends Camera {
  /**
   * @param [fov=50] Camera frustum vertical field of view. Default value is 50.
   * @param [aspect=1] Camera frustum aspect ratio. Default value is 1.
   * @param [near=0.1] Camera frustum near plane. Default value is 0.1.
   * @param [far=2000] Camera frustum far plane. Default value is 2000.
   */
  constructor(fov?: number, aspect?: number, near?: number, far?: number);
}
```

在本例中，fov（视角）在垂直维度上设置为70度，纵横比设置为DOM窗口的纵横比（window.innerWidth/window.inerHeight）。

near和far表示将要渲染的摄影机前面的空间。

任何在 near 之前或 far 之后的东西都会被摄像机剪掉。相机前面的范围设置为[0.01，10]。平截头体是一种3D形状，它像一个顶端被切掉的金字塔。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42151435c091452db89e628b12210467~tplv-k3u1fbpfcp-zoom-1.image)

在官方代码第5行， carmera.position 是 三维向量。

```
camera.position.z = 2;
```

相机位于[0，0，2]。+Y 和 -Y 轴位于绿色正方形的中间。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17abb924b77f49f5bdc2a472a46f2a3b~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/012a910aee0b4bbea7eff78ed9cf16bf~tplv-k3u1fbpfcp-zoom-1.image)

表示摄像机的可视范围。

以下是摄像机的类型：阵列相机、相机、立方体相机、正交相机、透视相机和立体相机。

在官方代码行7中，实例化了一个场景

```
const scene = new THREE.Scene();
```

场景 scene 是存放对象、灯光和相机的地方。以下都是可用的场景类型：Fog, FogExp2, and Scene.

在第9行代码中，一个 BoxGeometry 被实例化。

```
const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
```

几何体 Geometry 定义对象的形状。BoxGeometry定义长方体尺寸-宽度、高度和深度。在该示例中，宽度、高度和深度设置为0.2。

```
export class BoxGeometry extends BufferGeometry {
  /**
   * @param [width=1] — Width of the sides on the X axis.
   * @param [height=1] — Height of the sides on the Y axis.
   * @param [depth=1] — Depth of the sides on the Z axis.
   * @param [widthSegments=1] — Number of segmented faces along the width of the sides.
   * @param [heightSegments=1] — Number of segmented faces along the height of the sides.
   * @param [depthSegments=1] — Number of segmented faces along the depth of the sides.
   */
  constructor(
    width?: number,
    height?: number,
    depth?: number,
    widthSegments?: number,
    heightSegments?: number,
    depthSegments?: number,
  );
}
```

立方体的构造函数还可以定义沿每条边的分段面。默认情况下，每条边都有一个分段面。每边的细节越多，需要的分割面就越多。以下是4 x 5 x 10的分段面示意图：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d290f0cf40b446f8b046cc1f5a513e4~tplv-k3u1fbpfcp-zoom-1.image)

这些是可用的几何类型：BoxGeometry、CapsuleGeometry，CircleGeomety、ConeGeometry和CylinderGeometry，和 WireframeGeometry。

在代码第10行，创建一个 MeshNormalMaterial 对象

```
const material = new THREE.MeshNormalMaterial();
```

材质【MaterialParameters】对象的参数-有光泽、平坦、颜色、纹理等-并采用以下参数：

```
export interface MaterialParameters {
  alphaTest?: number | undefined;
  alphaToCoverage?: boolean | undefined;
  blendDst?: BlendingDstFactor | undefined;
  blendDstAlpha?: number | undefined;
  blendEquation?: BlendingEquation | undefined;
  blendEquationAlpha?: number | undefined;
  blending?: Blending | undefined;
  blendSrc?: BlendingSrcFactor | BlendingDstFactor | undefined;
  blendSrcAlpha?: number | undefined;
  clipIntersection?: boolean | undefined;
  clippingPlanes?: Plane[] | undefined;
  clipShadows?: boolean | undefined;
  colorWrite?: boolean | undefined;
  defines?: any;
  depthFunc?: DepthModes | undefined;
  depthTest?: boolean | undefined;
  depthWrite?: boolean | undefined;
  name?: string | undefined;
  opacity?: number | undefined;
  polygonOffset?: boolean | undefined;
  polygonOffsetFactor?: number | undefined;
  polygonOffsetUnits?: number | undefined;
  precision?: 'highp' | 'mediump' | 'lowp' | null | undefined;
  premultipliedAlpha?: boolean | undefined;
  dithering?: boolean | undefined;
  side?: Side | undefined;
  shadowSide?: Side | undefined;
  toneMapped?: boolean | undefined;
  transparent?: boolean | undefined;
  vertexColors?: boolean | undefined;
  visible?: boolean | undefined;
  format?: PixelFormat | undefined;
  stencilWrite?: boolean | undefined;
  stencilFunc?: StencilFunc | undefined;
  stencilRef?: number | undefined;
  stencilWriteMask?: number | undefined;
  stencilFuncMask?: number | undefined;
  stencilFail?: StencilOp | undefined;
  stencilZFail?: StencilOp | undefined;
  stencilZPass?: StencilOp | undefined;
  userData?: any;
}
```

网格材质：MeshNormalMaterialParameters 有如下参数

```
export interface MeshNormalMaterialParameters extends MaterialParameters {
  bumpMap?: Texture | null | undefined;
  bumpScale?: number | undefined;
  normalMap?: Texture | null | undefined;
  normalMapType?: NormalMapTypes | undefined;
  normalScale?: Vector2 | undefined;
  displacementMap?: Texture | null | undefined;
  displacementScale?: number | undefined;
  displacementBias?: number | undefined;
  wireframe?: boolean | undefined;
  wireframeLinewidth?: number | undefined;
  flatShading?: boolean | undefined;
}
```

以下是可以使用的材质类型：ShadowMaterial, SpriteMaterial, RawShaderMaterial, ShaderMaterial, PointsMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshPhongMaterial, MeshToonMaterial, MeshNormalMaterial, MeshLambertMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshBasicMaterial, MeshMatcapMaterial, LineDashedMaterial, LineBasicMaterial, and Material.

在代码第12行，创建了几何体形状和 网格材质，然后添加到 场景中：

```
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

网格是构成三维对象图形的骨架，它由几何体（材质）、材质（曲面）和场景 组成。

在官方代码行15–18中，WebGL呈现被实例化。它被设置为DOM窗口大小，配置了一个动画循环，其domElement被附加到DOM主体。

```
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);
```

在官方代码行21–26中，动画 animation 函数被创建。  


```
function animation(time) {  
  mesh.rotation.x = time / 2000;   
  mesh.rotation.y = time / 1000;   
  renderer.render(scene, camera);
}
```

参数 time 是自渲染器以来的时间，调用setAnimationLoop（动画）。时间单位为毫秒。由于在每个轴上旋转一次需要2π，因此上述动画函数绕x轴旋转约12.56秒，绕y轴旋转约6.28秒。

setAnimationLoop（animation）是启动动画的请求。如果动画为空，它将停止任何正在进行的动画。**setAnimationLoop是requestAnimationFrame的替换**。

renderer.render(scene, camera) 渲染并更新数据；

## 使用react 脚手架搭建threejs环境

我们使用[Create React App](https://create-react-app.dev/)来了解三种情况。使用以下命令创建React项目：

```
$ npx create-react-app react-three
$ cd react-three
```

安装 three.js 依赖。

```
npm i three
// 或者
yarn add three
```

之后可以在package.json中看到

```
"dependencies": {
  "three": "^0.145.0"
}
```

这样就把 three 添加到项目中。

使用下面代码，替换 src/App.js 文件

```
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function App() {
  const divRef = useRef();
  
  useEffect(() => {
    // init
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    divRef.current.appendChild(renderer.domElement);

    // animation
    function animation(time) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }
  }, []);
  
  return <div ref={divRef} />;
}

export default App;
```

以上代码几乎和官方代码相同，除了以下几点：

-   初始化代码封装在useEffect（第7–32行）中，并初始化一次（第32行的useEfect依赖列表设置为空数组[]）。
-   渲染器有所不同，原来 renderer.domElement 是添加到 document.body 中，现在它被添加到divRef.current中。

执行命令 `npm start`可以看到立方体旋转动画。

以上代码存在些可改进的方法：

-   不应该依赖DOM窗口的大小，因为我们可以实现 three.js 在一个组件内。
-   该应用不能随着浏览器缩放而缩放。
-   与大多数JavaScript库不同，three.js不会自动清理资源。它依靠浏览器在用户离开页面时进行清理。最佳实践是在对象不再使用时及时释放内存。

改良后的 src/app.js 文件

```
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function App() {
  const divRef = useRef();

  useEffect(() => {
    // init
    let width = divRef.current.clientWidth;
    let height = divRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setAnimationLoop(animation);

    const divCurrent = divRef.current;
    divCurrent.appendChild(renderer.domElement);

    window.addEventListener('resize', handleResize);

    // handle window resize
    function handleResize() {
      width = divRef.current.clientWidth;
      height = divRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    }

    // animation
    function animation(time) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener('resize', handleResize);
      divCurrent.removeChild(renderer.domElement);
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={divRef} style={{ height: '100vh' }} />;
}

export default App;
```

在第59行，div元素的高度设置为视口高度的100%。

在第9-10行，我们将div元素的宽度和高度保存为变量，以便在第11行和第23行重用。

在第26行，divRef。`divRef.current`保存为divCurrent。这允许在第27行添加到divCurrent的子元素在第52行被删除。

在第29行，事件监听器使用回调函数handleResize侦听resize事件。

在第32–39行，handleResize函数检索新的宽度和高度，并使用它们更新渲染和相机。在第38行，渲染器。渲染（场景、摄影机）重新渲染更新的数据。

在第49–56行，返回cleanup函数以停止动画、删除窗口侦听器并释放三个资源。

## 使用@react-three/fiber包创建应用

react-tree-fiber是一个用于threejs的react渲染器。它允许我们用JSX写threejs更具声明性。threejs的所有工作都将在react-tree-fiber中完成。

把jsx元素直接转换为threejs对象，没有其余额外的消耗，例如将 ＜mesh/＞转换为新的THREE.mesh（）

安装包 @react-three/fiber

```
npm i @react-three/fiber
```

添加到package.json中

```
"dependencies": {
  "@react-three/fiber": "^8.0.19",
  "three": "^0.145.0"
}
```

使用react-three/fiber后，src/App.js更简洁，看起来更像React。

```
mport { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Box() {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta / 2;
      meshRef.current.rotation.y += delta;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshNormalMaterial />
    </mesh>
  );
}

function App() {
  return (
    <Canvas
      camera={{ fov: 70, near: 0.01, far: 100, position: [0, 0, 2] }}
      style={{ height: '100vh', backgroundColor: 'black' }}
    >
      <Box />
    </Canvas>
  );
}

export default App;
```

在第4–18行，定义了Box组件。它为网格元素定义meshRef，该元素由钩子useFrame在第6–11行使用。

```
function useFrame(
  callback: (state: RootState, delta: number, frame?: THREE.XRFrame) => void, 
  renderPriority?: number
): null;
```

对每帧调用useFrame。参数state包括所有三个状态信息，包括gl（WebGL）、相机、时钟、场景等。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e588d6ba23344a1890c719c179e25700~tplv-k3u1fbpfcp-zoom-1.image)

参数delta是以秒为单位的时钟delta。它用于在第8–9行设置动画。

renderPriority是自动切换渲染开关的高级参数。

在 react-three-fiber 中，mesh 对象总是属于threejs的对象，成为一个全局组件。我们创建 mesh组件元素【在13-16行】，包括 boxGeometry 和 meshNormalMaterial。

这盒子元素被放置在<Canvas>标签中。

Canvas是three.js的基础。它渲染three组件。Canvas的道具包括gl（WebGL）、相机、光线投射器等。

```
export declare type RenderProps<TCanvas extends Element> = {
  gl?: GLProps;
  size?: Size;
  shadows?: boolean | Partial<THREE.WebGLShadowMap>;
  legacy?: boolean;
  linear?: boolean;
  flat?: boolean;
  orthographic?: boolean;
  frameloop?: 'always' | 'demand' | 'never';
  performance?: Partial<Omit<Performance, 'regress'>>;
  dpr?: Dpr;
  raycaster?: Partial<THREE.Raycaster>;
  camera?: (Camera | Partial<ReactThreeFiber.Object3DNode<THREE.Camera, 
    typeof THREE.Camera> & ReactThreeFiber.Object3DNode<THREE.PerspectiveCamera, 
    typeof THREE.PerspectiveCamera> & ReactThreeFiber.Object3DNode<THREE.OrthographicCamera, 
    typeof THREE.OrthographicCamera>>) & {
      manual?: boolean;
    };
  events?: (store: UseBoundStore<RootState>) => EventManager<HTMLElement>;
  onCreated?: (state: RootState) => void;
  onPointerMissed?: (event: MouseEvent) => void;
};
```

在第23行，摄像机的道具被定义为{fov:70，near:0.01，far:100，position:[0,0,2]}。

在第24行，样式定义为{height:“100vh”，backgroundColor:“black”}。对于宽度，画布会自动拉伸到100%。

这个简洁的代码和其他代码一样有效。

你是否注意到，我们并没有调用 object.dispose() ！

React知道对象的生命周期，React-tree-fiber将尝试通过调用对象来释放资源。dispose()，如果存在，则对所有未装入的对象执行。通过将 dispose＝{ null ｝放置在网格、材质等上，甚至放置在父容器（如组）上，可以关闭dispose尝试。
    
    本文是翻译文章：[原文链接](https://betterprogramming.pub/working-with-three-js-the-popular-3d-javascript-library-bd2e9b03c95a)