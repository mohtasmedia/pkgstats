const e=require("https"),[s,...o]=process.argv.slice(2),a=!o.indexOf("-v"),t=!o.indexOf("-vv"),n=async([s,o])=>new Promise((a,t)=>{e.get({hostname:s,path:o,headers:{"User-Agent":""}},e=>{const s=[];e.on("data",e=>s.push(e)),e.on("end",()=>a(JSON.parse(Buffer.concat(s)))),e.on("error",e=>t(e))})}).catch(e=>e),i=e=>e>=1024?(e/1024).toFixed(1)+"KB":e+"B",p=(e,s)=>console.log(`[31m${e}[0m: ${s}`);(async()=>{const e=await n(["api.npms.io","/v2/package/"+encodeURIComponent(s)]);if("NOT_FOUND"===e.code)return console.log(e.message);const{collected:{metadata:o,github:c}}=e,r=await n(["bundlephobia.com","/api/size?package="+s]),g=o.links.repository.split("/"),{total_count:d}=await n(["api.github.com",`/search/issues?q=repo:${g[3]}/${g[4]}+is:pr+state:open&per_page=1`]);(a||t)&&(p("Name",o.name),p("Description",o.description),p("Version",o.version)),p("Last updated",(e=>`${e.getDay()}/${e.getMonth()+1}/${e.getFullYear()}`)(new Date(o.date))),p("Size / Gzipped",`${i(r.size)} / ${i(r.gzip)}`),(a||t)&&(p("Liscnce",o.license),p("Homepage",o.links.homepage),p("Repo",o.links.repository)),t&&(p("Open issues",c.issues.openCount),d&&p("Open PRs",d))})();
