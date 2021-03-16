"use strict"

let inHtml = document.querySelector(".Take")
const form = document.querySelector("form")

const renderPosts = async () => {
    let url = "http://localhost:3000/cars?_sort=id&_order=desc";
    const response = await fetch(url);
    const deta = await response.json();

    let show = "";

    deta.forEach((data) => {
        show += `
        <div class="cards">
            <div class="cars-img">
                <img class="u" src="${data.ImgUrl}" /> 
            </div>


            <div class="About_cars_container" >
                <div class="car_model">
                    <p> <span>მოდელი - </span>  <span class="m">${data.Model}</span> </p>

                    <div class="Edit_delete" id="${data.id}">
                        <img src="photo/edit.png"  alt="edit icon" title="რედაქტირება" class="edit" id="edit_car" />
                        <img src="photo/delete.png" alt="delete icone"  title="წაშლა"   id="delete_car" /> 
                    </div>
                </div>
                

                <!--ავტომობილის აღწერა-->

                <div class="AboutCar" >
                    <p>ავტომობილის აღწერა</p>
                    <p class="AboutCar_text">${data.AboutCar}</p>
                </div>

                <!--ავტომობილის მახასიათებლები-->

                <div class="CarCharacters" >
                    <p>ავტომობილის მახასიათებლები</p>
                    <div class="uls_lists">
                        <ul>
                            <li >ABS ${(data.ABS == true) ? '<span><img src="photo/check.png" /></span>' : '<span><img src="photo/error.png"/></span>'} </li>
                            <li>ელექტრო შუშების ამწევი ${(data.GlassHoist == true) ? '<span><img src="photo/check.png" /></span>' : '<span><img src="photo/error.png"/></span>'} </li>
                            <li>ლუქი ${(data.Sunroof == true) ? '<span><img src="photo/check.png" /></span>' : '<span><img src="photo/error.png"/></span>'} </li>
                        </ul>
                        <ul>
                            <li>Bluetooth ${(data.Bluetooth == true) ? '<span><img src="photo/check.png" /></span>' : '<span><img src="photo/error.png"/></span>'} </li>
                            <li>სიგნალიზაცია ${(data.Alarm == true) ? '<span><img src="photo/check.png" /></span>' : '<span><img src="photo/error.png"/></span>'} </li>
                            <li>პარკინგკონტროლი ${(data.ParkingControl == true) ? '<span><img src="photo/check.png" /></span>' : '<span><img src="photo/error.png"/></span>'} </li>
                        </ul>
                        <ul>
                            <li>ნავიგაცია ${(data.NavigationSystem == true) ? '<span><img src="photo/check.png" /></span>' : '<span><img src="photo/error.png"/></span>'} </li>
                            <li>ბორტკომპიუტერი ${(data.BoardComputer == true) ? '<span><img src="photo/check.png" /></span>' : '<span><img src="photo/error.png"/></span>'} </li>
                            <li>მულტი საჭე ${(data.steeringwheel == true) ? '<span><img src="photo/check.png" /></span>' : '<span><img src="photo/error.png"/></span>'} </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>`
    })

    inHtml.innerHTML = show;    
} 

renderPosts()

//add 

const createPost = async (e) => {
    e.preventDefault();
    const add = {
        ImgUrl: form.img.value,
        Model: form.cars.value,
        AboutCar: form.AboutCar.value,
        ABS: form.ABS.checked,
        GlassHoist: form.GlassHoist.checked,
        Sunroof: form.Sunroof.checked,
        Bluetooth: form.Bluetooth.checked,
        Alarm: form.Alarm.checked,
        ParkingControl: form.ParkingControl.checked,
        NavigationSystem: form.NavigationSystem.checked,
        BoardComputer: form.BoardComputer.checked,
        steeringwheel: form.steeringwheel.checked
    }

    await fetch("http://localhost:3000/cars", {
        method: "POST",
        body: JSON.stringify(add),
        headers: {'Content-Type' : 'application/json'}
    })
} 


form.addEventListener("submit" , createPost)





// delete 

inHtml.addEventListener("click" , async (e) => {
    e.preventDefault()
    var delButtonPressed = e.target.id == "delete_car"
    let currentId_for_delete = e.target.parentElement.id;

    if(delButtonPressed == true){
        await fetch("http://localhost:3000/cars/" + currentId_for_delete,{
            method: "DELETE",
        })
    }
})




//edit

inHtml.addEventListener("click" , (e) => {
    let editButtonPressed = e.target.id == "edit_car"
    let currentId_for_edit = e.target.parentElement.id;

    if(editButtonPressed == true){
        let perent = e.target.parentElement.parentElement.parentElement.parentElement;

        let modelContent = perent.querySelector(".m").textContent;
        let textContent = perent.querySelector(".AboutCar_text").textContent;
        let imgContent = perent.querySelector(".u").src;
    

        let cars_field = document.querySelector("#cars")
        let textarea_field = document.querySelector("textarea");
        let imgURL_field = document.querySelector("#img");
        let submmitButton = document.querySelector(".submit");


        cars_field.value = modelContent
        textarea_field.value = textContent
        imgURL_field.value = imgContent 

        //editing
        submmitButton.addEventListener("click" , async (e) => {
            e.preventDefault()
            
             const edit = {
                ImgUrl: imgURL_field.value,
                Model: cars_field.value,
                AboutCar: textarea_field.value,
                ABS: form.ABS.checked,
                GlassHoist: form.GlassHoist.checked,
                Sunroof: form.Sunroof.checked,
                Bluetooth: form.Bluetooth.checked,
                Alarm: form.Alarm.checked,
                ParkingControl: form.ParkingControl.checked,
                NavigationSystem: form.NavigationSystem.checked,
                BoardComputer: form.BoardComputer.checked,
                steeringwheel: form.steeringwheel.checked
            }

            await fetch("http://localhost:3000/cars/" + currentId_for_edit,{
                method: "PATCH",
                body: JSON.stringify(edit),
                headers: {'Content-Type' : 'application/json'},
            })
        })
    }   

})
