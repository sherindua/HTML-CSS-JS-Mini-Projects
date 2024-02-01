let bagItems;

onLoad();

function onLoad(){
let bagItemsStr=localStorage.getItem('bagItemsData');
bagItems=bagItemsStr?JSON.parse(bagItemsStr):[];
displayItemsOnHomePage();
displayBagIcon();

}

function addToBag(itemId){
  bagItems.push(itemId);
  localStorage.setItem('bagItemsData',JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon(){
  let bagIconCountElement=document.querySelector('.bag-item-count');
  if(bagItems.length==0) {
    bagIconCountElement.style.visibility='hidden';
  }
  else{
    bagIconCountElement.style.visibility='visible';
  bagIconCountElement.innerText=bagItems.length;}
}

function displayItemsOnHomePage(){
  let itemsContainerElement=document.querySelector('.items-container');
  if(!itemsContainerElement){  //for  bag.html itemsContainerElement will be null as it is not there--> throws error and displayBagIcon() function doesn't get called at line 8
    return;
  }
  items.forEach(item=>{
  itemsContainerElement.innerHTML+=`
  <div class="item-container">
    <img class="item-image" src="${item.image}" alt="item image">
    <div class="rating">
      ${item.rating.stars} ⭐ | ${item.rating.count}
    </div>
    <div class="company-name">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price">
      <span class="current-price">Rs. ${item.current_price}</span>
      <span class="original-price">Rs. ${item.original_price}</span>
      <span class="discount">(${item.discount_percentage}% OFF)</span>
    </div>
    <button class="btn-add-bag" onclick="addToBag(${item.id});"><span class="material-symbols-outlined btn-bag-icon">
      shopping_bag
      </span>Add To Bag</button>
  </div>`;
  });
}

