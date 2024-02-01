let bagItemObjects;
onLoad();

function onLoad(){

loadBagItemObjects();
displayBag();
updateBill();
}

function loadBagItemObjects(){
  bagItemObjects=bagItems.map((itemId)=>{
    for(let i=0;i<items.length;i++){
      if(items[i].id==itemId)
      return items[i];
    }
  });
}



function displayBag(){
  let bagItemsContainerElement=document.querySelector('.bag-items-container');
  
  if(!bagItemObjects){
    return;  //display no items in bag
  }
  let tempHTML='';
  
  bagItemObjects.forEach(value => {
  tempHTML+=htmlGenerator(value);
});
bagItemsContainerElement.innerHTML=tempHTML;
}

  
function htmlGenerator(element){
return `
<div class="bag-item-container">
<div class="remove-item-icon" onclick="removeItem(${element.id});">X</div>
<img class="item-image "src="${element.image}" alt="item-image">   
<div class="item-info">
  <div class="company-name">${element.company}</div>
  <div class="item-name">${element.item_name}</div>
  <div class="item-price">
    <span class="current-price">Rs.${element.current_price}</span>
    <span class="original-price">Rs.${element.original_price}</span>
    <span class="discount-percentage">(${element.discount_percentage}% OFF)</span>
  </div>
  <div class="return-period"><strong>${element.return_period} days</strong> return available</div>
  <div class="delivery-date">Delivery by <span class="date">${element.delivery_date}</span></div>
</div>
</div>`;

}




function updateBill(){
  let billMRPElement=document.querySelector('.bill-mrp');
  let billDiscountElement=document.querySelector('.bill-discount');
  let totalAmountElement=document.querySelector('.bill-total');
  let priceTextElement=document.querySelector('.bill-price-details-text');
  priceTextElement.innerText=`Price Details(${bagItemObjects.length} items)`;

  let totalMRP=0;
  let discount=0;
  bagItemObjects.forEach((value)=>{
    totalMRP+=value.original_price;
  }); 
  billMRPElement.innerText=totalMRP;

  bagItemObjects.forEach((value)=>{
    discount+=(value.original_price-value.current_price);
  });
  billDiscountElement.innerText=discount;

  totalAmountElement.innerText=`Rs.${totalMRP-discount}`;
}

function removeItem(itemIDToRemove){

bagItems=bagItems.filter((itemID)=>{                          //update bagItems array (containing id of the items)
    if(itemIDToRemove!=itemID){
      return true;
    }
    // return false;
});

localStorage.setItem('bagItemsData',JSON.stringify(bagItems));    //update local storage

loadBagItemObjects();



displayBag();
updateBill();
displayBagIcon();

}