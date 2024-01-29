const addUserbutton = document.getElementById('addUser');
const btnText = addUserbutton.innerText;
const username = document.getElementById('username');
let records = document.getElementById('records')
let userArray = [];
let edit_id = null;

//  for getting the items from localstorage ... key must be same which given in setItem function --
let objStr = localStorage.getItem('users');

if(objStr != null){

//  for again changing string to object
userArray = JSON.parse(objStr);
}
// console.log(userArray);

DisplayInfo();
addUserbutton.onclick=()=>{
    const name = username.value;
    if(name == ""){
        alert("Please Enter data");
        retuern;
    }

    // alert(name)  -------- values of input
    
    userArray.push({'name' : name});
    // console.log(userArray); // array for storing names
    username.value = ""
    SaveInfo(userArray);

    DisplayInfo();

    // console.log(userArray);
}

function SaveInfo(userArray){
    // converting object to string using stringify function
    let str = JSON.stringify(userArray)
    //  for storing values in localstorage... key and value must be string 
    localStorage.setItem("users",str) 
}


//  for showing records on screen 
function DisplayInfo(){
    let statement = "";
    userArray.forEach((user ,i)=> {
        statement += `<tr>
        <th scope="row">${i+1}</th>
        <td>${user.name} </td>
        <td>
            <i class="btn text-white fa fa-edit btn-info mx-3" onclick = 'EditInfo(${i})'></i>
            <i class="btn btn-danger text-white fa fa-trash-o" onclick = 'DeleteInfo(${i})'></i>
        </td>
    </tr>`
    });
    records.innerHTML = statement;
    addUserbutton.innerText = btnText;
}

// For Editing a record
function EditInfo(id){
    edit_id = id;
    username.value = userArray[id].name;
    DeleteInfo(id);
    addUserbutton.innerText = 'Save changes';
}

// for deleting a record  
function DeleteInfo(id){
    userArray.splice(id, 1);
    SaveInfo(userArray);
    DisplayInfo();
}