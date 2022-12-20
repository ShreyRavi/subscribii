(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{kRty:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return p})),n.d(t,"default",(function(){return j}));var a=n("6CzD"),r=n("Fcif"),o=n("+I+c"),b=n("mXGw"),c=n("/FXl"),i=n("TjRS"),s=n("ZFoC"),m=n("3aeE"),d=n("hw/H"),l=n("+cxR"),p=(n("aD51"),{});void 0!==p&&p&&p===Object(p)&&Object.isExtensible(p)&&!p.hasOwnProperty("__filemeta")&&Object.defineProperty(p,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/components/Controls.mdx"}});var u={_frontmatter:p},O=i.a;function j(e){var t,n=e.components,j=Object(o.a)(e,["components"]);return Object(c.b)(O,Object(r.a)({},u,j,{components:n,mdxType:"MDXLayout"}),Object(c.b)("h1",{id:"controls"},"Controls"),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"A sorting and search bar for use to parse a list")),Object(c.b)(s.d,{of:m.a,mdxType:"Props"}),Object(c.b)("h2",{id:"component-description"},"Component Description"),Object(c.b)("p",null,Object(c.b)("inlineCode",{parentName:"p"},"Controls")," is a React component that allows parsing of a list via a text search and a sort selector."),Object(c.b)("h2",{id:"import"},"Import"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{}),"import Controls from './Controls';\n")),Object(c.b)("h2",{id:"props"},"Props"),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(c.b)("th",Object(r.a)({parentName:"tr"},{align:"center"}),"Type"),Object(c.b)("th",Object(r.a)({parentName:"tr"},{align:"right"}),"Default"),Object(c.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Description"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(c.b)("inlineCode",{parentName:"td"},"darkMode")),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"`true"),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:"right"}),"false`"),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(c.b)("inlineCode",{parentName:"td"},"true"))),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(c.b)("inlineCode",{parentName:"td"},"sortWith")),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),Object(c.b)("inlineCode",{parentName:"td"},"String")),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:"right"}),Object(c.b)("inlineCode",{parentName:"td"},"'byDate'")),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Sorting method")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(c.b)("inlineCode",{parentName:"td"},"setSortWith")),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),Object(c.b)("inlineCode",{parentName:"td"},"Function")),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:"right"}),Object(c.b)("inlineCode",{parentName:"td"},"useState")," Function"),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Sorting method edit")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(c.b)("inlineCode",{parentName:"td"},"searchTerm")),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),Object(c.b)("inlineCode",{parentName:"td"},"String")),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:"right"}),Object(c.b)("inlineCode",{parentName:"td"},"''")),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Search term str")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(c.b)("inlineCode",{parentName:"td"},"setSearchTerm")),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),Object(c.b)("inlineCode",{parentName:"td"},"Function")),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:"right"}),Object(c.b)("inlineCode",{parentName:"td"},"useState")," Function"),Object(c.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Search term edit")))),Object(c.b)("h2",{id:"usage"},"Usage"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{}),"<Controls \n  darkMode={Boolean}\n  sortWith={String}\n  setSortWith={Function}\n  searchTerm={String}\n  setSearchTerm={Function}\n/>\n")),Object(c.b)("h2",{id:"demo"},"Demo"),Object(c.b)(s.c,{__position:1,__code:"/*See demo above*/}\n{/*Code example below is working React for a use case of Controls*/}\n{() => {\n  const [data, setData] = React.useState([\n    {\n      key: 'one',\n      name: 'Netflicks',\n      amount: '14.99',\n      timePeriod: 'month',\n      date: {\n        day: 23,\n        month: 2,\n        year: 2020,\n      },\n      notes: 'these are some notes',\n    },\n    {\n      key: 'two',\n      name: 'Wholoo',\n      amount: '24.99',\n      timePeriod: 'week',\n      date: {\n        day: 12,\n        month: 5,\n        year: 2019,\n      },\n      notes: 'these are some notes also about wholoo',\n    },\n    {\n      key: 'three',\n      name: 'Rent',\n      amount: '750.00',\n      timePeriod: 'month',\n      date: {\n        day: 1,\n        month: 7,\n        year: 2018,\n      },\n      notes: 'these are some notes also about rent',\n    },\n    {\n      key: 'three',\n      name: 'Rent',\n      amount: '750.00',\n      timePeriod: 'month',\n      date: {\n        day: 1,\n        month: 7,\n        year: 2018,\n      },\n      notes: 'these are some notes also about rent',\n    },\n  ])\n  const [user, setUser] = React.useState(null)\n  const [darkMode, setDarkMode] = React.useState(true)\n  const [sortWith, setSortWith] = React.useState('byDate')\n  const [searchTerm, setSearchTerm] = React.useState('')\n  const [controlTimePeriod, setControlTimePeriod] = React.useState('default')\n  const getFilteredData = () => {\n    const tempData = [...data].sort(getCompareFunction(sortWith))\n    if (searchTerm) {\n      return tempData.filter(\n        datum =>\n          datum.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||\n          datum.notes.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,\n      )\n    }\n    return tempData\n  }\n  return (\n    <>\n      <Controls\n        darkMode={darkMode}\n        sortWith={sortWith}\n        setSortWith={setSortWith}\n        searchTerm={searchTerm}\n        setSearchTerm={setSearchTerm}\n      />\n      <SubscriptionList\n        user={user}\n        searchTerm={searchTerm}\n        data={getFilteredData()}\n        editSubscription={() => {}}\n        deleteSubscription={() => {}}\n        controlTimePeriod={controlTimePeriod}\n      />\n    </>\n  )\n}",__scope:(t={props:j,DefaultLayout:i.a,Playground:s.c,Props:s.d,Controls:m.a,SubscriptionList:d.a,getCompareFunction:l.b,getAdjustedAmount:l.a},t.DefaultLayout=i.a,t._frontmatter=p,t),mdxType:"Playground"},(function(){var e,t=b.useState([{key:"one",name:"Netflicks",amount:"14.99",timePeriod:"month",date:{day:23,month:2,year:2020},notes:"these are some notes"},{key:"two",name:"Wholoo",amount:"24.99",timePeriod:"week",date:{day:12,month:5,year:2019},notes:"these are some notes also about wholoo"},{key:"three",name:"Rent",amount:"750.00",timePeriod:"month",date:{day:1,month:7,year:2018},notes:"these are some notes also about rent"},{key:"three",name:"Rent",amount:"750.00",timePeriod:"month",date:{day:1,month:7,year:2018},notes:"these are some notes also about rent"}]),n=t[0],r=(t[1],b.useState(null)),o=r[0],i=(r[1],b.useState(!0)),s=i[0],p=(i[1],b.useState("byDate")),u=p[0],O=p[1],j=b.useState(""),h=j[0],N=j[1],g=b.useState("default"),y=g[0];g[1];return Object(c.b)(b.Fragment,null,Object(c.b)(m.a,{darkMode:s,sortWith:u,setSortWith:O,searchTerm:h,setSearchTerm:N,mdxType:"Controls"}),Object(c.b)(d.a,{user:o,searchTerm:h,data:(e=Object(a.a)(n).sort(Object(l.b)(u)),h?e.filter((function(e){return e.name.toLowerCase().indexOf(h.toLowerCase())>-1||e.notes.toLowerCase().indexOf(h.toLowerCase())>-1})):e),editSubscription:function(){},deleteSubscription:function(){},controlTimePeriod:y,mdxType:"SubscriptionList"}))})))}void 0!==j&&j&&j===Object(j)&&Object.isExtensible(j)&&!j.hasOwnProperty("__filemeta")&&Object.defineProperty(j,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/components/Controls.mdx"}}),j.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-components-controls-mdx-9827cff85cd09bed83af.js.map