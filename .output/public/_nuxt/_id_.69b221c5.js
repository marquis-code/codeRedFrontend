import{_ as i}from"./EmptyState.vue.2686ac38.js";import{q as m,o as e,c as o,a as t,x as a,F as x,z as _,A as y,t as l}from"./entry.0551859d.js";import{u as h}from"./getDocumentByWorkflow.cb14a6cb.js";import"./documents.5a94c6c6.js";import"./axios.config.3b7d29d9.js";const f={class:"px-4 sm:px-6 lg:px-8"},g=t("div",{class:"sm:flex sm:items-center border-[0.6px] rounded-tr-md rounded-tl-md p-3"},[t("div",{class:"sm:flex-auto"},[t("h1",{class:"text-base font-semibold leading-6 text-gray-900"},"Workflow Documents"),t("p",{class:"mt-2 text-sm text-gray-700"},"A list of all completed workflow documents")])],-1),u={class:"flow-root"},w={key:0,class:"-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"},b={class:"inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"},k={class:"overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"},v={class:"min-w-full divide-y divide-gray-300"},N=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{scope:"col",class:"py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"}," No "),t("th",{scope:"col",class:"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}," Steps completed"),t("th",{scope:"col",class:"py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"}," Name "),t("th",{scope:"col",class:"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}," Description"),t("th",{scope:"col",class:"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"},"Steps"),t("th",{scope:"col",class:"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"},"Status "),t("th",{scope:"col",class:"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"},"CreatedAt ")])],-1),A={class:"divide-y divide-gray-200 bg-white"},B={class:"whitespace-nowrap cursor-pointer py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"},D={class:"whitespace-nowrap cursor-pointer py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"},S={class:"whitespace-nowrap cursor-pointer py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"},W={class:"whitespace-nowrap cursor-pointer px-3 py-4 text-sm text-gray-500"},C={class:"whitespace-nowrap cursor-pointer px-3 py-4 text-sm text-gray-500"},E={key:0},F={key:1,class:"text-sm text-gray-500 font-semibold"},I={class:"whitespace-nowrap cursor-pointer px-3 py-4 text-sm text-gray-500"},L={class:"whitespace-nowrap cursor-pointer px-3 py-4 text-sm text-gray-500"},q={key:1,class:"bg-white rounded-lg shadow-md p-4 animate-pulse"},z=t("div",{class:"w-full h-32 bg-gray-300 rounded mb-2"},null,-1),G=[z],O=m({__name:"[id]",setup(P){const{getDocumentByWWorkflowId:p,documentList:c,loading:r}=h();return p(),(V,$)=>{const d=i;return e(),o("main",null,[t("div",f,[g,t("div",u,[a(c).length&&!a(r)?(e(),o("div",w,[t("div",b,[t("div",k,[t("table",v,[N,t("tbody",A,[(e(!0),o(x,null,_(a(c),(s,n)=>(e(),o("tr",{key:n},[t("td",B,l(n+1||"N/A"),1),t("td",D,l(s.stepsCompleted||"N/A"),1),t("td",S,l(s.workflow.name||"N/A"),1),t("td",W,l(s.workflow.description||"N/A"),1),t("td",C,[s.workflow.steps.length?(e(),o("span",E,l(s.workflow.steps.length||"N/A"),1)):(e(),o("span",F,"No step has been added to this workflow "))]),t("td",I,l(s.workflow.status||"N/A"),1),t("td",L,l(s.workflow.createdAt||"N/A"),1)]))),128))])])])])])):a(r)&&!a(c).length?(e(),o("div",q,G)):(e(),y(d,{key:2,title:"No Documents available",desc:"Please add a document"}))])])])}}});export{O as default};
