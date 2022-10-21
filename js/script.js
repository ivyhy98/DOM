
const menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];
//Select and cache the <main> element in a variable named mainEl.
    const mainEl = document.querySelector('main');
//Set the background color of mainEl to the value stored in the --main-bg CSS custom property.

    mainEl.style.backgroundColor = 'var(--main-bg)';
    //console.log(mainEl)
//Set the content of mainEl to <h1>SEI Rocks!</h1>
    mainEl.innerHTML = '<h1>SEI Rocks</h1>';
// Add a class of flex-ctr to mainEl.
    mainEl.classList.add("flex-ctr");
//Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.querySelector('#top-menu');
//console.log(topMenuEl)
//Set the height topMenuEl element to be 100%.
    topMenuEl.style.height = "100%";
//Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
    topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
//Add a class of flex-around to topMenuEl.
    topMenuEl.classList.add('flex-around');
    let i = 0;

//Create an a element
menuLinks.forEach((element) => {
    const aEl = document.createElement('a');
    aEl.setAttribute('href', element.href);
    aEl.innerHTML =`${element.text}`;
    aEl.setAttribute('data', i)
    topMenuEl.appendChild(aEl);
    i++;
});

// For of
// let i = 0;
// for (let arg of menuLinks){
//     let aEl = document.createElement('a');
//     aEl.setAttribute('href', arg.href);
//     aEl.innerHTML = arg.text;
//     console.log(i);
//     i++;
//     topMenuEl.append(aEl);
// }

//Select and cache the <nav id="sub-menu">element in a variable named subMenuEl.

let subMenuEl = document.querySelector('#sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');

subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

topMenuLinks = topMenuEl.querySelectorAll('a');

let showingSubMenu = false;

const buildSubMenu = (subLink) => {
    subMenuEl.style.top = '100%';
    subMenuEl.textContent = '';
    subLink.forEach((link)=>{
        const a = document.createElement('a');
        a.setAttribute('href', link.href);
        a.innerHTML =`${link.text}`;
        subMenuEl.appendChild(a);
    })
}

//Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener('click', (evt)=>{
    evt.preventDefault();
// 5.3 The second line of code function should immediately return if the element clicked was not an <a>element.
    if(!evt.target.matches('a')){
        return;
    }
    //if it has active class remove active class;
    if(evt.target.classList.contains('active')){
        evt.target.classList.remove('active');
        showingSubMenu = false;
        showingSubMenu.style.top = 0;
        return;
    }
    
    //remove all other active class links 
    topMenuLinks.forEach((element)=>{
        element.classList.remove('active');  
    });

    //add active class to clicked link
    evt.target.classList.add('active'); 

    // get data attribute that contains index of target. see line 44
    let data = evt.target.getAttribute('data');

    //if subLinks doesn't exist don't show subMenu
    if(!menuLinks[data].subLinks){
        showingSubMenu = false;
        subMenuEl.style.top = '0';
    }else{
        showingSubMenu = true;
    }

    //if we can showSubMenu invoke buildSubMenu(sublinks of evt.target) else don't show 
    if(showingSubMenu){
        buildSubMenu(menuLinks[data].subLinks);

    } else{
        //don't shop the subMenu and make the main element say evt.targrt.
        mainEl.innerHTML = `<h1>${evt.target.innerHTML}</h1>`;
    }

})

subMenuEl.addEventListener('click', (evt)=>{
    evt.preventDefault();
    if(!evt.target.matches('a')){
        return;
    }
    showingSubMenu = false;
    subMenuEl.style.top = '0';
    topMenuLinks.forEach((element)=>{
        element.classList.remove('active');
    });

    mainEl.innerHTML = `<h1>${evt.target.innerHTML}</h1>`;
})




