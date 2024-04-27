import{_ as f}from"./nuxt-link.e3b02539.js";import{_ as E}from"./EmptyState.vue.2686ac38.js";import{r as _,u as M,q as R,H as $,G as V,o as e,c as o,a as t,b as y,w,x as a,D as b,F,z as T,A as G,d as m,t as l,E as H}from"./entry.0551859d.js";import{a as I,u as U,S as v}from"./login.9c5c027d.js";import{o as Y}from"./organization.74194ff8.js";import{u as q,a as J}from"./useConfirmationModal.319cb222.js";import"./auth.f70e99d1.js";import"./axios.config.3b7d29d9.js";const u=_([]);I("organizations",{organizationList:u});const P=()=>{const c=_(!1);return{fetchOrganizations:async()=>{c.value=!0;try{const r=await Y.fetchOrganization();u.value=r.data.organizations}catch(r){return M().$toast.error(r.message,{autoClose:5e3,dangerouslyHTMLString:!0}),r}finally{c.value=!1}},organizationList:u,loading:c}},W={class:"px-3 sm:px-6 md:px-8"},j={class:"sm:flex sm:items-center lg:border-[0.6px] lg:rounded-tr-md lg:rounded-tl-md p-3 w-full"},K=t("div",{class:"sm:flex-auto"},[t("h1",{class:"text-base font-semibold leading-6 text-gray-900"},"Organizations"),t("p",{class:"mt-2 text-sm text-gray-700"},"A list of all organizations")],-1),Q={class:"mt-4 sm:ml-16 sm:mt-0 sm:flex-none"},X={class:"flow-root"},Z={key:0,class:"-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"},tt={class:"inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"},et={class:"overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-br-lg rounded-bl-lg"},st={class:"min-w-full divide-y divide-gray-300"},ot={class:"bg-gray-50"},at=t("th",{scope:"col",class:"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"},"Avatar",-1),nt=t("th",{scope:"col",class:"py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"},"Name ",-1),it=t("th",{scope:"col",class:"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"},"Description",-1),rt=t("th",{scope:"col",class:"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"},"CreatedAt",-1),lt=t("th",{scope:"col",class:"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"},"Website",-1),ct={key:0,scope:"col",class:"relative py-3.5 pl-3 pr-4 sm:pr-6"},dt=t("span",{class:""},"Actions",-1),pt=[dt],mt={class:"divide-y divide-gray-200 bg-white"},ut={class:"whitespace-nowrap cursor-pointer px-3 py-4 text-sm text-gray-500"},_t={key:0,xmlns:"http://www.w3.org/2000/svg",width:"37",height:"37",viewBox:"0 0 24 24",fill:"#000"},gt=t("path",{d:"M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1.227 9.537c1.75 0 3.31.401 4.653 1.206.2.117.317.236.317.532 0 .288-.234.5-.498.5-.129 0-.217-.045-.338-.119-1.16-.7-2.605-1.07-4.14-1.07-.856 0-1.717.11-2.523.278-.13.028-.296.079-.394.079a.5.5 0 0 1-.507-.503c0-.336.194-.503.436-.55a13.357 13.357 0 0 1 2.994-.353zm-.11-2.613c2.094 0 4.12.522 5.712 1.475.267.153.366.347.366.632a.622.622 0 0 1-.624.627c-.173 0-.283-.07-.4-.14-1.302-.771-3.106-1.285-5.08-1.285-1.014 0-1.888.142-2.612.335-.156.043-.243.09-.389.09a.626.626 0 0 1-.625-.628c0-.34.165-.574.498-.668.9-.247 1.817-.438 3.154-.438zm.163-2.749c2.35 0 4.82.484 6.626 1.544.243.138.412.346.412.726 0 .437-.35.75-.754.75-.163 0-.26-.04-.413-.123-1.448-.868-3.695-1.347-5.868-1.347-1.085 0-2.186.11-3.196.385-.116.029-.263.087-.41.087a.75.75 0 0 1-.754-.764c0-.435.27-.68.56-.765 1.14-.336 2.413-.493 3.797-.493z"},null,-1),ht=[gt],xt=["src"],ft={class:"whitespace-nowrap cursor-pointer py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"},yt={class:"whitespace-nowrap cursor-pointer px-3 py-4 text-sm text-gray-500"},wt={class:"whitespace-nowrap cursor-pointer px-3 py-4 text-sm text-gray-500"},bt={class:"whitespace-nowrap cursor-pointer px-3 py-4 text-sm text-gray-500"},vt={key:0,class:"relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"},zt={class:"flex gap-x-3"},kt=["onClick"],Ct=t("span",{class:"sr-only"},null,-1),Ot={key:1,class:"bg-white rounded-lg shadow-md p-4 animate-pulse"},At=t("div",{class:"w-full h-32 bg-gray-300 rounded mb-2"},null,-1),Nt=[At],Ft=R({__name:"index",setup(c){const{userRole:d}=U(),{openModal:r}=q(),{handleDeleteOrganization:z,loading:k}=J(),{fetchOrganizations:C,organizationList:O,loading:g}=P();$(),C();const h=_(null),p=V(()=>{{const n=localStorage.getItem("user");h.value=JSON.parse(n)}return O.value.filter(n=>{var i;return n.id===((i=h.value)==null?void 0:i.orgId)})});function A(){r("Are you sure you want to delete this user?",()=>{})}const N=n=>{v.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(async i=>{i.isConfirmed?await z(n):v.fire("Cancelled","Action was cancelled","info")})};return(n,i)=>{const S=f,B=f,D=E;return e(),o("div",W,[t("button",{onClick:i[0]||(i[0]=s=>n.$router.back()),class:"text-white bg-black rounded-full text-sm mb-4 px-4 py-2"},"Go Back"),t("div",j,[K,t("div",Q,[y(S,{to:"/dashboard/organization/create",type:"button",onClick:A,class:"block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"},{default:w(()=>[m(" Add Organization")]),_:1})])]),t("div",X,[a(p).length&&!a(g)?(e(),o("div",Z,[t("div",tt,[t("div",et,[t("table",st,[t("thead",ot,[t("tr",null,[at,nt,it,rt,lt,a(d)!=="ROLE_USER"?(e(),o("th",ct,pt)):b("",!0)])]),t("tbody",mt,[(e(!0),o(F,null,T(a(p),(s,L)=>{var x;return e(),o("tr",{key:L},[t("td",ut,[(x=s.logo)!=null&&x.length?(e(),o("img",{key:1,src:s.logo,alt:"Organization Logo",class:"h-10 w-10 rounded-full"},null,8,xt)):(e(),o("svg",_t,ht))]),t("td",ft,l(s.name),1),t("td",yt,l(s.description||"N/A"),1),t("td",wt,l(s.createdAt||"N/A"),1),t("td",bt,l(s.website||"N/A"),1),a(d)!=="ROLE_USER"?(e(),o("td",vt,[t("div",zt,[t("a",{href:"",onClick:H(St=>N(s.id),["prevent"]),class:"text-white px-6 py-2 rounded-md bg-red-500 text-sm"},[m(l(a(k)?"Deleting...":"Delete"),1),Ct],8,kt),y(B,{to:`/dashboard/organization/${s.id}/members`,class:"text-white px-6 py-2 rounded-md bg-black text-sm"},{default:w(()=>[m("View Members")]),_:2},1032,["to"])])])):b("",!0)])}),128))])])])])])):a(g)&&!a(p).length?(e(),o("div",Ot,Nt)):(e(),G(D,{key:2,title:"No Organization available",desc:"Please add an organization"}))])])}}});export{Ft as default};
