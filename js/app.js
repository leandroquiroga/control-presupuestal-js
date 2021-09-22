// funciones globales
const selector = (element) => document.querySelector(element);
const create = (element) => document.createElement(element);
const selectorAll = (element) => document.querySelectorAll(element);
const montoDisponible = (gasto, montoOk) => {
    let bool = false;
    if (gasto.cantidad <= montoOk.monto && gasto.cantidad <= montoOk.resto) {
        bool = true;
        return bool
    }
        
    return bool;
}
const comprobarForm = (name, cant) => {
    let bool = false;
    if (name.value === '' && Number(cant.value) < 1 && cant.value.length === 0 && name.value.length === 0) {
        bool = true;
        return bool
    }
    return bool
}
const isNumers = (value) => {
    /* Evalua si es un numero lo que se esta ingreando */
    if (value.match(expRegxNumbers) != null) {
        return true
    }
    return false
}
const isLetters = (inputGasto) => {
    /* Evalua si una letra lo que se esta ingreando */
    if (inputGasto.value.match(expRegxLetters) != null) {
        return true
    }
    return false
}
//Expesiones regulares
const expRegxNumbers = "^[0-9]+$";
const expRegxLetters = '^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$';
// variables
let listado = selector('.lista-gastos')
let detalleGastos = selector('.listado')
let formPresupuesto = selector('#presupuesto');
let formGastos = selector('#gastos');
let inputMount = formPresupuesto[0];
let btnSend = formPresupuesto[1];
let montoOk;
let acumulador = 0;
// Clases 
class Presupuesto {
    constructor(presupuesto) {
        this.monto = Number(presupuesto);
        this.resto = Number(presupuesto);
        this.gastos = []
    }
    generarGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularGastos();
    }
    calcularGastos() {
        const gastado = this.gastos.reduce((total, gastos) => total + gastos.cantidad, 0);
        this.resto = this.monto - gastado
    }
    deletePresupuesto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularGastos();
    }
}
class Interfaces {
    limpiarHTML(content) {
        while (content.firstChild) content.removeChild(content.firstChild);
    }
    motrarPresupuesto(resto, acumulador) {
        let incomeTotal = selector('#total-ingresado').childNodes[1];
        let restMount = selector('#monto-total').childNodes[1];
        let small1 = create('small');
        let small2 = create('small');
        
        if (incomeTotal.children.length === 0) {
            small1.textContent = `Presupuesto: $${acumulador}`;
            small2.textContent = `Restante: $${resto}`;
        } else {
            ui.limpiarHTML(incomeTotal);
            ui.limpiarHTML(restMount);
            small1.textContent = `Presupuesto: $${acumulador}`;
            small2.textContent = `Restante: $${resto}`;
        }
        incomeTotal.appendChild(small1);
        restMount.appendChild(small2);
    }
    manipularDOM(btnAdd,name,cant, ok) {
        btnAdd.disabled = ok;
        name.disabled = ok;
        cant.disabled = ok;
        if (btnAdd.classList.contains('btn-disabled')) btnAdd.classList.remove('btn-disabled');
    }
    agregarClase(divInput,sector) {
        if (!divInput.classList.contains('content-message')) {
            divInput.classList.add('content-message');
            sector.insertBefore(divInput, sector.lastChild);
        } else {
            divInput.remove()
        }
    }
    validError(input, text, sector) {
        //Activa una un mensaje de error dependiendo del error de la validacion 
        let divInput = create('div');
        let p = create('p');
    
        input.classList.add('error-border');
        p.classList.add('error-message');
        p.textContent = text;
        divInput.appendChild(p);
        ui.agregarClase(divInput, sector);
        setTimeout(() => {
            divInput.remove();
            input.classList.remove('error-border');
        }, 2300);
    }
    validNumer(input, btnAdd, name, cant, sector) {
        // Evalua si el valor ingresado es menor que 1
        if (Number(input.value) < 1) {
            ui.validError(input, 'Numero fuera de rango', sector);
            (input.id === 'income-mount') ?
                ui.manipularDOM(btnAdd, name, cant, true) : input.value = ''
        }
    }
    validFormGasto(name,cant, text, divParentTipoCant) {
        let divInput = create('div');
        let p = create('p');
    
        name.classList.add('error-border');
        cant.classList.add('error-border');
        p.classList.add('error-message');
        p.textContent = text;
        divInput.appendChild(p);
        divParentTipoCant.insertBefore(divInput, divParentTipoCant.lastChild);
        setTimeout(() => {
            divInput.remove();
            name.classList.remove('error-border');
            cant.classList.remove('error-border');
        }, 2000);
    }
    listadoHTML(gastos) {
        // creamos el LI
        let li = create('li');
        let p = create('p');
        let span = create('span');
        let btnClose = create('button');

        gastos.forEach(arr => {
            const { cantidad, gasto, id } = arr;

            li.className = 'list-group-item d-flex justify-content-between align-items-center bg-white text-dark rounded-3 border-bottom p-2';
            li.dataset.id = id;

            // agregamos informacion a LI
            p.textContent = `${gasto.toUpperCase()}`;
            p.className = 'text-list';
            li.appendChild(p);
            span.className = 'badge bg-success'
            span.textContent = `$${cantidad}`
            li.appendChild(span);

            //boton 
            btnClose.className = 'btn p-1 border-0 btn-danger delete-gasto d-flex justify-content-center align-items-center text-white text-center';
            btnClose.textContent = 'Delete';
            btnClose.onclick = () => {
                deleteGasto(id,li);
            }
            li.appendChild(btnClose);

            //agregamos al HTML principal
            detalleGastos.appendChild(li)
        })
        
        const deleteGasto = (id,li) => {
            let cardMsg = selector('.lista-gastos');
            montoOk.deletePresupuesto(id);
            li.remove()
            ui.motrarPresupuesto(montoOk.resto, acumulador);
            ui.actualizarRestante(montoOk.resto);
            ui.comprobarPresupuesto(montoOk)
            if (detalleGastos.childNodes.length === 0) cardMsg.classList.add('oculto');            
        }

    }
    actualizarRestante(resto) {
        let restMount = selector('#monto-total').childNodes[1]
        ui.limpiarHTML(restMount);
        let small = create('small');
        small.textContent = `Restante: $${resto}`;
        restMount.appendChild(small);
    }
    comprobarPresupuesto(presupuesto) {
        let card = selector('#monto-total');
        let { monto, resto } = presupuesto
        if ((monto / 4) > resto) {
            card.classList.remove('alert-success', 'alert-warning');
            card.classList.add('alert-danger');
        } else if ((monto / 2) > resto) {
            card.classList.remove('alert-success', 'alert-danger');
            card.classList.add('alert-warning');
        } else {
            card.classList.remove('alert-warning', 'alert-danger');
            card.classList.add('alert-success');
        }
    }
}
const ui = new Interfaces()
// Funciones
const controlForm = (btn, input, btnAdd, name, cant, formPresupuesto, formGastos) => {
    /* 
        Valida, checkea que se cumplan todas las validaciones del formulario
        tanto sea cantidad de la longitud, si esta vacio, etc
    */
    let divParentTipoGasto = formGastos.childNodes[1];
    let divParentTipoCant = formGastos.childNodes[3];
    let alert = selector('#monto-total');
    input.addEventListener('keyup', e => {
        if (e.target.value.length === inputMount.maxLength) {
            ui.validError(inputMount, '10 caracteres como maximo');
            e.target.disabled = true;
            setTimeout(() => {
                e.target.disabled = false;
                e.target.value = '';
            }, 500)
        }
    });
    
    btn.addEventListener('click', e => {
        e.preventDefault();
        let divParent = formPresupuesto.childNodes[1]
        if (isNumers(inputMount.value)) {
            ui.validNumer(inputMount, btnAdd, name, cant, divParent)
        } else {
            ui.validError(inputMount, 'Los datos ingresados no son numeros', divParent);
            ui.manipularDOM(btnAdd, name, cant, true);
        }

        if (isNumers(inputMount.value) && Number(inputMount.value) > 0 && inputMount.value.length !== 0) {
            montoOk = new Presupuesto(inputMount.value);
            const {resto} = montoOk;
            acumulador = acumulador + Number(montoOk.monto);
            selector('.showMonto').classList.remove('oculto');
            ui.manipularDOM(btnAdd, name, cant, false)
            ui.motrarPresupuesto(resto, acumulador);
            formPresupuesto.reset()
        }
    });
    
    formGastos.addEventListener('submit', e => {
        e.preventDefault();
        if (comprobarForm(name, cant)) {
            ui.validFormGasto(name, cant, 'Todos los campos son obligatorios', divParentTipoCant)
        } else if (!isLetters(name) || (name.value === '')) {
            ui.validError(name, 'Datos Invalidos', divParentTipoGasto);
            name.value = '';
            (isNumers(cant.value)) ?
                ui.validNumer(cant, btnAdd, name, cant, divParentTipoCant) :
                ui.validError(cant, 'Los datos ingresados no son numeros', divParentTipoCant);
        } else {
            // une el nombre y la cantidad del gasto (al reves de detructuring)
            const gasto = { id: Date.now(), gasto: name.value, cantidad: Number(cant.value) }
            // chequeamos si la el monto disponible es menor o igaul a lo que quiero gastar
            if (montoDisponible(gasto, montoOk)) {
                if (listado.classList.contains('oculto')) listado.classList.remove('oculto')
                montoOk.generarGasto(gasto);
                ui.listadoHTML(montoOk.gastos);
                ui.actualizarRestante(montoOk.resto);
                ui.comprobarPresupuesto(montoOk);
                formGastos.reset()                
            } else {
                let cardParent = selector('.presupuesto-card');
                ui.validError(alert, 'Fondos Insuficiente, Por favor ingrese un nuevo presupuesto', cardParent);
                formGastos.reset()
            }    
        }
    });
}

// Inicio de la App 
const initApp = () => {
    let nameGasto =  formGastos[0] ; 
    let cantGastos = formGastos[1];
    let btnAdd = formGastos[2];   
    // Listeners
    document.addEventListener('DOMContentLoaded', () => {
        ui.manipularDOM(btnAdd, nameGasto,  cantGastos, true);
        btnAdd.classList.add('btn-disabled'); 
    });
    controlForm(btnSend, inputMount, btnAdd, nameGasto, cantGastos,formPresupuesto,formGastos);
}
initApp();