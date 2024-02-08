const LoadData= async(Input='13',isShowAll)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${Input}`);
    const data = await res.json();
    const Phones=data.data;
    displayPhones(Phones,isShowAll);
    // console.log(Phones,);
}
const displayPhones = (phones,isShowAll) =>{
    const container=document.getElementById('mainContainer');
    container.textContent='';

    const showBtn = document.getElementById('conditionBtn');
    if(phones.length > 11 && !isShowAll){
        showBtn.classList.remove('hidden');
    }
    else{
        showBtn.classList.add('hidden');
    }
    if(!isShowAll){
         phones =phones.slice(0,10);
    }
    phones.forEach(phone => {
        const CreateDiv=document.createElement('div');
        CreateDiv.classList= `card bg-amber-700  shadow-xl`;
        CreateDiv.innerHTML=`
                    <figure class="px-10 pt-10">
                        <img src="${phone.image}" alt="Shoes"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Brand: ${phone.brand}</h2>
                        <p>Phone Name:${phone.phone_name}</p>
                        <p>Slug: ${phone.slug}</p>
                        <div class="card-actions">
                            <button onclick="showModal('${phone.slug}')" class="btn btn-primary">See Details</button>
                        </div>
                    </div>
        `;
        container.appendChild(CreateDiv);
    })
    removeSpinner(false);
}
const SrcNow = (isShowAll) =>{
    removeSpinner(true);
    const InputField =document.getElementById('inputField');
    const InputData= InputField.value;
    //  console.log(InputData);
    LoadData(InputData,isShowAll);
    //  InputField.value ='';
}
const showAll =()=>{
    SrcNow(true);
}
const removeSpinner =(isLoading) =>{
    const spinnerShow= document.getElementById('spinner');
    if(isLoading){
        spinnerShow.classList.remove('hidden');
    }
    else{
         spinnerShow.classList.add('hidden');
    }
}
const showModal = async (id)=>{
    // console.log("show",id);
    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data=await res.json();
    const phone=data.data;
    console.log(phone);
    
    showPhoneDetails(phone);
}
const showPhoneDetails= (phone) =>{
    const ModalShowValueFinal= document.getElementById('ModalShowValue');
    ModalShowValueFinal.textContent='';
    const div =document.createElement('div');
    div.innerHTML=`
     <figure class="px-10 pt-10">
                        <img src="${phone.image}" alt="Shoes"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Brand: ${phone.brand}</h2>
                        <p>Name: ${phone.name}</p>
                        <p>Main Features:<br>Chip Set: ${phone.mainFeatures.chipSet},<br> Display Size: ${phone.mainFeatures.displaySize},<br> Storage: ${phone.mainFeatures.storage},<br> Memory: ${phone.mainFeatures.memory}</p>
                        <p>Release Date: ${phone.releaseDate}</p>
                        <p>Slug: ${phone.slug}</p>
                    </div>
    `;
    ModalShowValueFinal.appendChild(div);
    show_modal.showModal();
}
LoadData();
