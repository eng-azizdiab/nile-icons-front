let nav = document.getElementById('nav')
let mobileBar = document.getElementById('mobile-bar')
//check window size on start
if(window.innerWidth <= 890) {
    nav.style.display='none'
    mobileBar.style.display='flex'
}
else {
    nav.style.display='flex'
    mobileBar.style.display='none'
}
// toogle nav with menu on resize
window.addEventListener('resize',()=>{
    if(window.innerWidth <= 890) {
        nav.style.display='none'
        mobileBar.style.display='flex'
    }
    else {
        nav.style.display='flex'
        mobileBar.style.display='none'
    }
})
// to up 
let toUp = document.getElementById('toUp')
window.addEventListener('scroll',()=>{
    if(window.scrollY >= 180) {
        toUp.style.display = 'flex'
    }
    else{
        toUp.style.display = 'none'
    }
})
toUp.addEventListener('click',()=>{
    window.scrollTo({
        top : 0,
        behavior: `smooth`
    })
    
})
// toogle mobile menu
let  mobileMenu = document.getElementById('mobile-menu')

mobileBar.addEventListener(`click`,()=>{
    mobileMenu.classList.toggle('hidden')
})

// aside home page 
let asideHome = document.getElementById('asideHome')
//check window size on start
if(window.innerWidth <= 1300) {
    asideHome.style.display='flex'
    asideHome.style.display='none'
}
else {
    asideHome.style.display='none'
    asideHome.style.display='flex'
}
// toogle nav with menu on resize
window.addEventListener('resize',()=>{
    if(window.innerWidth <= 1300) {
        asideHome.style.display='flex'
        asideHome.style.display='none'
    }
    else {
        asideHome.style.display='none'
        asideHome.style.display='flex'
    }
})

// export Messages to excel
let exportExcel = document.getElementById('exportExcel')

function exportTableToExcel(tableId, filename = '') {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.table_to_sheet(document.getElementById(tableId));
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, filename);
}