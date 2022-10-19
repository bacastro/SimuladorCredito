const valorCompra = document.querySelector('#compra');
const valorCuota = document.querySelector('#cuota');
const valorInteres = document.querySelector('#interes');
const valorMensaje = document.querySelector('#mensaje');

const formulario = document.querySelector('#nuevo-credito');

eventListener();

function eventListener(){
    valorCompra.addEventListener('blur', datosCredito);
    valorCuota.addEventListener('blur', datosCredito);
    valorInteres.addEventListener('blur', datosCredito);

    formulario.addEventListener('submit', validarCredito);
    
} 


function validarCredito(e){
    e.preventDefault();
    const {compra, cuota, interes} = creditoObj
    const status = validarInformacion(creditoObj);


    if(status === false){
        return
    }

    const valores = valorCuotas(compra, cuota, interes)
    mostrarValores(valores);
    reiniciarValores();
}

const creditoObj={
    compra:'',
    cuota:'',
    interes:'',
    total:''
}

function datosCredito(e){
    creditoObj[e.target.name] = Number(e.target.value);
}

function validarInformacion(creditoObj){
    let status = true;
    let msg;
    const {compra, cuota, interes} = creditoObj;
    
    if(Number.isNaN(compra) || compra === 0){
        msg = "El valor de la compra es incorrecto";
        mensaje(msg, valorCompra);
        status = false;
    }

    if(Number.isNaN(cuota) || cuota === 0){
        msg = "El valor de la cuota es incorrecto"
        mensaje(msg, valorCuota);
        status = false;
     }

    if(Number.isNaN(interes) || interes === 0){
        msg = "El valor de los intereses es incorrecto";
        mensaje(msg, valorInteres);
        status = false;
    }

    return status
}

function valorCuotas(valorCompra, numeroCuotas,valorInteres){
    const objResultado ={
        compra : "",
        totalCompra : "",
        totalCuotas : "",
        numeroCuotas : ""
    }
    let contTotalInteres;
    let totalInteres = 0;
    let totalCompra = 0;
    let totalCuotas = 0;
    arrCompra = [];
    
    valor =  valorCompra/numeroCuotas;
    interes = valorInteres/100;
    arrCompra[0] = valorCompra;
    
    for (let i = 1; i < numeroCuotas; i++){
        arrCompra.push(arrCompra[i-1]-valor)
    }

    for (let j = 0; j < numeroCuotas; j++){
        contTotalInteres=arrCompra[j]*interes
        totalInteres += contTotalInteres;
    }

    totalCompra = valorCompra+totalInteres;
    totalCuotas = totalCompra/numeroCuotas;

    objResultado['compra'] = convertirMoneda(valorCompra);
    objResultado['totalCompra'] = convertirMoneda(totalCompra);
    objResultado['totalCuotas'] = convertirMoneda(totalCuotas);
    objResultado['numeroCuotas'] = numeroCuotas;

    return objResultado;
}

function mostrarValores(objValores){
    const labelCompra = document.querySelector('#valorCompra');
    const labelCuota = document.querySelector('#valorCuota');
    const labelNumeroCuota = document.querySelector('#numeroCuota');
    const labelTotalCompra = document.querySelector('#totalCompra');

    const{compra,totalCompra, totalCuotas, numeroCuotas} = objValores;

    labelCompra.innerHTML = `$ ${compra}`;
    labelCuota.innerHTML = `$ ${totalCuotas}`;
    labelNumeroCuota.innerHTML = numeroCuotas;
    labelTotalCompra.innerHTML = totalCompra

}


//Los valores de los TextArea los formatea y deja vacios
function reiniciarValores(){
    valorCompra.value ="";
    valorCuota.value = "";
    valorInteres.value = "";
    valorCompra.classList.remove("borde-rojo");
    valorCuota.classList.remove("borde-rojo");
    valorInteres.classList.remove("borde-rojo");
    
}

//Mostrar Mensaje al momento de ingresar un dato erroneo
function mensaje(msg, textArea){
    const divMensaje = document.createElement('div')
    divMensaje.setAttribute('id', 'mensaje')
    divMensaje.classList.add('mensaje');
    divMensaje.textContent = msg;

    document.querySelector('#formulario').insertBefore(divMensaje,document.querySelector('.campo'));

    textArea.value="";
    textArea.classList.add('borde-rojo');

    setTimeout(() => {
        divMensaje.remove();
    }, 3000);
}

function convertirMoneda(valor){
    return new Intl.NumberFormat('COP', { maximumFractionDigits: 2}).format(valor);
}