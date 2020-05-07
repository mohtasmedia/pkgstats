#!/usr/bin/env node
!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e=require("https"),[n]=process.argv.slice(2),o=([n,o])=>new Promise((s,t)=>{e.get({hostname:n,path:o,headers:{"User-Agent":""}},e=>{const n=[];e.on("data",e=>n.push(e)),e.on("end",()=>s(JSON.parse(Buffer.concat(n)))),e.on("error",e=>t(e))})}).catch(e=>console.error(e)),s=(e,n)=>{const o={reset:"[0m",underline:"[4m",red:"[31m",green:"[32m",yellow:"[33m",cyan:"[36m"};return""+(o[n]+e+o.reset)},t=e=>s(e,"yellow")+": ",i=e=>e>=1024?(e/1024).toFixed(1)+"KB":e+"B",a=e=>console.log("    "+(e||""));(async()=>{try{const r=await o(["api.npms.io","/v2/package/"+encodeURIComponent(n)]);if("NOT_FOUND"===r.code)return console.log(r.message);const{collected:{metadata:c,github:p}}=r,l=await o(["bundlephobia.com","/api/size?package="+n]),d=c.links.repository.split("/"),{total_count:u}=await o(["api.github.com",`/search/issues?q=repo:${d[3]}/${d[4]}+is:pr+state:open&per_page=1`]);a(),a(`${s(c.name,"green")} - v${c.version}`),a(c.description),a(),a(`${t("Size / Gzipped")+i(l.size)} / ${i(l.gzip)}`),a(`${t("Open issues / PRs")+p.issues.openCount} / ${u}`),a(""+(t("Last updated")+`${(e=new Date(c.date)).getDay()}/${e.getMonth()+1}/${e.getFullYear()}`)),a(),a(""+(t("NPM")+s(c.links.npm,"underline"))),a(""+(t("Homepage")+s(c.links.homepage,"underline"))),a(""+(t("Repo")+s(c.links.repository,"underline"))),a(),a(""+(t("Liscnce")+c.license)),a()}catch(e){console.error(e)}var e})()}));