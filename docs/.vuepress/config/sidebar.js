import fs from "fs";
import { join, parse } from "path";

// 侧边栏
// module.exports = {
//   jsSideBar: (pathParams) => {
//     const js = join(__dirname, "../../", pathParams);
//     const files = fs.readdirSync(js);

//     return files
//       .filter((file) => {
//         return parse(file).name !== "index";
//       })
//       .map((file) => {
//         const fileName = parse(file).name;
//         let formatFile = {
//           title: parse(file).name,
//           path: join(pathParams, fileName),
//         };
//         return formatFile;
//       });
//   },
// };

export function dynamicSideBar(pathParams) {
  const js = join(__dirname, "../../", pathParams);
  const files = fs.readdirSync(js);

  return (
    files
      // 排除点index.md
      .filter((file) => {
        console.log(file, "file");
        return parse(file).name !== "index" && file.endsWith(".md");
      })
      // 生成对应的 title和path
      .map((file) => {
        const fileName = parse(file).name;
        let formatFile = {
          title: parse(file).name,
          path: join(pathParams, fileName),
        };
        return formatFile;
      })
  );
}