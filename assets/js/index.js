const pNone = document.querySelectorAll(".form-p");
const divOne = document.querySelector("#form-box-1");
const divTwo = document.querySelector("#form-box-2");
const divThree = document.querySelector("#form-box-3");
const labelOne = document.querySelector("#labelOne");
const labelTwo = document.querySelector("#labelTwo");
const labelThree = document.querySelector("#labelThree");
const spanYear = document.querySelector("#span-years");
const spanMonth = document.querySelector("#span-month");
const spanDay = document.querySelector("#span-days");

function vacio(div, form, label) {
    if (form.value.trim() == "") {
        div.innerText = "This field is required";
        form.style.border = "1px solid var(--light-red)";
        form.style.outline = "none";
        label.style.color = "var(--light-red)";
        return true;
    } else {
        div.innerText = "";
        label.style.removeProperty("color");
        form.style.removeProperty("border");
        form.style.removeProperty("outline");
    }
    return false;
}
function tamano(div, form, opera, mensaje, label, num) {
    if (num == 1 || num == 2) {
        if (form.value.trim() < 1 || form.value.trim() > opera || isNaN(form.value.trim())) {
            div.innerText = mensaje;
            form.style.border = "1px solid var(--light-red)";
            form.style.outline = "none";
            label.style.color = "var(--light-red)";
            return true;
        }
    }
    if (form.value.trim() > 2023) {
        div.innerText = mensaje;
        form.style.border = "1px solid var(--light-red)";
        label.style.color = "var(--light-red)";
        return true;
    }
    div.innerText = "";
    label.style.removeProperty("color");
    form.style.removeProperty("border");
    form.style.removeProperty("outline");
    return false;
}
function fecha(form) {
    var aux = 0;
    // vacio
    if (!vacio(divOne, form.day, labelOne)) {
        if (tamano(divOne, form.day, 31, "Must be a valid day", labelOne, 1)) aux = 1;
    } else {
        aux = 1;
    }
    if (!vacio(divTwo, form.month, labelTwo)) {
        if (tamano(divTwo, form.month, 12, "Must be a valid month", labelTwo, 2)) aux = 1;
    }
    else {
        aux = 1;
    }
    if (!vacio(divThree, form.year, labelThree)) {
        if (tamano(divThree, form.year, 2023, "Must be in the past", labelThree, 3)) aux = 1;
    } else {
        aux = 1;
    }
    return aux;
}
function validarFecha(form) {
    var day = form.day.value.trim();
    var month = form.month.value.trim();
    var year = form.year.value.trim();
    if (month.length == 1) {
        month = `0${month}`;
    }
    if(day.length == 1){
        day = `0${day}`;
    }
    if (moment(`${day}/${month}/${year}`, 'DD/MM/YYYY', true).isValid()) {
        return true;
    } else {
        return false;
    }

}
function calcEdad(day,mes,ano){

    if (mes.length == 1) {
        mes = `0${mes}`;
    }
    day++;
    var fechaNacimiento = new Date(`${ano}-${mes}-${day}`);

    // Fecha actual
    var fechaActual = new Date();
   
    // Cálculo de la edad
    var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    if((fechaNacimiento.getFullYear() == fechaActual.getFullYear()) && fechaActual.getMonth() <
    fechaNacimiento.getMonth()){
        return false
    }
    if((fechaNacimiento.getFullYear() == fechaActual.getFullYear()) && fechaActual.getDate() <
    fechaNacimiento.getDate()){
        return false;
    }
    var meses = fechaActual.getMonth() - fechaNacimiento.getMonth();
    var dias = fechaActual.getDate() - fechaNacimiento.getDate();
    if(fechaActual.getDate() == day){
        dias = 0;
    }
    if(fechaActual.getDate() - fechaNacimiento.getDate() == 1){
        dias = 1;
    }
    spanYear.innerText = edad;
    spanMonth.innerText = meses;
    spanDay.innerText =  dias;
    return true;
}

function validar(form) {
    if (fecha(form) == 0) {
        if (validarFecha(form)) {
            divOne.innerText = "";
            labelOne.style.removeProperty("color");
            labelTwo.style.removeProperty("color");
            labelThree.style.removeProperty("color");
            form.day.style.removeProperty("border");
            form.day.style.removeProperty("outline");
            form.month.style.removeProperty("border");
            form.month.style.removeProperty("outline");
            form.year.style.removeProperty("border");
            form.year.style.removeProperty("outline");
            if(!calcEdad(form.day.value.trim(),form.month.value.trim(),form.year.value.trim())){
                divOne.innerText = "Must be a valid date";
                divTwo.innerText = "Must be a valid date";
                form.day.style.border = "1px solid var(--light-red)";
                form.day.style.outline = "none";
                labelOne.style.color = "var(--light-red)";
                form.month.style.border = "1px solid var(--light-red)";
                form.month.style.outline = "none";
                labelTwo.style.color = "var(--light-red)";
                form.year.style.border = "1px solid var(--light-red)";
                form.year.style.outline = "none";
                labelThree.style.color = "var(--light-red)";
            }
            
        } else {
            divOne.innerText = "Must be a valid date";
            divTwo.innerText = "Must be a valid date";
            form.day.style.border = "1px solid var(--light-red)";
            form.day.style.outline = "none";
            labelOne.style.color = "var(--light-red)";
            form.month.style.border = "1px solid var(--light-red)";
            form.month.style.outline = "none";
            labelTwo.style.color = "var(--light-red)";
            form.year.style.border = "1px solid var(--light-red)";
            form.year.style.outline = "none";
            labelThree.style.color = "var(--light-red)";
        }
    }
}